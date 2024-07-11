"use client";
import { PetModel } from "@/app/(homepage)/user/pets/_components/type";
import UseAxiosAuth from "@/utils/axiosClient";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LoadingOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  NotificationArgsProps,
  Row,
  Select,
  Space,
  Spin,
  Upload,
  notification,
} from "antd";
import { useForm } from "antd/es/form/Form";
import { NotificationPlacement } from "antd/es/notification/interface";
import dayjs from "dayjs";
import Image from "next/image";
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

  const [fileList, setFileList] = useState<any[]>([]);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [errorImage, setErrorImage] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

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
    setIsLoading(false);
    setFileList([]);
    setImageUrl("");
  }, [isOpen]);

  const onFinish = async (values: any) => {
    setError("");
    setIsLoading(true);
    let pet: PetModel = {
      ...values,
      birthDate: "123",
    };

    try {
      const res = await useInstance.post("/api/v1/pet/create", pet);

      if (res.data.status === 200 || res.data.status === 201) {
        openNotification("success", "successfully");
        handleSave(res.data.data);
      } else {
        setError(res.data.error);
        openNotification("error", `failure (${res.data.error})`);
      }
    } catch (error: any) {
      openNotification("error", `failure (${error})`);
      setError(error);
      console.log(error);
    }
  };

  const handleChange = ({ fileList }: any) => {
    setLoading(true);
    setFileList(fileList);
    const file = fileList[0].originFileObj;
    console.log(URL.createObjectURL(file));
    setImageUrl(URL.createObjectURL(file));
    setLoading(false);
  };

  const handleSave = async (id: string = "") => {
    setErrorImage("");
    setIsLoading(true);
    if (fileList.length === 0) {
      setIsLoading(false);
      onReload();
      onClose();
      return;
    }

    const file = fileList[0].originFileObj;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64 = reader.result;

      try {
        const response = await useInstance.post(
          `/api/v1/pet/image/${id}`,
          { file: file },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        openNotification("success", "successfully");
        onReload();
        onClose();
      } catch (error: any) {
        setIsLoading(false);
        openNotification("error", `failure (${error})`);
        setError(error);
        console.log(error);
      }
    };
  };

  const uploadButton = (
    <button
      style={{
        border: "3px ridge #d9d9d9",
        background: "none",
        width: "120px",
        height: "120px",
      }}
      type="button"
    >
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

  return (
    <>
      {contextHolder}
      <Modal
        title={<h3 style={{ textAlign: "center" }}>Add new Pet</h3>}
        open={isOpen}
        width={1000}
        onCancel={onClose}
        footer={() => <></>}
        cancelText="No"
        closable={false}
      >
        <Row>
          <Col
            style={{ width: "30%", height: "300px" }}
            className="d-flex justify-content-center align-item-center"
          >
            <Form className="d-flex justify-content-center flex-column">
              {/* <Image src={image} alt="Doctor Image" /> */}
              <Form.Item>
                <Upload
                  listType="picture"
                  fileList={fileList}
                  onChange={handleChange}
                  beforeUpload={() => false}
                  maxCount={1}
                  showUploadList={false}
                  className="d-flex justify-content-center align-item-center"
                  style={{ border: "2px solid black" }}
                >
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt="avatar"
                      style={{
                        width: "100%",
                      }}
                      width={200}
                      height={200}
                    />
                  ) : (
                    uploadButton
                  )}
                </Upload>
              </Form.Item>
              {/* {errorImage && <p style={{ color: "red" }}>{errorImage}</p>} */}
              {/* <Button type="primary" onClick={handleSave}>
                    Save
                  </Button> */}
            </Form>
          </Col>
          <Col style={{ width: "70%" }}>
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
            </Form>
          </Col>
        </Row>
        <Row justify="center">
          <Space size={"large"}>
            <Button onClick={onClose}>Cancel</Button>
            <Spin
              indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
              spinning={isLoading}
            >
              <Button type="primary" onClick={form.submit}>
                Create
              </Button>
            </Spin>
          </Space>
        </Row>
      </Modal>
    </>
  );
}
