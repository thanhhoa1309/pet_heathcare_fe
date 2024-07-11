"use client";
import { PetModel } from "@/app/(homepage)/user/pets/_components/type";
import UseAxiosAuth from "@/utils/axiosClient";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LoadingOutlined,
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
  Image,
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
  id: string;
}

export default function UpdatePet(props: petModal) {
  const instance = UseAxiosAuth();
  const { isOpen, onClose, onReload, id } = props;

  const [pet, setPet] = useState<PetModel>();
  const [fileList, setFileList] = useState<any[]>([]);

  const [error, setError] = useState<string>("");
  const [errorImage, setErrorImage] = useState<string>("");

  const useInstance = UseAxiosAuth();
  const [form] = useForm();
  const [api, contextHolder] = notification.useNotification();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const openNotification = (type: "success" | "error", description: string) => {
    api[type]({
      message: `Update Pet`,
      description: `Update Pet ${description}`,
      placement: "bottomRight",
      duration: 1.5,
    });
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await instance.get(`/api/v1/pet/${id}`);
      if (res.data.status === 200 || res.data.status === 201) {
        form.setFieldsValue({
          ...res.data.data,
          birthDate: dayjs(res.data.data?.birthDate),
        });
        let tempRes = res.data.data;
        setPet(tempRes);
        console.log(res);
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
      setIsLoading(false);
      setFileList([]);
    }
  }, [isOpen]);

  const onFinish = async (values: any) => {
    setIsLoading(true);
    setError("");
    let pet: PetModel = {
      ...values,
    };

    try {
      const res = await useInstance.put(`/api/v1/pet/update/${id}`, pet);

      if (res.data.status === 200 || res.data.status === 201) {
        openNotification("success", "successfully");
        handleSave();
      } else {
        setError(res.data.error);
        openNotification("error", `failure (${res.data.error})`);
      }
    } catch (error: any) {
      setIsLoading(false);
      openNotification("error", `failure (${error})`);
      setError(error);
      console.log(error);
    }
  };

  const handleChange = ({ fileList }: any) => setFileList(fileList);

  const handleSave = async () => {
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

  return (
    <>
      {contextHolder}
      <Modal
        title={<h3 style={{ textAlign: "center" }}>Update Pet</h3>}
        open={isOpen}
        width={900}
        onCancel={onClose}
        footer={() => <></>}
        cancelText="No"
        closable={false}
      >
        <Row className={"my-3"}>
          <Col style={{ width: "30%" }}>
            <Form className="d-flex justify-content-center flex-column align-items-center">
              <Image
                src={pet?.imageUrl ?? ""}
                alt="Pet Image"
                width={200}
                height={200}
              />
              <Form.Item>
                <Upload
                  listType="picture"
                  fileList={fileList}
                  onChange={handleChange}
                  beforeUpload={() => false}
                  maxCount={1}
                >
                  <Button className="mt-3" icon={<UploadOutlined />}>
                    Select image
                  </Button>
                </Upload>
              </Form.Item>
            </Form>
          </Col>

          <Col style={{ width: "70%" }}>
            <Form
              // {...layout}
              form={form}
              name="control-hooks"
              layout={"vertical"}
              onFinish={onFinish}
              className={"mx-5"}
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
                  disabled
                />
              </Form.Item>

              {error && <p style={{ color: "red" }}>{error}</p>}

              <Row justify="center">
                <Space size={"large"}>
                  <Button onClick={onClose}>Cancel</Button>
                  <Spin
                    indicator={
                      <LoadingOutlined style={{ fontSize: 24 }} spin />
                    }
                    spinning={isLoading}
                  >
                    <Button type="primary" htmlType="submit">
                      Save
                    </Button>
                  </Spin>
                </Space>
              </Row>
            </Form>
          </Col>
        </Row>
      </Modal>
    </>
  );
}
