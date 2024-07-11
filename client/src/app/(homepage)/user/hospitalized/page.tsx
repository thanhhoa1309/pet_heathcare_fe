"use client";

import ModalPayment from "@/app/(homepage)/user/hospitalized/_components/ModalPayment";
import { petLoveColumn } from "@/app/(homepage)/user/hospitalized/_components/columnTypes";
import { PetCareModel } from "@/app/(homepage)/user/hospitalized/_components/type";
import UpdatePetCare from "@/app/(homepage)/user/hospitalized/updateHospitalized";
import ViewServicePetCare from "@/app/(homepage)/user/hospitalized/viewService";
// import CreateHospitalized from "@/app/staff/hospitalized/createHospitalized";
// import UpdateHospitalized from "@/app/staff/hospitalized/updateHospitalized";
import UseAxiosAuth from "@/utils/axiosClient";
import { LoadingOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Row, Space, Table, notification } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const HospitalizedPage = () => {
  const instance = UseAxiosAuth();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [api, contextHolder] = notification.useNotification();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const [petCareUpdate, setPetCareUpdate] = useState<PetCareModel>();
  const [openModalPayment, setOpenModalPayment] = useState<boolean>(false);

  const [viewId, setViewId] = useState<string>("");
  const [openModalCancel, setOpenModalCancel] = useState<boolean>(false);

  const [createState, setCreateState] = useState<boolean>(false);
  const [updateState, setUpdateState] = useState<boolean>(false);
  const [viewState, setViewState] = useState<boolean>(false);

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const [petCares, setPetCares] = useState<PetCareModel[]>([]);
  // const [appointmentsRes, setAppointmentsRes] = useState<PetCareResponse>();

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

  const handleUpdate = (_petCare: PetCareModel) => {
    setPetCareUpdate(_petCare);
    setUpdateState(true);
  };

  const handleView = (id: string) => {
    setViewId(id);
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

  const handlePagination = async () => {
    setIsLoading(true);
    try {
      const res = await instance.get("/api/v1/petCare/customer/all");

      let tempRes = res.data.data;

      setPetCares(tempRes);
      // setPagination({
      //   current: page,
      //   pageSize: tempRes.size,
      //   total: tempRes.totalElements,
      // });
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

  const handleRepay = async (id: string) => {
    setIsLoading(true);
    try {
      const res = await instance.post(`/api/v1/petCare/pay/${id}`);
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

  const handleCancelPayment = () => {
    setOpenModalPayment(false);
  };

  const handleConfirmPayment = () => {
    window.open(paymentUrl, "_blank", "noopener,noreferrer");
    // router.push(paymentUrl);
    setOpenModalPayment(false);
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
              Pet Care
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
                  Totals {!isLoading ? petCares?.length : <LoadingOutlined />}{" "}
                  records
                </span>
                <Divider type="vertical" />
                {/* <Filter handleDataFilter={handleDataFilter} /> */}
                {/* <CreateHospitalized
                  isOpen={createState}
                  onClose={() => setCreateState(false)}
                  onReload={handleEvent}
                /> */}
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
                handleUpdate(record);
              }
            },
          })}
          columns={petLoveColumn}
          dataSource={petCares.map((petCare: any) => ({
            ...petCare,
            onUpdate: () => handleUpdate(petCare),
            onRemove: () => handleDelete(petCare.id),
            onRepay: () => handleRepay(petCare.id),
            onView: () => handleView(petCare.id),
            // onCancel: () => handleOpenModalCancel(appointment.id),
          }))}
          // pagination={{
          //   ...pagination,
          //   onChange: (page, pageSize) => handlePagination(page),
          //   onShowSizeChange: (_, size) => handlePagination(),
          //   showSizeChanger: true,
          //   pageSizeOptions: ["5"],
          //   // showTotal: (total, range) =>
          //   //   {
          //   //     from: range[0],
          //   //     to: range[1],
          //   //     total: total,
          //   //   }),
          // }}
        />
        <UpdatePetCare
          isOpen={updateState}
          onClose={() => setUpdateState(false)}
          onReload={handleEvent}
          petCare={petCareUpdate}
        />

        <ModalPayment
          isOpen={openModalPayment}
          onClose={() => setOpenModalPayment(false)}
          handleCancelPayment={handleCancelPayment}
          handleConfirmPayment={handleConfirmPayment}
        ></ModalPayment>

        <ViewServicePetCare
          isOpen={viewState}
          onClose={() => setViewState(false)}
          onReload={handleEvent}
          id={viewId}
        ></ViewServicePetCare>
      </div>
    </>
  );
};

export default HospitalizedPage;
