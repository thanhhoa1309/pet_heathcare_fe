"use client";
import { Badge, Button, Dropdown, MenuProps, Modal, Space, Tag } from "antd";
import { ColumnsType, TableProps } from "antd/es/table";
// import { AccountModel } from './models';

import {
  EllipsisOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { PetCareModel } from "@/app/(homepage)/user/hospitalized/_components/type";

export const petLoveColumn: ColumnsType<PetCareModel> = [
  {
    title: "Pet Name",
    dataIndex: "petName",
  },
  {
    title: "Doctor",
    dataIndex: "doctorName",
  },
  {
    title: "Cage",
    dataIndex: "cageNumber",
  },
  {
    title: "Status",
    dataIndex: "status",
    render: (text, record: PetCareModel) => {
      return (
        <>
          <Tag
            color={record.status === "UNDER_TREATMENT" ? "error" : "success"}
          >
            {record.status}
          </Tag>
        </>
      );
    },
  },
  {
    title: "Appointment Date",
    dataIndex: "appointment Date",
    render: (_: any, record: PetCareModel) => {
      return (
        <>
          {record.admissionDate === null ? (
            <Tag color={"error"}>{"Not yet"}</Tag>
          ) : (
            record.admissionDate
          )}
        </>
      );
    },
  },
  {
    title: "Discharge Date",
    dataIndex: "dischargeDate",
    render: (_: any, record: PetCareModel) => {
      return (
        <>
          {record.dischargeDate === null ? (
            <Tag color={"error"}>{"Not yet"}</Tag>
          ) : (
            record.dischargeDate
          )}
        </>
      );
    },
  },
  {
    title: "Price",
    dataIndex: "totalPrice",
  },
  {
    title: "Payment",
    dataIndex: "paid",
    render: (text, record: PetCareModel) => {
      return (
        <>
          <Tag color={record.paid ? "success" : "error"}>
            {record.paid ? "Done" : "Not yet"}
          </Tag>
        </>
      );
    },
  },
  {
    title: "",
    dataIndex: "operation",
    fixed: "right",
    align: "right",
    render: (text, record) => {
      const renderItems = (
        id: string,
        onRepay: () => void,
        onView: () => void
      ): MenuProps["items"] => {
        return [
          {
            label: (
              <a
                onClick={() => {
                  onRepay?.();
                }}
              >
                <Space>
                  <EditOutlined /> Pay
                </Space>
              </a>
            ),
            key: "0",
          },
          {
            label: (
              <a
                onClick={() => {
                  onView?.();
                }}
              >
                <Space>
                  <EditOutlined /> View
                </Space>
              </a>
            ),
            key: "1",
          },
        ];
      };
      return (
        <>
          <Dropdown
            menu={{
              items: renderItems(record.id, record.onRepay!, record.onView!),
            }}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <Button type="text" icon={<EllipsisOutlined />}></Button>
              </Space>
            </a>
          </Dropdown>
        </>
      );
    },
  },
];
