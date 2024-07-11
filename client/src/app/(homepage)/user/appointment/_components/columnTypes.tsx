"use client";
import { Badge, Button, Dropdown, MenuProps, Modal, Space, Tag } from "antd";
import { ColumnsType, TableProps } from "antd/es/table";
// import { AccountModel } from './models';

import {
  EllipsisOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { AppointmentModel } from "@/app/(homepage)/user/appointment/_components/type";

const getStatusColor = (status: string) => {
  switch (status) {
    case "Pending":
      return "warning";
    case "Booked":
      return "success";
    case "Cancelled":
      return "error";
    default:
      return "default";
  }
};

export const appointmentsColumn: ColumnsType<AppointmentModel> = [
  {
    title: "Appointment Date",
    dataIndex: "appointmentDate",
  },
  {
    title: "Pet",
    dataIndex: "petName",
  },
  {
    title: "Doctor",
    dataIndex: "doctorName",
  },
  {
    title: "Status",
    dataIndex: "appointmentStatus",
    render: (text, record: AppointmentModel) => {
      return (
        <>
          {record.appointmentStatus === "PENDING" && (
            <>
              <Tag color="warning">{record.appointmentStatus}</Tag>
            </>
          )}
          {record.appointmentStatus === "BOOKED" && (
            <>
              <Tag color="success">{record.appointmentStatus}</Tag>
            </>
          )}
          {record.appointmentStatus === "CANCELLED" && (
            <>
              <Tag color="error">{record.appointmentStatus}</Tag>
            </>
          )}
        </>
      );
    },
  },
  {
    title: "Time Frame",
    dataIndex: "TimeFrameState",
    render: (text, record: AppointmentModel) => {
      return (
        <>
          {record.timeFrame === "MORNING" && (
            <>
              <Tag color="blue">{record.timeFrame}</Tag>
            </>
          )}
          {record.timeFrame === "AFTERNOON" && (
            <>
              <Tag color="volcano">{record.timeFrame}</Tag>
            </>
          )}
        </>
      );
    },
  },
  {
    title: "Price",
    dataIndex: "appointmentPrice",
  },
  {
    title: "Payment",
    dataIndex: "paid Status",
    render: (text, record: AppointmentModel) => {
      return (
        <>
          <Tag color={record.paidStatus ? "success" : "error"}>
            {record.paidStatus ? "Done" : "Not yet"}
          </Tag>
        </>
      );
    },
  },
  {
    title: "Refund",
    dataIndex: "refund_payments",
    render: (text, record: AppointmentModel) => {
      return <>{record.refund_payments > 0 ? record.refund_payments : ""}</>;
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
        onUpdate: () => void,
        onRePay: () => void,
        onCancel: () => void,
        onView: () => void,
        onReview: () => void,
        onViewFeedBack: () => void
      ): MenuProps["items"] => {
        function getAction(type: string) {
          switch (type) {
            case "PENDING":
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
                {
                  label: (
                    <a
                      onClick={() => {
                        {
                          !record.deleted
                            ? Modal.confirm({
                                title:
                                  "Do you really want to delete this appointment?",
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
                                title: "Appointment deleted",
                                content: (
                                  <div>
                                    <p>This Appointment is deleted</p>
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
                {
                  label: (
                    <a
                      onClick={() => {
                        onRePay?.();
                      }}
                    >
                      <Space>
                        <EditOutlined /> Repay
                      </Space>
                    </a>
                  ),
                  key: "3",
                },
              ];
            case "BOOKED":
              return [
                {
                  label: (
                    <a
                      onClick={() => {
                        onCancel?.();
                      }}
                    >
                      <Space>
                        <EditOutlined /> Cancel
                      </Space>
                    </a>
                  ),
                  key: "0",
                },
                {
                  label: (
                    <a
                      onClick={() => {
                        onReview?.();
                      }}
                    >
                      <Space>
                        <EditOutlined /> Review
                      </Space>
                    </a>
                  ),
                  key: "1",
                },
                {
                  label: (
                    <a
                      onClick={() => {
                        onViewFeedBack?.();
                      }}
                    >
                      <Space>
                        <EditOutlined /> View feedback
                      </Space>
                    </a>
                  ),
                  key: "2",
                },
              ];
            case "CANCELLED":
              return [
                // {
                //   label: (
                //     <a
                //       onClick={() => {
                //         onView?.();
                //       }}
                //     >
                //       <Space>
                //         <EditOutlined /> Cancel
                //       </Space>
                //     </a>
                //   ),
                //   key: "0",
                // },
              ];
          }
        }

        return getAction(record.appointmentStatus);
      };
      return (
        <>
          <Dropdown
            menu={{
              items: renderItems(
                record.id,
                record.onRemove!,
                record.onUpdate!,
                record.onRepay!,
                record.onCancel!,
                record.onView!,
                record.onReview!,
                record.onViewFeedBack!
              ),
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
