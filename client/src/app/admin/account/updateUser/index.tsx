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

export default function UpdateUser(props: userModal) {
  const instance = UseAxiosAuth();
  const { isOpen, onClose, onReload, id } = props;

  const [user, setUser] = useState<UserModel>();

  const [error, setError] = useState<string>("");

  const useInstance = UseAxiosAuth();
  const [form] = useForm();
  const [api, contextHolder] = notification.useNotification();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const openNotification = (type: "success" | "error", description: string) => {
    api[type]({
      message: `Update User`,
      description: `Update User ${description}`,
      placement: "bottomRight",
      duration: 1.5,
    });
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await instance.get(`/api/v1/user/${id}`);
      if (res.data.status === 200 || res.data.status === 201) {
        form.setFieldsValue({
          ...res.data.data,
          fullName: res.data.data.name,
          phone: res.data.data.phoneNumber,
        });
        let tempRes = res.data.data;
        setUser(tempRes);
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
    let user: UserModel = {
      ...values,
    };

    console.log(user);

    try {
      const res = await useInstance.put(`/api/v1/user/update/${id}`, user);

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
        title={<h3 style={{ textAlign: "center" }}>Update User</h3>}
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
                disabled
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
        </Spin>
      </Modal>
    </>
  );
}
