"use client";
import { Button, Dropdown, MenuProps, Modal, Space, Tag } from "antd";
import { ColumnsType, TableProps } from "antd/es/table";
// import { AccountModel } from './models';

import {
  EllipsisOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { MdDisabledByDefault } from "react-icons/md";
import { CageModel } from "@/app/admin/cage/_components/type";

export const cageColumn: ColumnsType<CageModel> = [
  {
    title: "Cage Number",
    dataIndex: "cageNumber",
  },
  {
    title: "Capacity",
    dataIndex: "capacity",
  },
  {
    title: "Status",
    dataIndex: "status",
    render: (_, record) => {
      return <>{getTagColor(record.cageStatus)}</>;
    },
  },
  {
    title: "Deleted",
    dataIndex: "delete",
    render: (_, record) => {
      return (
        <>
          {record.deleted ? (
            <>
              <Tag color="success">TRUE</Tag>
            </>
          ) : (
            <>
              <Tag color="error">FALSE</Tag>
            </>
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
        onRemove: () => void,
        onUpdate: () => void
      ): MenuProps["items"] => {
        return [
          {
            label: (
              <a
                onClick={() => {
                  onUpdate?.();
                }}
              >
                <Space>
                  <EditOutlined /> Update
                </Space>
              </a>
            ),
            key: "0",
          },
          // {
          //   label: (
          //     <a
          //       onClick={() => {
          //         onDisable?.();
          //       }}
          //     >
          //       <Space>
          //         <MdDisabledByDefault /> Disable
          //       </Space>
          //     </a>
          //   ),
          //   key: '1'
          // },
          {
            type: "divider",
          },
          {
            label: (
              <a
                onClick={() => {
                  Modal.confirm({
                    title: "Do you really want to delete this cage?",
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
                  });
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
          <Dropdown
            menu={{
              items: renderItems(record.id, record.onRemove!, record.onUpdate!),
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

const getTagColor = (status: string = "") => {
  switch (status) {
    case "Available":
      return (
        <>
          <Tag color="success">{status}</Tag>
        </>
      );
    case "Not Available":
      return (
        <>
          <Tag color="error">{status}</Tag>
        </>
      );
    default:
      return <></>;
  }
};
