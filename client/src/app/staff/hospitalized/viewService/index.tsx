"use client";
import { UserModel } from "@/app/admin/account/_components/type";
import UseAxiosAuth from "@/utils/axiosClient";
import {
  DeleteOutlined,
  EllipsisOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  LoadingOutlined,
} from "@ant-design/icons";
import {
  Button,
  Dropdown,
  Form,
  Input,
  MenuProps,
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
  dischangeDate: boolean;
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
  onRemove: () => void;
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

export default function ViewServicePetCare(props: userModal) {
  const instance = UseAxiosAuth();
  const { isOpen, onClose, onReload, id, dischangeDate } = props;

  const [error, setError] = useState<string>("");

  const useInstance = UseAxiosAuth();
  const [form] = useForm();
  const [api, contextHolder] = notification.useNotification();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [services, setServices] = useState<ServiceModel[]>([]);
  const [serviceRes, setServiceRes] = useState<ServiceResponse>();

  const petLoveColumn: ColumnsType<ServiceModel> = [
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
    {
      title: "",
      dataIndex: "operation",
      fixed: "right",
      align: "right",
      render: (text, record) => {
        const renderItems = (
          id: string,
          onRemove: () => void
        ): MenuProps["items"] => {
          return [
            {
              label: (
                <a
                  onClick={() => {
                    {
                      true
                        ? Modal.confirm({
                            title: "Do you really want to delete this service?",
                            centered: true,
                            width: "500px",
                            onOk: () => {
                              onRemove?.();
                            },
                            footer: (_, { OkBtn, CancelBtn }) => (
                              <>
                                <CancelBtn />
                                <OkBtn />
                              </>
                            ),
                          })
                        : Modal.info({
                            title: "Account deleted",
                            content: (
                              <div>
                                <p>This service is deleted</p>
                              </div>
                            ),
                            onOk() {},
                          });
                    }
                  }}
                >
                  <Space>
                    <DeleteOutlined /> Delete
                  </Space>
                </a>
              ),
              key: "2",
            },
          ];
        };
        return (
          <>
            {!dischangeDate ? (
              <>
                <Dropdown
                  menu={{
                    items: renderItems(record.id, record.onRemove!),
                  }}
                >
                  <a onClick={(e) => e.preventDefault()}>
                    <Space>
                      <Button type="text" icon={<EllipsisOutlined />}></Button>
                    </Space>
                  </a>
                </Dropdown>
              </>
            ) : (
              <></>
            )}
          </>
        );
      },
    },
  ];

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const openNotification = (type: "success" | "error", status: string) => {
    api[type]({
      message: `Service ${status}`,
      placement: "bottomRight",
      duration: 1.5,
    });
  };

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

  const handleDelete = async (id: string) => {
    setIsLoading(true);
    try {
      const res = await instance.delete(`/api/v1/petCare/deleteService/${id}`);
      if (res.data.status === 200 || res.data.status === 201) {
        openNotification("success", "deleted successfully");
        handleEvent();
        onReload();
      } else {
        openNotification("error", "deleted failure");
      }
    } catch (error) {
      openNotification("error", "deleted failure");
      console.log(error);
    }
    setIsLoading(false);
  };

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
              onRemove: () => handleDelete(service.id),
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
