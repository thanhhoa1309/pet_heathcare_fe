"use client";

import { Button, Card, Col, Form, Input, Row, Spin, notification } from "antd";
import Link from "next/link";
import styles from "./_components/profileStyle.module.scss";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useEffect, useState } from "react";
import UseAxiosAuth from "@/utils/axiosClient";
import { useForm } from "antd/es/form/Form";
import { UserProfile } from "@/app/(homepage)/user/profile/_components/type";

const ProfilePage = () => {
  const instance = UseAxiosAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [form] = useForm();
  const [error, setError] = useState<string>("");

  const [api, contextHolder] = notification.useNotification();
  const [profile, setProfile] = useState<UserProfile>();

  const openNotification = (type: "success" | "error", description: string) => {
    api[type]({
      message: `Update Profile`,
      description: `Update Profile ${description}`,
      placement: "bottomRight",
      duration: 1.5,
    });
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await instance.get(`/api/v1/user/customer`);
      if (res.data.status === 200 || res.data.status === 201) {
        form.setFieldsValue({
          ...res.data.data,
          fullName: res.data.data.name,
          username: res.data.data.email,
        });
        setProfile(res.data.data);
      }
    } catch (error: any) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onFinish = async (values: any) => {
    setError("");
    let user = {
      fullName: values.fullName,
      phone: values.phoneNumber,
      address: values.address,
    };

    try {
      const res = await instance.put(
        `/api/v1/user/update/${profile?.id}`,
        user
      );

      if (res.data.status === 200 || res.data.status === 201) {
        openNotification("success", "successfully");
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
      <div className="bg-light">
        <Row className="py-5 container">
          <Col style={{ width: "30%" }}>
            <Card style={{ width: "100%", margin: "auto" }}>
              <h5>Account Balance</h5>
              <h2>${profile?.balance}</h2>
            </Card>
          </Col>
          <Col style={{ width: "70%" }}>
            <Card style={{ width: "80%", margin: "auto" }}>
              <h2 className={`text-center ${styles.colorText}`}>Profile</h2>
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
                  <Input placeholder="Enter email" disabled />
                </Form.Item>

                <Form.Item
                  label={
                    <>
                      <span className={styles.colorText}>Phone</span>
                    </>
                  }
                  name="phoneNumber"
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
                  {/* {error && <p style={{ color: "black" }}>{error}</p>}
          <Spin
            indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
            spinning={isLoading}
          > */}
                  <div className="d-flex justify-content-center">
                    <div>
                      <Button
                        type="primary"
                        className={`${styles.buttonCustom} mx-3`}
                        onClick={() => fetchData()}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="primary"
                        htmlType="submit"
                        className={`${styles.buttonCustom} mx-3`}
                      >
                        Save
                      </Button>
                    </div>
                  </div>
                  {/* </Spin> */}
                </div>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ProfilePage;
