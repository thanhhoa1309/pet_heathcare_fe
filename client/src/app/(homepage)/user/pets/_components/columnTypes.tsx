"use client";
import { Badge, Button, Dropdown, MenuProps, Modal, Space, Tag } from "antd";
import { ColumnsType, TableProps } from "antd/es/table";
// import { AccountModel } from './models';
import { Image } from "antd";

import {
  EllipsisOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { MdDisabledByDefault } from "react-icons/md";
import { PetModel } from "@/app/(homepage)/user/pets/_components/type";

export const petColumn: ColumnsType<PetModel> = [
  {
    title: "",
    dataIndex: "Image",
    render: (_, record) => {
      return (
        <>
          <Image src={record.imageUrl} alt={"pet"} width={50} height={50} />
        </>
      );
    },
  },
  {
    title: "Pet Name",
    dataIndex: "name",
  },
  {
    title: "Species",
    dataIndex: "species",
  },
  {
    title: "Gender",
    dataIndex: "gender",
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
                  {
                    !record.deleted
                      ? Modal.confirm({
                          title: "Do you really want to delete this account?",
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
                              <p>This account is deleted</p>
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
