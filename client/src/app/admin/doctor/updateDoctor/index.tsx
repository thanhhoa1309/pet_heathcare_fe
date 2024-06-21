"use client";
import { CageModel } from "@/app/admin/cage/_components/type";
import { DoctorModel } from "@/app/admin/doctor/_components/type";
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
  Form,
  GetProp,
  Input,
  InputNumber,
  Modal,
  NotificationArgsProps,
  Row,
  Select,
  Space,
  Spin,
  Tag,
  TimePicker,
  UploadProps,
  notification,
  Image,
  Upload,
} from "antd";
import { useForm } from "antd/es/form/Form";
import { NotificationPlacement } from "antd/es/notification/interface";
import React, { useEffect } from "react";
import { useMemo, useState } from "react";
import dayjs from "dayjs";

interface userModal {
  isOpen: boolean;
  onClose: () => void;
  onReload: () => void;
  id: string;
  image: string;
}

interface doctorUpdate {
  specialty: string;
  start_time: string;
  end_time: string;
  workingDay: string[];
}

const options = [
  { color: "#F8BBD9", value: "MONDAY" },
  { color: "#E6C9AF", value: "TUESDAY" },
  { color: "#C6E0CE", value: "WEDNESDAY" },
  { color: "#A9DCD3", value: "THURSDAY" },
  { color: "#DCDCDC", value: "FRIDAY" },
  { color: "#F0F8FF", value: "SATURDAY" },
  { color: "#FFF6B9", value: "SUNDAY" },
];

function tagRender(props: any) {
  const { label, value, closable, onClose } = props;
  const option = options.find((opt) => opt.value === value);

  return (
    <Tag
      color={option?.color}
      closable={closable}
      onClose={onClose}
      style={{ marginRight: 3, marginBottom: 3 }}
    >
      {label}
    </Tag>
  );
}

export default function UpdateDoctor(props: userModal) {
  const instance = UseAxiosAuth();
  const { isOpen, onClose, onReload, id, image } = props;

  const [fileList, setFileList] = useState<any[]>([]);

  const [error, setError] = useState<string>("");
  const [errorImage, setErrorImage] = useState<string>("");

  const useInstance = UseAxiosAuth();
  const [form] = useForm();
  const [api, contextHolder] = notification.useNotification();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const openNotification = (type: "success" | "error", description: string) => {
    api[type]({
      message: `Update Doctor`,
      description: `Update Doctor ${description}`,
      placement: "bottomRight",
      duration: 1.5,
    });
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await instance.get(`/api/v1/doctor/${id}`);
      if (res.data.status === 200 || res.data.status === 201) {
        form.setFieldsValue({
          ...res.data.data,
          start_time: dayjs(res.data.data.start_time, "HH:mm:ss"),
          end_time: dayjs(res.data.data.end_time, "HH:mm:ss"),
        });
        let tempRes = res.data.data;
      }
    } catch (error: any) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (isOpen) {
      setError("");
      setErrorImage("");
      form.resetFields();
      fetchData();
    }
  }, [isOpen]);

  const onFinish = async (values: any) => {
    setError("");
    let doctor: DoctorModel = {
      ...values,
      start_time: dayjs(values.start_time).format("HH:mm:ss").toString(),
      end_time: dayjs(values.end_time).format("HH:mm:ss").toString(),
    };

    console.log(doctor);

    try {
      const res = await useInstance.put(
        `/api/v1/doctor/doctorUpdate/${id}`,
        doctor
      );

      if (res.data.status === 200 || res.data.status === 201) {
        openNotification("success", "successfully");
        onReload();
        onClose();
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

  const handleChange = ({ fileList }: any) => setFileList(fileList);

  const handleSave = async () => {
    setErrorImage("");
    setIsLoading(true);
    if (fileList.length === 0) {
      setErrorImage("Please select a image");
      setIsLoading(false);
      return;
    }

    console.log();

    const file = fileList[0].originFileObj;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64 = reader.result;

      try {
        const response = await useInstance.post(
          `/api/v1/doctor/image/${id}`,
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
        setFileList([]);
      } catch (error: any) {
        openNotification("error", `failure (${error})`);
        setError(error);
        console.log(error);
      }
    };
    setIsLoading(false);
  };

  return (
    <>
      {contextHolder}
      <Modal
        title={<h3 style={{ textAlign: "center" }}>Update Doctor</h3>}
        open={isOpen}
        width={900}
        onCancel={onClose}
        footer={() => <></>}
        cancelText="No"
        closable={false}
      >
        <Spin spinning={isLoading}>
          <Row>
            <Col style={{ width: "30%" }}>
              <div>
                <Form className="d-flex justify-content-center flex-column">
                  <Image src={image} alt="Doctor Image" />
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
                  {errorImage && <p style={{ color: "red" }}>{errorImage}</p>}
                  <Button type="primary" onClick={handleSave}>
                    Save
                  </Button>
                </Form>
              </div>
            </Col>
            <Col style={{ width: "70%" }}>
              <Form
                // {...layout}
                className={"container"}
                form={form}
                name="control-hooks"
                layout={"vertical"}
                onFinish={onFinish}
                style={{ margin: "16px" }}
              >
                <Form.Item
                  label="Specialty"
                  name="specialty"
                  rules={[
                    {
                      required: true,
                      message: "Enter Specialty",
                    },
                  ]}
                >
                  <Input placeholder="Enter Specialty" />
                </Form.Item>

                <Row gutter={16}>
                  <Col style={{ width: "50%" }}>
                    <Form.Item
                      label="Start time"
                      name="start_time"
                      rules={[
                        {
                          required: true,
                          message: "Select start time",
                        },
                      ]}
                    >
                      <TimePicker style={{ width: "100%" }} />
                    </Form.Item>
                  </Col>

                  <Col style={{ width: "50%" }}>
                    <Form.Item
                      label="End day"
                      name="end_time"
                      rules={[
                        {
                          required: true,
                          message: "Select end time",
                        },
                      ]}
                    >
                      <TimePicker style={{ width: "100%" }} />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  label="Working Day"
                  name="workingDay"
                  rules={[
                    {
                      required: true,
                      message: "Select Working Day",
                    },
                  ]}
                >
                  <Select
                    placeholder="Select Working Day"
                    mode="multiple"
                    allowClear
                    tagRender={tagRender}
                    options={options}
                  ></Select>
                </Form.Item>

                {error && <p style={{ color: "red" }}>{error}</p>}

                <Row justify="center">
                  <Space size={"large"}>
                    <Button onClick={onClose}>Cancel</Button>
                    <Spin
                      indicator={
                        <LoadingOutlined style={{ fontSize: 24 }} spin />
                      }
                      spinning={false}
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
        </Spin>
      </Modal>
    </>
  );
}
