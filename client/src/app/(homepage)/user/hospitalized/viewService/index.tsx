"use client";
import { UserModel } from "@/app/admin/account/_components/type";
import UseAxiosAuth from "@/utils/axiosClient";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LoadingOutlined,
} from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  Modal,
  NotificationArgsProps,
  Row,
  Select,
  Space,
  Spin,
  notification,
} from "antd";
import { useForm } from "antd/es/form/Form";
import { NotificationPlacement } from "antd/es/notification/interface";
import Table, { ColumnsType } from "antd/es/table";
import React, { useEffect } from "react";
import { useMemo, useState } from "react";

interface userModal {
  isOpen: boolean;
  onClose: () => void;
  onReload: () => void;
  id: string;
}

interface ServiceResponse {
  content: ServiceModel[];
  pageable: pages;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

interface ServiceModel {
  id: string;
  serviceName: string;
  price: number;
  dateUsage: string;
}

interface pages {
  pageNumber: number;
  pageSize: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  offset: number;
  unpaged: boolean;
  paged: boolean;
}

export const petLoveColumn: ColumnsType<ServiceModel> = [
  {
    title: "Service Name",
    dataIndex: "serviceName",
  },
  {
    title: "Price",
    dataIndex: "price",
  },
  {
    title: "Date Usage",
    dataIndex: "dateUsage",
  },
];

export default function ViewServicePetCare(props: userModal) {
  const instance = UseAxiosAuth();
  const { isOpen, onClose, onReload, id } = props;

  const [error, setError] = useState<string>("");

  const useInstance = UseAxiosAuth();
  const [form] = useForm();
  const [api, contextHolder] = notification.useNotification();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [services, setServices] = useState<ServiceModel[]>([]);
  const [serviceRes, setServiceRes] = useState<ServiceResponse>();

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const handlePagination = async (page: number = pagination.current) => {
    setIsLoading(true);
    try {
      const res = await instance.get(`/api/v1/petCare/services/${id}`, {
        params: {
          id: id,
          page: page - 1,
        },
      });

      let tempRes = res.data.data;

      setServiceRes(tempRes);
      setServices(tempRes.content);
      setPagination({
        current: page,
        pageSize: tempRes.size,
        total: tempRes.totalElements,
      });
    } catch (error: any) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    handlePagination();
  }, [isOpen]);

  const handleEvent = () => {
    handlePagination();
  };

  useEffect(() => {
    if (isOpen) {
      setError("");
    }
  }, [isOpen]);

  return (
    <>
      {contextHolder}
      <Modal
        title={<h3 style={{ textAlign: "center" }}>Pet Care</h3>}
        open={isOpen}
        width={600}
        onCancel={onClose}
        footer={() => <></>}
        cancelText="No"
        closable={false}
      >
        <Spin spinning={isLoading}>
          <Table
            loading={isLoading}
            rowKey="id"
            columns={petLoveColumn}
            dataSource={services.map((service: any) => ({
              ...service,
            }))}
            pagination={{
              ...pagination,
              onChange: (page, pageSize) => handlePagination(page),
              onShowSizeChange: (_, size) => handlePagination(),
              showSizeChanger: true,
              pageSizeOptions: ["5"],
              // showTotal: (total, range) =>
              //   {
              //     from: range[0],
              //     to: range[1],
              //     total: total,
              //   }),
            }}
          />
        </Spin>
      </Modal>
    </>
  );
}
