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
}

export default function CreateUser(props: userModal) {
  const { isOpen, onClose, onReload } = props;

  const [error, setError] = useState<string>("");

  const useInstance = UseAxiosAuth();
  const [form] = useForm();
  const [api, contextHolder] = notification.useNotification();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const openNotification = (type: "success" | "error", description: string) => {
    api[type]({
      message: `Add new User`,
      description: `Add new User ${description}`,
      placement: "bottomRight",
      duration: 1.5,
    });
  };

  useEffect(() => {
    if (isOpen) form.resetFields();
  }, [isOpen]);

  const onFinish = async (values: any) => {
    setError("");
    let user: UserModel = {
      ...values,
    };

    // console.log(user);

    try {
      const res = await useInstance.post("/api/v1/user/create", user);

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
        title={<h3 style={{ textAlign: "center" }}>Add new User</h3>}
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
            label="Role"
            name="role"
            rules={[
              {
                required: true,
                message: "Select role",
              },
            ]}
          >
            <Select
              placeholder="Select role"
              options={[
                { value: "USER", label: "User" },
                { value: "DOCTOR", label: "Doctor" },
                { value: "STAFF", label: "Staff" },
                { value: "ADMIN", label: "Admin" },
              ]}
            ></Select>
          </Form.Item>

          <Form.Item
            label="FullName"
            name="fullName"
            rules={[
              {
                required: true,
                message: "Enter fullName",
              },
            ]}
          >
            <Input placeholder="Enter fullName" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="username"
            rules={[
              {
                required: true,
                message: "Enter email",
              },
              {
                type: "email",
                message: "Enter valid email",
              },
            ]}
          >
            <Input placeholder="Enter email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Enter password",
              },
            ]}
          >
            <Input.Password
              placeholder="Enter password"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>

          <Form.Item
            label="Phone"
            name="phone"
            rules={[
              {
                required: true,
                message: "Enter phone",
              },
            ]}
          >
            <Input placeholder="Enter phone" />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={[
              {
                required: true,
                message: "Enter address",
              },
            ]}
          >
            <Input placeholder="Enter address" />
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
