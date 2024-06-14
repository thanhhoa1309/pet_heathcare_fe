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

interface AppointmentModal {
  isOpen: boolean;
  onClose: () => void;
  onReload: () => void;
}

interface CreateAppointment {
  appointmentDate: string;
  petId: string;
  doctorId: string;
  serviceId: string;
}

interface PetModel {
  id: string;
  name: string;
  species: string;
  gender: "MALE" | "FEMALE";
  birthDate: string;
  deleted: false;
  createdAt: string;
  updatedAt: string;
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

interface DoctorModel {
  id: string;
  fullName: string;
  imageUrl: string;
  email: string;
  specialty: string;
  start_time: string;
  end_time: string;
}

interface optionModel {
  values: string;
  label: string;
}

export default function CreateAppointment(props: AppointmentModal) {
  const { isOpen, onClose, onReload } = props;
  const instance = UseAxiosAuth();

  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [form] = useForm();
  const [api, contextHolder] = notification.useNotification();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [openModalPayment, setOpenModalPayment] = useState<boolean>(false);
  const [paymentUrl, setPaymentUrl] = useState<string>("");

  const [pets, setPets] = useState<PetModel>();
  const [petsOptions, setPetsOptions] = useState<optionModel[]>([]);
  const [services, setServices] = useState<ServiceModel[]>([]);
  const [serviceOptions, setServiceOptions] = useState<optionModel[]>([]);
  const [doctors, setDoctors] = useState<DoctorModel[]>();
  const [doctorOptions, setDoctorOptions] = useState<optionModel[]>([]);

  const openNotification = (type: "success" | "error", description: string) => {
    api[type]({
      message: `Add new Appointment`,
      description: `Add new Appointment ${description}`,
      placement: "bottomRight",
      duration: 1.5,
    });
  };

  const fetchDataPets = async () => {
    try {
      const res = await instance.get("/api/v1/pet/all");

      let tempRes = res.data.data;
      const options = tempRes.map((pet: any) => ({
        value: pet.id,
        label: pet.name,
      }));

      setPetsOptions(options);
      setPets(tempRes);
    } catch (error: any) {
      console.log(error);
    }
  };

  const fetchDataServices = async () => {
    try {
      const res = await instance.get("/api/v1/service");

      let tempRes = res.data.data;
      const options = tempRes.map((service: any) => ({
        value: service.id,
        label: service.name,
      }));

      console.log(
        tempRes.map((service: any) => ({
          value: service.id,
          label: service.name,
        }))
      );

      setServiceOptions(options);
      setServices(tempRes);
    } catch (error: any) {
      console.log(error);
    }
  };

  const fetchDataDoctors = async () => {
    try {
      const res = await instance.get("/api/v1/doctor");

      let tempRes = res.data.data;
      const options = tempRes.map((doctor: any) => ({
        value: doctor.id,
        label: doctor.fullName,
      }));

      setDoctorOptions(options);
      setDoctors(tempRes);
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isOpen) form.resetFields();

    fetchDataPets();
    fetchDataDoctors();
    fetchDataServices();
  }, [isOpen]);

  const onFinish = async (values: any) => {
    setError("");

    let appointment: CreateAppointment = {
      appointmentDate: dayjs(values?.appointmentDate).format("YYYY-MM-DD"),
      petId: values.petId,
      doctorId: values.doctorId,
      serviceId: values.serviceId,
    };

    console.log(appointment);
    try {
      const res = await instance.post(
        "/api/v1/appointment/create",
        appointment
      );

      if (res.data.status === 200 || res.data.status === 201) {
        openNotification("success", "successfully");
        setOpenModalPayment(true);
        setPaymentUrl(res.data.data.paymentUrl);
      } else {
        setError(Object.values(res.data.error).toString());
        openNotification("error", `failure (${Object.values(res.data.error)})`);
      }
    } catch (error: any) {
      openNotification("error", `failure (${error})`);
      setError(error);
      console.log(error);
    }
  };

  const handleCancelPayment = () => {
    setOpenModalPayment(false);
    onReload();
    onClose();
  };

  const handleConfirmPayment = () => {
    router.push(paymentUrl);
  };

  return (
    <>
      {contextHolder}
      <Modal
        title={<h3 style={{ textAlign: "center" }}>Add new Appointment</h3>}
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
          onFinish={onFinish}
          style={{ margin: "16px" }}
        >
          <Form.Item
            label="Appointment Date"
            name="appointmentDate"
            rules={[
              {
                required: true,
                message: "Enter Appointment Date",
              },
            ]}
          >
            <DatePicker
              placeholder="Enter Appointment Date"
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item
            label="Pet name"
            name="petId"
            rules={[
              {
                required: true,
                message: "Enter Pet name",
              },
            ]}
          >
            <Select placeholder="Enter Pet name" options={petsOptions} />
          </Form.Item>

          <Form.Item
            label="Doctor"
            name="doctorId"
            rules={[
              {
                required: true,
                message: "Enter Doctor",
              },
            ]}
          >
            <Select placeholder="Enter Doctor" options={doctorOptions} />
          </Form.Item>

          <Form.Item
            label="Service"
            name="serviceId"
            rules={[
              {
                required: true,
                message: "Enter Service",
              },
            ]}
          >
            <Select placeholder="Enter Service" options={serviceOptions} />
          </Form.Item>

          {error && <p style={{ color: "red" }}>{error}</p>}

          <Row justify="center">
            <Space size={"large"}>
              <Button onClick={onClose}>Cancel</Button>
              <Spin
                indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
                spinning={false}
              >
                <Button type="primary" htmlType="submit">
                  Create
                </Button>
              </Spin>
            </Space>
          </Row>
        </Form>
      </Modal>
      <Modal
        title=""
        open={openModalPayment}
        width={500}
        // onCancel={onClose}
        footer={() => <></>}
        cancelText="No"
        mask={true}
        closable={false}
      >
        <>
          <Result
            icon={
              <span className={styles.containerOTP}>
                <IoIosMailOpen />
              </span>
            }
            title={
              <>
                <span style={{ fontSize: 26 }}>Payment</span>
                <br />
                <span style={{ fontSize: 14 }}></span>
              </>
            }
            extra={
              <>
                <Button type="primary" onClick={() => handleCancelPayment()}>
                  Cancel
                </Button>
                <Button type="primary" onClick={() => handleConfirmPayment()}>
                  GOT IT
                </Button>
              </>
            }
          />
        </>
      </Modal>
    </>
  );
}
