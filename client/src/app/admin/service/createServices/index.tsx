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
}

export default function CreateService(props: serviceModal) {
  const { isOpen, onClose, onReload } = props;

  const [error, setError] = useState<string>("");

  const useInstance = UseAxiosAuth();
  const [form] = useForm();
  const [api, contextHolder] = notification.useNotification();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const openNotification = (type: "success" | "error", description: string) => {
    api[type]({
      message: `Add new Service`,
      description: `Add new Service ${description}`,
      placement: "bottomRight",
      duration: 1.5,
    });
  };

  useEffect(() => {
    if (isOpen) form.resetFields();
  }, [isOpen]);

  const onFinish = async (values: any) => {
    setError("");
    let service: ServiceModel = {
      ...values,
    };

    // console.log(user);

    try {
      const res = await useInstance.post("/api/v1/service/create", service);

      if (res.data.status === 200 || res.data.status === 201) {
        openNotification("success", "successfully");
        onReload();
        onClose();
      } else {
        setError(Object.values(res.data.error).join(", "));
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
        title={<h3 style={{ textAlign: "center" }}>Add new Service</h3>}
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
            <InputNumber placeholder="Enter Price" style={{ width: "100%" }} />
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
