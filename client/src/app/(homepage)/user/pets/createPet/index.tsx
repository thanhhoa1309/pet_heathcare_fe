"use client";
import { PetModel } from "@/app/(homepage)/user/pets/_components/type";
import UseAxiosAuth from "@/utils/axiosClient";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LoadingOutlined,
} from "@ant-design/icons";
import {
  Button,
  DatePicker,
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
import dayjs from "dayjs";
import React, { useEffect } from "react";
import { useMemo, useState } from "react";

interface petModal {
  isOpen: boolean;
  onClose: () => void;
  onReload: () => void;
}

export default function CreatePet(props: petModal) {
  const { isOpen, onClose, onReload } = props;

  const [error, setError] = useState<string>("");

  const useInstance = UseAxiosAuth();
  const [form] = useForm();
  const [api, contextHolder] = notification.useNotification();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const openNotification = (type: "success" | "error", description: string) => {
    api[type]({
      message: `Add new Pet`,
      description: `Add new Pet ${description}`,
      placement: "bottomRight",
      duration: 1.5,
    });
  };

  useEffect(() => {
    if (isOpen) form.resetFields();
  }, [isOpen]);

  const onFinish = async (values: any) => {
    setError("");
    let pet: PetModel = {
      ...values,
      birthDate: "123",
    };

    try {
      const res = await useInstance.post("/api/v1/pet/create", pet);

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
        title={<h3 style={{ textAlign: "center" }}>Add new Pet</h3>}
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
            label="Pet Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Enter Pet Name",
              },
            ]}
          >
            <Input placeholder="Enter Pet Name" />
          </Form.Item>

          <Form.Item
            label="Species"
            name="species"
            rules={[
              {
                required: true,
                message: "Enter Species",
              },
            ]}
          >
            <Input placeholder="Enter Species" />
          </Form.Item>

          <Form.Item
            label="Gender"
            name="gender"
            rules={[
              {
                required: true,
                message: "Select Gender",
              },
            ]}
          >
            <Select
              placeholder="Select Gender"
              options={[
                { value: "MALE", label: "Male" },
                { value: "FEMALE", label: "Female" },
              ]}
            ></Select>
          </Form.Item>

          <Form.Item
            label="Birth date"
            name="birthDate"
            rules={[
              {
                required: true,
                message: "Enter Birth date",
              },
            ]}
          >
            <DatePicker
              placeholder="Enter Birth date"
              style={{ width: "100%" }}
              format="YYYY-MM-DD HH:mm:ss"
              showTime={{ defaultValue: dayjs("00:00:00", "HH:mm:ss") }}
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
