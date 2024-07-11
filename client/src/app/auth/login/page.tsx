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

export default function LoginPage() {
  const [form] = useForm();
  const router = useRouter();
  const session = useSession();
  const [api, contextHolder] = notification.useNotification();
  const [error, setError] = useState<string>("");

  const [saveReq, setSaveReq] = useState<SignInResponse | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
      const res = await signIn("credentials", {
        username: values?.username as string,
        password: values?.password as string,
        redirect: false,
        // callbackUrl
      });

      setSaveReq(res);
    } catch (error: any) {
      setError(error?.message);
    }

    // setIsLoading(false);
  };

  useEffect(() => {
    if (saveReq) {
      const user = session.data?.user;
      if (!saveReq?.error) {
        let flag = false;
        if (user?.role === "ADMIN") {
          flag = true;
          router.push(ADMIN_PATH);
        }
        if (user?.role === "USER") {
          flag = true;
          router.push(USER_PATH);
        }
        if (user?.role === "DOCTOR") {
          flag = true;
          router.push(DOCTOR_PATH);
        }
        if (user?.role === "STAFF") {
          flag = true;
          router.push(STAFF_PATH);
        }
        if (!flag) setError("UNDEFINE");
      } else {
        setIsLoading(false);
        setError(saveReq.error);
      }
    }
  }, [saveReq]);

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
          <h2 className={`text-center ${styles.colorText}`}>Sign in</h2>
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
              name="username"
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
                  message: "Please enter password!",
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

            <div>
              {error && <p style={{ color: "white" }}>{error}</p>}
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
                  Sign in
                </Button>
              </Spin>
            </div>
          </Form>
          <div className="text-end mb-1">
            <Link href="recovery" className={styles.colorText}>
              Forgot password?
            </Link>
          </div>

          <div className="mt-2 text-center">
            <span className={styles.colorText}>Create new account </span>
            <Link href="register" className={styles.colorText}>
              Sign up
            </Link>
          </div>
        </Card>
      </div>
    </>
  );
}
