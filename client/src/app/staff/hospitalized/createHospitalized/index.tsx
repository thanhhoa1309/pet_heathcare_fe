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
}

interface CreateAppointment {
  petId: string;
  doctorId: string;
  cageId: string;
  // serviceIds: string;
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

interface CageModel {
  id: string;
  cageNumber: string;
  cageStatus: "Available" | "Occupied" | "Cleaning";
  createdAt: string;
  updatedAt: string;
  deleted: boolean;
  capacity: number;
}

interface optionModel {
  values: string;
  label: string;
}

export default function CreateHospitalized(props: AppointmentModal) {
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
  const [cages, setCages] = useState<CageModel[]>();
  const [cageOptions, setCageOptions] = useState<optionModel[]>([]);

  const openNotification = (type: "success" | "error", description: string) => {
    api[type]({
      message: `Add new HOSPITALIZATION`,
      description: `Add new HOSPITALIZATION ${description}`,
      placement: "bottomRight",
      duration: 3,
    });
  };

  const fetchDataPets = async () => {
    try {
      const res = await instance.get("/api/v1/pet/staff");

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
      const res = await instance.get("/api/v1/service/types", {
        params: {
          type: "HOSPITALIZATION",
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

  const fetchDataCages = async () => {
    try {
      const res = await instance.get("/api/v1/cage");

      let tempRes = res.data.data;
      const options = tempRes.map((cage: any) => ({
        value: cage.id,
        label: (
          <div className="d-flex justify-content-between">
            <span>Cage Number: {cage.cageNumber}</span>
            <span>Capacity: {cage.capacity}</span>
          </div>
        ),
      }));

      setCageOptions(options);
      setCages(tempRes);
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isOpen) {
      form.resetFields();
    }

    setError("");
    fetchDataDoctors();
    fetchDataPets();
    fetchDataServices();
    fetchDataCages();
  }, [isOpen]);

  const onFinish = async (values: any) => {
    setError("");
    setIsLoading(true);

    let appointment: CreateAppointment = {
      petId: values.petId,
      doctorId: values.doctorId,
      cageId: values.cageId,
      // serviceIds: values.serviceId,
    };

    console.log(appointment);
    try {
      const res = await instance.post("/api/v1/petCare/create", appointment);

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
      setError(error.error);
      console.log(error);
    }

    setIsLoading(false);
  };

  return (
    <>
      {contextHolder}
      <Modal
        title={<h3 style={{ textAlign: "center" }}>Add new Hospitalized</h3>}
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

          {/* <Form.Item
            label="Service"
            name="serviceIds"
            rules={[
              {
                required: true,
                message: "Enter Service",
              },
            ]}
          >
            <Select
              mode="multiple"
              placeholder="Enter Service"
              options={serviceOptions}
            />
          </Form.Item> */}

          <Form.Item
            label="Cage Number"
            name="cageId"
            rules={[
              {
                required: true,
                message: "Enter Cage",
              },
            ]}
          >
            <Select placeholder="Enter Cage" options={cageOptions} />
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
    </>
  );
}
