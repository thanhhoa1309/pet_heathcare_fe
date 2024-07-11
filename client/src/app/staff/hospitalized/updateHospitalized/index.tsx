"use client";
import React, { useEffect, useState } from "react";
import {
  Modal,
  Form,
  Select,
  Button,
  Row,
  Space,
  Spin,
  notification,
} from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import UseAxiosAuth from "@/utils/axiosClient";

interface AppointmentModal {
  isOpen: boolean;
  onClose: () => void;
  onReload: () => void;
  id: string;
}

interface CreateAppointment {
  petId: string;
  doctorId: string;
  cageId: string;
  serviceId: string;
}

interface ServiceModel {
  id: string;
  name: string;
  price: number;
  type: "APPOINTMENT" | "HOSPITALIZATION";
  createdAt: string;
  updatedAt: string;
  deleted: false;
}

interface OptionModel {
  value: string;
  label: string;
}

export default function UpdateHospitalized(props: AppointmentModal) {
  const { isOpen, onClose, onReload, id } = props;
  const instance = UseAxiosAuth();

  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const [serviceOptions, setServiceOptions] = useState<OptionModel[]>([]);

  const openNotification = (type: "success" | "error", description: string) => {
    api[type]({
      message: `Update HOSPITALIZATION`,
      description: `Update HOSPITALIZATION ${description}`,
      placement: "bottomRight",
      duration: 3,
    });
  };

  const fetchDataServices = async () => {
    try {
      const res = await instance.get("/api/v1/service/types", {
        params: {
          type: "HOSPITALIZATION",
        },
      });

      const tempRes = res.data.data;
      const options = tempRes.map((service: ServiceModel) => ({
        value: service.id,
        label: `${service.name} - Price: ${service.price}`,
      }));

      setServiceOptions(options);
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDataServices();
    if (isOpen) {
      form.resetFields();
    }
    setError("");
  }, [isOpen]);

  const onFinish = async (values: any) => {
    setError("");
    setIsLoading(true);

    const appointment = {
      serviceIds: values.serviceIds,
    };

    try {
      const res = await instance.post(
        `/api/v1/petCare/updateService/${id}`,
        appointment
      );

      if (res.data.status === 200 || res.data.status === 201) {
        openNotification("success", "successfully");
        onReload();
        onClose();
      } else {
        setError(res.data.error);
        openNotification("error", `failure (${res.data.error})`);
      }
    } catch (error: any) {
      openNotification("error", `failure (${error})`);
      setError(error.error);
      console.log(error);
    }

    setIsLoading(false);
  };

  return (
    <>
      {contextHolder}
      <Modal
        title={<h3 style={{ textAlign: "center" }}>Update Hospitalized</h3>}
        open={isOpen}
        width={600}
        onCancel={onClose}
        footer={null}
        closable={false}
      >
        <Form
          form={form}
          name="control-hooks"
          layout="vertical"
          onFinish={onFinish}
          style={{ margin: "16px" }}
        >
          <Form.Item
            label="Service"
            name="serviceIds"
            rules={[
              {
                required: true,
                message: "Enter Service",
              },
            ]}
          >
            <Select
              mode="multiple"
              placeholder="Enter Service"
              options={serviceOptions}
            />
          </Form.Item>

          {error && <p style={{ color: "red" }}>{error}</p>}

          <Row justify="center">
            <Space size="large">
              <Button onClick={onClose}>Cancel</Button>
              <Spin
                indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
                spinning={isLoading}
              >
                <Button type="primary" htmlType="submit" disabled={isLoading}>
                  Save
                </Button>
              </Spin>
            </Space>
          </Row>
        </Form>
      </Modal>
    </>
  );
}
