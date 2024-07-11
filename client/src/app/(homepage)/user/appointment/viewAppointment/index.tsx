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
import { MdOutlinePayment } from "react-icons/md";

interface AppointmentModal {
  isOpen: boolean;
  onClose: () => void;
  onReload: () => void;
  id: string;
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

export default function ViewAppointment(props: AppointmentModal) {
  const { isOpen, onClose, onReload, id } = props;
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

  const [isChooseDoctor, setIsChooseDoctor] = useState<boolean>(false);
  const [doctors, setDoctors] = useState<DoctorModel[]>();
  const [doctorOptions, setDoctorOptions] = useState<optionModel[]>([]);

  const openNotification = (type: "success" | "error", description: string) => {
    api[type]({
      message: `Update Appointment`,
      description: `Update Appointment ${description}`,
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

  const disableDay = (current: any) => {
    return current && current.valueOf() < Date.now();
  };

  const fetchDataServices = async () => {
    try {
      const res = await instance.get("/api/v1/service/types", {
        params: {
          type: "APPOINTMENT",
        },
      });

      let tempRes = res.data.data;
      const options = tempRes.map((service: any) => ({
        value: service.id,
        label: (
          <div className="d-flex justify-content-between">
            <span>{service.name}</span>
            <span>Price: {service.price}</span>
          </div>
        ),
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

  const fetchDataDoctors = async (day: string) => {
    try {
      const res = await instance.get("/api/v1/doctor/availability", {
        params: {
          date: day,
        },
      });

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

  const fetchDataAppointment = async () => {
    setIsLoading(true);
    try {
      const res = await instance.get(`/api/v1/appointment/${id}`);
      if (res.data.status === 200 || res.data.status === 201) {
        handleChangeDatePicker(dayjs(res.data.data.appointmentDate));
        form.setFieldsValue({
          ...res.data.data,
          appointmentDate: dayjs(res.data.data.appointmentDate),
          petId: res.data.data.petId,
          doctorId: res.data.data.doctorId,
          serviceId: res.data.data.serviceId,
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
      setIsChooseDoctor(false);
      form.resetFields();
      fetchDataAppointment();
    }
    setError("");
    fetchDataPets();
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
      const res = await instance.put(
        `/api/v1/appointment/update/${id}`,
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
      setError(error);
      console.log(error);
    }
  };

  const handleChangeDatePicker = async (_day: any) => {
    form.setFieldsValue({ doctorId: undefined });
    fetchDataDoctors(dayjs(_day).format("YYYY-MM-DD").toString());
    setIsChooseDoctor(true);
  };

  return (
    <>
      {contextHolder}
      <Modal
        title={<h3 style={{ textAlign: "center" }}>View Appointment</h3>}
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
              allowClear={false}
              disabledDate={disableDay}
              onChange={handleChangeDatePicker}
              disabled
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
            <Select
              placeholder="Enter Pet name"
              options={petsOptions}
              disabled
            />
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
            <Select
              placeholder="Enter Doctor"
              options={doctorOptions}
              disabled
            />
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
            <Select
              placeholder="Enter Service"
              options={serviceOptions}
              disabled
            />
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
