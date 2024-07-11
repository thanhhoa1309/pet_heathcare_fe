"use client";
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
  Rate,
  Result,
  Row,
  Select,
  Space,
  Spin,
  notification,
} from "antd";
import { useForm } from "antd/es/form/Form";
import { NotificationPlacement } from "antd/es/notification/interface";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useMemo, useState } from "react";
import { IoIosMailOpen } from "react-icons/io";
import styles from "@/app/auth/_components/VerifyModal.module.scss";
import { MdOutlinePayment } from "react-icons/md";

interface AppointmentModal {
  isOpen: boolean;
  onClose: () => void;
  onReload: () => void;
  id: string;
}

const { TextArea } = Input;

export default function ViewFeedbackAppointment(props: AppointmentModal) {
  const { isOpen, onClose, onReload, id } = props;
  const instance = UseAxiosAuth();

  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [form] = useForm();
  const [api, contextHolder] = notification.useNotification();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [openModalPayment, setOpenModalPayment] = useState<boolean>(false);
  const [paymentUrl, setPaymentUrl] = useState<string>("");

  const openNotification = (type: "success" | "error", description: string) => {
    api[type]({
      message: `Feedback Appointment`,
      description: `Feedback Appointment ${description}`,
      placement: "bottomRight",
      duration: 1.5,
    });
  };

  const fetchDataFeedback = async () => {
    try {
      const res = await instance.get(`/api/v1/review/${id}`);

      const tempRes = res.data.data;
      form.setFieldsValue({
        ...tempRes,
      });
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isOpen) {
      form.resetFields();
      fetchDataFeedback();
    }
    setError("");
  }, [isOpen]);

  return (
    <>
      {contextHolder}
      <Modal
        title={<h3 style={{ textAlign: "center" }}>View feedback</h3>}
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
          style={{ margin: "16px" }}
        >
          <Form.Item
            label="Comment"
            name="comment"
            rules={[
              {
                required: true,
                message: "Enter comment",
              },
            ]}
          >
            <TextArea
              placeholder="Enter comment"
              autoSize={{ minRows: 3, maxRows: 5 }}
              disabled
            />
          </Form.Item>

          <Form.Item
            label="Rating"
            name="rating"
            rules={[
              {
                required: true,
                message: "Select Rating",
              },
            ]}
          >
            <Rate disabled></Rate>
          </Form.Item>

          {error && <p style={{ color: "red" }}>{error}</p>}

          <Row justify="center">
            <Space size={"large"}>
              <Button onClick={onClose}>Cancel</Button>
            </Space>
          </Row>
        </Form>
      </Modal>
    </>
  );
}
