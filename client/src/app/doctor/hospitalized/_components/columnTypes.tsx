"use client";
import { Badge, Button, Dropdown, MenuProps, Modal, Space, Tag } from "antd";
import { ColumnsType, TableProps } from "antd/es/table";
// import { AccountModel } from './models';

import {
  EllipsisOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { PetCareModel } from "@/app/doctor/hospitalized/_components/type";

export const petCareColumn: ColumnsType<PetCareModel> = [
  {
    title: "Pet",
    dataIndex: "petName",
  },
  {
    title: "Cage name",
    dataIndex: "cageNumber",
  },
  {
    title: "Price",
    dataIndex: "totalPrice",
  },
  {
    title: "Pet Status",
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
    title: "",
    dataIndex: "operation",
    fixed: "right",
    align: "right",
    render: (text, record) => {
      const renderItems = (
        id: string,
        onDischarge: () => void
      ): MenuProps["items"] => {
        return [
          {
            label: (
              <a
                onClick={() => {
                  {
                    true ? (
                      Modal.confirm({
                        title: "Do you really want to discharge this pet?",
                        centered: true,
                        width: "500px",
                        onOk: () => {
                          onDischarge?.();
                        },
                        footer: (_, { OkBtn, CancelBtn }) => (
                          <>
                            <CancelBtn />
                            <OkBtn />
                          </>
                        ),
                      })
                    ) : (
                      <></>
                    );
                  }
                }}
              >
                <Space>
                  <EditOutlined /> Discharge
                </Space>
              </a>
            ),
            key: "0",
          },
        ];
      };
      return (
        <>
          {!record.dischargeDate ? (
            <Dropdown
              menu={{
                items: renderItems(record.id, record.onDischarge!),
              }}
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <Button type="text" icon={<EllipsisOutlined />}></Button>
                </Space>
              </a>
            </Dropdown>
          ) : (
            <></>
          )}
        </>
      );
    },
  },
];
