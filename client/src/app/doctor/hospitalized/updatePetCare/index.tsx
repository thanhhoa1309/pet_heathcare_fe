"use client";
import { UserModel } from "@/app/admin/account/_components/type";
import UseAxiosAuth from "@/utils/axiosClient";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LoadingOutlined,
} from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  Modal,
  NotificationArgsProps,
  Row,
  Select,
  Space,
  Spin,
  notification,
} from "antd";
import { useForm } from "antd/es/form/Form";
import { NotificationPlacement } from "antd/es/notification/interface";
import React, { useEffect } from "react";
import { useMemo, useState } from "react";

interface userModal {
  isOpen: boolean;
  onClose: () => void;
  onReload: () => void;
  id: string;
}

export default function UpdatePetCare(props: userModal) {
  const instance = UseAxiosAuth();
  const { isOpen, onClose, onReload, id } = props;

  const [error, setError] = useState<string>("");

  const useInstance = UseAxiosAuth();
  const [form] = useForm();
  const [api, contextHolder] = notification.useNotification();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const openNotification = (type: "success" | "error", description: string) => {
    api[type]({
      message: `Update Pet care`,
      description: `Update Pet care ${description}`,
      placement: "bottomRight",
      duration: 1.5,
    });
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await instance.get(`/api/v1/petCare/${id}`);
      if (res.data.status === 200 || res.data.status === 201) {
        form.setFieldsValue({
          ...res.data.data,
        });
        let tempRes = res.data.data;
        // console.log(res);
      }
    } catch (error: any) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (isOpen) {
      setError("");
      form.resetFields();
      fetchData();
    }
  }, [isOpen]);

  const onFinish = async (values: any) => {
    setError("");
    let petcare = {
      dailyNote: values.dailyNote,
      diagnosis: values.diagnosis,
      treatment: values.treatment,
    };

    try {
      const res = await useInstance.put(
        `/api/v1/petCare/update/${id}`,
        petcare
      );

      if (res.data.status === 200 || res.data.status === 201) {
        openNotification("success", "successfully");
        onReload();
        onClose();
      } else {
        setError(
          Object.entries(res.data.error)
            .map(([key, value]) => `${key}: ${value}`)
            .join("\n")
        );
        openNotification(
          "error",
          `failure (${Object.values(res.data.error).join(", ")})`
        );
      }
    } catch (error: any) {
      openNotification("error", `failure (${error})`);
      setError(error);
      console.log(error);
    }
  };

  return (
    <>
      {contextHolder}
      <Modal
        title={<h3 style={{ textAlign: "center" }}>Update Pet Care</h3>}
        open={isOpen}
        width={600}
        onCancel={onClose}
        footer={() => <></>}
        cancelText="No"
        closable={false}
      >
        <Spin spinning={isLoading}>
          <Form
            // {...layout}
            form={form}
            name="control-hooks"
            layout={"vertical"}
            onFinish={onFinish}
            style={{ margin: "16px" }}
          >
            <Form.Item
              label="Treatment"
              name="treatment"
              rules={[
                {
                  required: true,
                  message: "Select Treatment",
                },
              ]}
            >
              <Input placeholder="Enter Treatment" />
            </Form.Item>

            <Form.Item
              label="Daily Note"
              name="dailyNote"
              rules={[
                {
                  required: true,
                  message: "Enter Daily Note",
                },
              ]}
            >
              <Input placeholder="Enter Daily Note" />
            </Form.Item>

            <Form.Item
              label="Diagnosis"
              name="diagnosis"
              rules={[
                {
                  required: true,
                  message: "Enter Diagnosis",
                },
              ]}
            >
              <Input placeholder="Enter Diagnosis" />
            </Form.Item>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <Row justify="center">
              <Space size={"large"}>
                <Button onClick={onClose}>Cancel</Button>
                <Spin
                  indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
                  spinning={false}
                >
                  <Button type="primary" htmlType="submit">
                    Save
                  </Button>
                </Spin>
              </Space>
            </Row>
          </Form>
        </Spin>
      </Modal>
    </>
  );
}
