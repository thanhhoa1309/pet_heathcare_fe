"use client";
import { ServiceModel } from "@/app/admin/service/_components/type";
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

interface serviceModal {
  isOpen: boolean;
  onClose: () => void;
  onReload: () => void;
  id: string;
}

interface updateService {
  name: string;
  price: number;
}

export default function UpdateService(props: serviceModal) {
  const instance = UseAxiosAuth();
  const { isOpen, onClose, onReload, id } = props;

  const [service, setService] = useState<ServiceModel>();

  const [error, setError] = useState<string>("");

  const useInstance = UseAxiosAuth();
  const [form] = useForm();
  const [api, contextHolder] = notification.useNotification();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const openNotification = (type: "success" | "error", description: string) => {
    api[type]({
      message: `Update Service`,
      description: `Update Service ${description}`,
      placement: "bottomRight",
      duration: 1.5,
    });
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await instance.get(`/api/v1/service/${id}`);
      if (res.data.status === 200 || res.data.status === 201) {
        form.setFieldsValue({
          ...res.data.data,
          fullName: res.data.data.name,
          phone: res.data.data.phoneNumber,
        });
        let tempRes = res.data.data;
        setService(tempRes);
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
    let service: updateService = {
      name: values.name,
      price: values.price,
    };

    // console.log(user);

    try {
      const res = await useInstance.put(
        `/api/v1/service/update/${id}`,
        service
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
        title={<h3 style={{ textAlign: "center" }}>Update Service</h3>}
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
              label="Type service"
              name="type"
              rules={[
                {
                  required: true,
                  message: "Select type",
                },
              ]}
            >
              <Select
                placeholder="Select role"
                options={[
                  { value: "APPOINTMENT", label: "Appointment" },
                  { value: "HOSPITALIZATION", label: "Hospitalization" },
                ]}
                disabled
              ></Select>
            </Form.Item>

            <Form.Item
              label="Service name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Enter ServiceName",
                },
              ]}
            >
              <Input placeholder="Enter ServiceName" />
            </Form.Item>

            <Form.Item
              label="Price"
              name="price"
              rules={[
                {
                  required: true,
                  message: "Enter Price",
                },
                {
                  type: "number",
                  min: 0,
                  message: "Enter valid Price",
                },
              ]}
            >
              <InputNumber
                placeholder="Enter Price"
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
