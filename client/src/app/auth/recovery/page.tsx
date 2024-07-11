"use client";

import { Button, Card, Form, Input, Spin, notification } from "antd";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LoadingOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import styles from "@/app/auth/_components/loginStyle.module.scss";
import { useRouter } from "next/navigation";
import { SignInResponse, signIn, useSession } from "next-auth/react";
import { http } from "@/utils/config";
import {
  ADMIN_PATH,
  DOCTOR_PATH,
  STAFF_PATH,
  USER_PATH,
} from "@/constants/routes";
import RecoveryModal from "@/app/auth/_components/RecoveryConfirm";

export default function RecoveryPage() {
  const [form] = useForm();
  const router = useRouter();
  const session = useSession();
  const [api, contextHolder] = notification.useNotification();
  const [error, setError] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const openNotification = (title: string, message: string) => {
    api.error({
      message: title,
      description: message,
      placement: `top`,
      duration: 2,
    });
  };

  const onFinish = async (values: any) => {
    setError("");
    setIsLoading(true);

    try {
      const res = await http.post("/api/v1/auth/forgot-password", values);

      if (res.data.status === 200 || res.data.status === 201) {
        setOpenModal(true);
      } else {
        setError(res.data.error);
        openNotification("error", `failure (${res.data.error})`);
      }
    } catch (error: any) {
      setError(error?.message);
    }

    // setIsLoading(false);
  };

  return (
    <>
      {contextHolder}
      <div
        className={`${styles.background_Login} d-flex justify-content-center`}
      >
        <div className={`${styles.backContainer}`}>
          <Button onClick={() => router.push("/")}>
            <LeftOutlined />
          </Button>
        </div>
        <Card
          className={`${styles.backgroundColorPrimary}`}
          style={{ width: "40%", margin: "auto" }}
        >
          <h2 className={`text-center ${styles.colorText}`}>
            Recovery Password
          </h2>
          <Form
            form={form}
            onFinish={onFinish}
            layout={"vertical"}
            // variant='filled'
            // style={{ maxWidth: 1000 }}
          >
            <Form.Item
              label={
                <>
                  <span className={styles.colorText}>Email</span>
                </>
              }
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please enter email!",
                },
                {
                  type: "email",
                  message: "Please enter email valid format",
                },
              ]}
            >
              <Input placeholder="Enter email" />
            </Form.Item>

            <div>
              {error && <p style={{ color: "red" }}>{error}</p>}
              <Spin
                indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
                spinning={isLoading}
              >
                <Button
                  style={{ width: "100%" }}
                  type="primary"
                  htmlType="submit"
                  className={styles.buttonCustom}
                >
                  Recovery
                </Button>
              </Spin>
            </div>
          </Form>

          <div className="mt-2 text-center">
            <span className={styles.colorText}>Return to </span>
            <Link href="login" className={styles.colorText}>
              Sign in
            </Link>
          </div>
        </Card>
      </div>
      <RecoveryModal isOpen={openModal} onClose={() => setOpenModal(false)} />
    </>
  );
}
