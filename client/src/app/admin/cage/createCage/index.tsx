"use client";
import { CageModel } from "@/app/admin/cage/_components/type";
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
  InputNumber,
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
}

export default function CreateCage(props: userModal) {
  const { isOpen, onClose, onReload } = props;

  const [error, setError] = useState<string>("");

  const useInstance = UseAxiosAuth();
  const [form] = useForm();
  const [api, contextHolder] = notification.useNotification();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const openNotification = (type: "success" | "error", description: string) => {
    api[type]({
      message: `Add new Cage`,
      description: `Add new Cage ${description}`,
      placement: "bottomRight",
      duration: 1.5,
    });
  };

  useEffect(() => {
    if (isOpen) form.resetFields();
  }, [isOpen]);

  const onFinish = async (values: any) => {
    setError("");
    let cage: CageModel = {
      ...values,
    };

    // console.log(user);

    try {
      const res = await useInstance.post("/api/v1/cage/create", cage);

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
        title={<h3 style={{ textAlign: "center" }}>Add new Cage</h3>}
        open={isOpen}
        width={600}
        onCancel={onClose}
        footer={() => <></>}
        cancelText="No"
        closable={false}
      >
        <Form
          // {...layout}
          form={form}
          name="control-hooks"
          layout={"vertical"}
          onFinish={onFinish}
          style={{ margin: "16px" }}
        >
          <Form.Item
            label="Cage Number"
            name="cageNumber"
            rules={[
              {
                required: true,
                message: "Enter cage number",
              },
            ]}
          >
            <InputNumber
              placeholder="Enter cage number"
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item
            label="Status"
            name="cageStatus"
            rules={[
              {
                required: true,
                message: "Select status",
              },
            ]}
          >
            <Select
              placeholder="Select status"
              options={[
                { value: "Available", label: "Available" },
                { value: "Not Available", label: "Not Available" },
              ]}
              disabled
            ></Select>
          </Form.Item>

          <Form.Item
            label="Cage Capacity"
            name="capacity"
            rules={[
              {
                required: true,
                message: "Enter cage capacity",
              },
            ]}
          >
            <InputNumber
              placeholder="Enter cage capacity"
              style={{ width: "100%" }}
            />
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
                  Create
                </Button>
              </Spin>
            </Space>
          </Row>
        </Form>
      </Modal>
    </>
  );
}
