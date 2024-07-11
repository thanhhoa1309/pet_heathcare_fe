"use client";
import { PetCareModel } from "@/app/(homepage)/user/hospitalized/_components/type";
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
  petCare: PetCareModel | undefined;
}

export default function UpdatePetCare(props: userModal) {
  const instance = UseAxiosAuth();
  const { isOpen, onClose, onReload, petCare } = props;

  const [error, setError] = useState<string>("");

  const useInstance = UseAxiosAuth();
  const [form] = useForm();
  const [api, contextHolder] = notification.useNotification();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    console.log(petCare);
    if (isOpen) {
      setError("");
      form.resetFields();
      form.setFieldsValue({
        ...petCare,
      });
    }
  }, [isOpen]);

  return (
    <>
      {contextHolder}
      <Modal
        title={<h3 style={{ textAlign: "center" }}>Pet Care</h3>}
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
            style={{ margin: "16px" }}
          >
            <Form.Item label="Treatment" name="treatment">
              <Input placeholder="Treatment is null" disabled />
            </Form.Item>

            <Form.Item label="Daily Note" name="dailyNote">
              <Input placeholder="Daily Note is null" disabled />
            </Form.Item>

            <Form.Item label="Diagnosis" name="diagnosis">
              <Input placeholder="Diagnosis is null" disabled />
            </Form.Item>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <Row justify="center">
              <Space size={"large"}>
                <Button onClick={onClose}>Cancel</Button>
              </Space>
            </Row>
          </Form>
        </Spin>
      </Modal>
    </>
  );
}
