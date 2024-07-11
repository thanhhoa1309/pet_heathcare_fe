"use client";
import ModalCancel from "@/app/(homepage)/user/appointment/_components/ModalCancel";
import ModalPayment from "@/app/(homepage)/user/appointment/_components/ModalPayment";
import { appointmentsColumn } from "@/app/(homepage)/user/appointment/_components/columnTypes";
import {
  AppointmentModel,
  AppointmentResponse,
} from "@/app/(homepage)/user/appointment/_components/type";
import CreateAppointment from "@/app/(homepage)/user/appointment/createAppointment";
import FeedbackAppointment from "@/app/(homepage)/user/appointment/feedbackAppointment";
import UpdateAppointment from "@/app/(homepage)/user/appointment/updateAppointment";
import ViewAppointment from "@/app/(homepage)/user/appointment/viewAppointment";
import ViewFeedbackAppointment from "@/app/(homepage)/user/appointment/viewFeedbackAppointment";
import { petColumn } from "@/app/(homepage)/user/pets/_components/columnTypes";
import { PetModel } from "@/app/(homepage)/user/pets/_components/type";
import CreatePet from "@/app/(homepage)/user/pets/createPet";
import UpdatePet from "@/app/(homepage)/user/pets/updatePet";
import CreateUser from "@/app/admin/account/createUser";
import UpdateUser from "@/app/admin/account/updateUser";
import UseAxiosAuth from "@/utils/axiosClient";
import { LoadingOutlined } from "@ant-design/icons";
import {
  Breadcrumb,
  Button,
  Col,
  Divider,
  Dropdown,
  Row,
  Space,
  Table,
  notification,
} from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AppointmentPage() {
  const instance = UseAxiosAuth();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [api, contextHolder] = notification.useNotification();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const [appointmentUpdate, setAppointmentUpdate] = useState<string>("");
  const [openModalPayment, setOpenModalPayment] = useState<boolean>(false);

  const [cancelId, setCancelId] = useState<string>("");
  const [feedBackId, setFeedBackId] = useState<string>("");
  const [openModalCancel, setOpenModalCancel] = useState<boolean>(false);

  const [createState, setCreateState] = useState<boolean>(false);
  const [updateState, setUpdateState] = useState<boolean>(false);
  const [viewFeedBackState, setViewFeedBackState] = useState<boolean>(false);
  const [feedBackState, setFeedBackState] = useState<boolean>(false);
  const [viewState, setViewState] = useState<boolean>(false);

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const [appointments, setAppointments] = useState<AppointmentModel[]>([]);
  const [appointmentsRes, setAppointmentsRes] = useState<AppointmentResponse>();

  const [paymentUrl, setPaymentUrl] = useState<string>("");

  const openNotification = (type: "success" | "error", status: string) => {
    api[type]({
      message: `Appointment ${status}`,
      placement: "bottomRight",
      duration: 1.5,
    });
  };

  const hasSelected = selectedRowKeys.length > 0;

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);

    if (newSelectedRowKeys.length > 0) {
      const selectedEmails = [];
      for (const key of newSelectedRowKeys) {
        const accountId = key.toString();
      }
    } else {
    }

    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleUpdate = (id: string) => {
    setAppointmentUpdate(id);
    setUpdateState(true);
  };

  const handleView = (id: string) => {
    setAppointmentUpdate(id);
    setViewState(true);
  };

  const handleDelete = async (id: string) => {
    setIsLoading(true);
    try {
      const res = await instance.patch(`/api/v1/appointment/delete/${id}`);
      if (res.data.status === 200 || res.data.status === 201) {
        openNotification("success", "deleted successfully");
        handleEvent();
      } else {
        openNotification("error", "deleted failure");
      }
    } catch (error) {
      openNotification("error", "deleted failure");
      console.log(error);
    }
    setIsLoading(false);
  };

  const handlePagination = async (page: number = pagination.current) => {
    setIsLoading(true);
    try {
      const res = await instance.get("/api/v1/appointment", {
        params: {
          page: page - 1,
        },
      });

      let tempRes = res.data.data;

      setAppointmentsRes(tempRes);
      setAppointments(tempRes.content);
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
  }, []);

  const handleEvent = () => {
    handlePagination();
  };

  const handleCancelPayment = () => {
    setOpenModalPayment(false);
  };

  const handleConfirmPayment = () => {
    window.open(paymentUrl, "_blank", "noopener,noreferrer");
    // router.push(paymentUrl);
    setOpenModalPayment(false);
  };

  const handleRepay = async (id: string) => {
    setIsLoading(true);
    try {
      const res = await instance.put(`/api/v1/appointment/repay/${id}`);
      if (res.data.status === 200 || res.data.status === 201) {
        let tempRes = res.data.data;
        setPaymentUrl(tempRes.paymentUrl);
        setOpenModalPayment(true);
      } else {
        openNotification("error", res.data.error);
      }
    } catch (error: any) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const handleOpenModalCancel = (id: string) => {
    setCancelId(id);
    setOpenModalCancel(true);
  };

  const handleCancelAppointment = () => {
    setOpenModalCancel(false);
  };

  const handleConfirmAppointment = () => {
    handleCancel();
    setOpenModalCancel(false);
  };

  const handleCancel = async () => {
    setIsLoading(true);
    try {
      const res = await instance.put(`/api/v1/appointment/cancel/${cancelId}`);
      if (res.data.status === 200 || res.data.status === 201) {
        let tempRes = res.data.data;
        openNotification("success", "Cancle successfully");
        handleEvent();
      } else {
        openNotification("error", res.data.error);
      }
    } catch (error: any) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const handleFeedback = (id: string) => {
    setFeedBackId(id);
    setFeedBackState(true);
  };

  const handleViewFeedback = (id: string) => {
    setFeedBackId(id);
    setViewFeedBackState(true);
  };

  return (
    <>
      <div className="container py-5">
        {contextHolder}
        <Row justify={"space-between"} style={{ marginBottom: 16 }}>
          <Col>
            <strong
            // className={cx('title')}
            >
              Appointment
            </strong>{" "}
            <br />
            {/* <Breadcrumb
              items={[
                {
                  href: "/admin/dashboard",
                  title: "Home",
                },
                {
                  title: "Accounts",
                },
              ]}
            /> */}
          </Col>
          <Col>
            {hasSelected ? (
              <Space>
                <Button
                  type="text"
                  style={{ color: "grey" }}
                  // onClick={onClearSelect}
                >
                  <span style={{ textDecoration: "underline" }}>Clear</span>
                </Button>
                <Divider type="vertical" />
                <span style={{ color: "grey", lineHeight: "12px" }}>
                  {" "}
                  <b>{selectedRowKeys.length}</b> Record Selected
                </span>
                <Divider type="vertical" />
              </Space>
            ) : (
              <Space>
                <span style={{ color: "grey", lineHeight: "12px" }}>
                  Totals{" "}
                  {!isLoading ? (
                    appointmentsRes?.totalElements
                  ) : (
                    <LoadingOutlined />
                  )}{" "}
                  records
                </span>
                <Divider type="vertical" />
                {/* <Filter handleDataFilter={handleDataFilter} /> */}
                <Button
                  type="primary"
                  onClick={() => setCreateState(true)}
                  // menu={{ items }}
                >
                  Create New Appointment
                </Button>
                <CreateAppointment
                  isOpen={createState}
                  onClose={() => setCreateState(false)}
                  onReload={handleEvent}
                />
                {/* <UpdateAccount
                  params={{
                    id: accountId,
                    visible: updateState,
                    onCancel: () => setUpdateState(false),
                    pageSize: pagination.pageSize
                  }}
                /> */}
              </Space>
            )}
          </Col>
        </Row>
        <Table
          loading={isLoading}
          rowKey="id"
          rowSelection={rowSelection}
          onRow={(record) => ({
            onClick: (event) => {
              const target = event.target as HTMLElement;
              const isWithinLink =
                target.tagName === "A" || target.closest("a");
              const isWithinAction =
                target.closest("td")?.classList.contains("ant-table-cell") &&
                !target
                  .closest("td")
                  ?.classList.contains("ant-table-selection-column") &&
                !target
                  .closest("td")
                  ?.classList.contains("ant-table-cell-fix-right");

              if (isWithinAction && !isWithinLink) {
                handleView(record.id);
              }
            },
          })}
          columns={appointmentsColumn}
          dataSource={appointments.map((appointment: any) => ({
            ...appointment,
            onUpdate: () => handleUpdate(appointment.id),
            onRemove: () => handleDelete(appointment.id),
            onRepay: () => handleRepay(appointment.id),
            onCancel: () => handleOpenModalCancel(appointment.id),
            onView: () => handleView(appointment.id),
            onReview: () => handleFeedback(appointment.id),
            onViewFeedBack: () => handleViewFeedback(appointment.id),
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
        <UpdateAppointment
          isOpen={updateState}
          onClose={() => setUpdateState(false)}
          onReload={handleEvent}
          id={appointmentUpdate}
        />
        <ViewAppointment
          isOpen={viewState}
          onClose={() => setViewState(false)}
          onReload={handleEvent}
          id={appointmentUpdate}
        />
        <ModalPayment
          isOpen={openModalPayment}
          onClose={() => setOpenModalPayment(false)}
          handleCancelPayment={handleCancelPayment}
          handleConfirmPayment={handleConfirmPayment}
        ></ModalPayment>
        <ModalCancel
          isOpen={openModalCancel}
          onClose={() => setOpenModalCancel(false)}
          handleCancelAppointment={handleCancelAppointment}
          handleConfirmAppointment={handleConfirmAppointment}
        ></ModalCancel>
        <FeedbackAppointment
          isOpen={feedBackState}
          onClose={() => setFeedBackState(false)}
          onReload={handleEvent}
          id={feedBackId}
        ></FeedbackAppointment>
        <ViewFeedbackAppointment
          isOpen={viewFeedBackState}
          onClose={() => setViewFeedBackState(false)}
          onReload={handleEvent}
          id={feedBackId}
        ></ViewFeedbackAppointment>
      </div>
    </>
  );
}
