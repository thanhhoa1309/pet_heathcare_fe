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
import VerifyModal from "@/app/auth/_components/VerifyModal";

export default function RegisterPage() {
  const [form] = useForm();
  const router = useRouter();
  const [api, contextHolder] = notification.useNotification();

  const session = useSession();
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [openVerifyModal, setOpenVerifyModal] = useState<boolean>(false);

  const openNotification = (title: string, message: string) => {
    api.info({
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
      const response = await http.post("/api/v1/auth/register", {
        fullName: values?.fullName,
        username: values?.username,
        password: values?.password,
        phone: values?.phone,
        address: values?.address,
      });

      console.log(response);
      if (response?.data.status === 201) {
        setOpenVerifyModal(true);
      } else {
        setError(response?.data.error);
      }
    } catch (error: any) {
      setError(error?.message);
    }

    setIsLoading(false);
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
          <h2 className={`text-center ${styles.colorText}`}>Sign Up</h2>
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
                  <span className={styles.colorText}>Full Name</span>
                </>
              }
              name="fullName"
              rules={[
                {
                  required: true,
                  message: (
                    <span className={styles.colorError}>
                      Please enter fullname
                    </span>
                  ),
                },
              ]}
            >
              <Input placeholder="Enter fullname" />
            </Form.Item>

            <Form.Item
              label={
                <>
                  <span className={styles.colorText}>Email</span>
                </>
              }
              name="username"
              rules={[
                {
                  required: true,
                  message: (
                    <span className={styles.colorError}>
                      Please enter email
                    </span>
                  ),
                },
                {
                  type: "email",
                  message: (
                    <span className={styles.colorError}>
                      Please enter valid email
                    </span>
                  ),
                },
              ]}
            >
              <Input placeholder="Enter email" />
            </Form.Item>

            <Form.Item
              label={
                <>
                  <span className={styles.colorText}>Password</span>
                </>
              }
              name="password"
              rules={[
                {
                  required: true,
                  message: (
                    <span className={styles.colorError}>
                      Please enter password
                    </span>
                  ),
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
              label={
                <>
                  <span className={styles.colorText}>Phone</span>
                </>
              }
              name="phone"
              rules={[
                {
                  required: true,
                  message: (
                    <span className={styles.colorError}>
                      Please enter phone
                    </span>
                  ),
                },
                {
                  type: "string",
                  min: 10,
                  max: 11,
                  message: (
                    <span className={styles.colorError}>
                      Please enter valid phone
                    </span>
                  ),
                },
              ]}
            >
              <Input placeholder="Enter phone" />
            </Form.Item>

            <Form.Item
              label={
                <>
                  <span className={styles.colorText}>Address</span>
                </>
              }
              name="address"
              rules={[
                {
                  required: true,
                  message: (
                    <span className={styles.colorError}>
                      Please enter address
                    </span>
                  ),
                },
              ]}
            >
              <Input placeholder="Enter address" />
            </Form.Item>

            <div>
              {error && <p style={{ color: "black" }}>{error}</p>}
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
                  Sign up
                </Button>
              </Spin>
            </div>
          </Form>

          <div className="mt-2 text-center">
            <span className={styles.colorText}>Already a member </span>
            <Link href="login" className={styles.colorText}>
              Sign in
            </Link>
          </div>
        </Card>

        <VerifyModal
          isOpen={openVerifyModal}
          onClose={() => setOpenVerifyModal(false)}
        />
      </div>
    </>
  );
}
