"use client";
import { Button, Dropdown, MenuProps, Modal, Space, Tag } from "antd";
import { ColumnsType, TableProps } from "antd/es/table";
// import { AccountModel } from './models';
import { Image } from "antd";
// import Image from "next/image";
import {
  EllipsisOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { MdDisabledByDefault } from "react-icons/md";
import { DoctorModel } from "@/app/admin/doctor/_components/type";

const Color = [
  "#F8BBD9", // Pastel Pink
  "#E6C9AF", // Pastel Peach
  "#C6E0CE", // Pastel Mint Green
  "#A9DCD3", // Pastel Blue
  "#DCDCDC", // Pastel Gray
  "#F0F8FF", // Pastel Light Blue
  "#FFF6B9", // Pastel Cream
];

export const doctorColumn: ColumnsType<DoctorModel> = [
  {
    title: "",
    dataIndex: "Image",
    render: (_, record) => {
      console.log(record);
      return (
        <>
          <Image src={record.imageUrl} alt={"doctor"} width={50} />
        </>
      );
    },
  },
  {
    title: "Full Name",
    dataIndex: "fullName",
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Working time",
    dataIndex: "Working time",
    render: (_, record) => {
      return (
        <>
          {record.start_time} - {record.end_time}
        </>
      );
    },
  },
  {
    title: "Working day",
    dataIndex: "Working day",
    render: (_, record) => {
      return (
        <>
          {record.workingDay.map((day, index) => {
            return (
              <>
                <Tag
                  color={Color[index]}
                  style={{ marginRight: 3, marginBottom: 3 }}
                >
                  {day}
                </Tag>
              </>
            );
          })}
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
          // {
          //   type: "divider",
          // },
          // {
          //   label: (
          //     <a
          //       onClick={() => {
          //         Modal.confirm({
          //           title: "Do you really want to delete this cage?",
          //           centered: true,
          //           width: "500px",
          //           onOk: () => {
          //             onRemove?.();
          //           },
          //           footer: (_, { OkBtn, CancelBtn }) => (
          //             <>
          //               <CancelBtn />
          //               <OkBtn />
          //             </>
          //           ),
          //         });
          //       }}
          //     >
          //       <Space>
          //         <DeleteOutlined /> Delete
          //       </Space>
          //     </a>
          //   ),
          //   key: "2",
          //   disabled: true,
          // },
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

const getTagColor = (day: string[]) => {};
