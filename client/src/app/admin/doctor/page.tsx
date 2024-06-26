"use client";
import { cageColumn } from "@/app/admin/cage/_components/columnTypes";
import { CageModel } from "@/app/admin/cage/_components/type";
import CreateCage from "@/app/admin/cage/createCage";
import UpdateCage from "@/app/admin/cage/updateCage";
import { doctorColumn } from "@/app/admin/doctor/_components/columnTypes";
import { DoctorModel } from "@/app/admin/doctor/_components/type";
import UpdateDoctor from "@/app/admin/doctor/updateDoctor";
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

export default function Doctor() {
  const instance = UseAxiosAuth();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [api, contextHolder] = notification.useNotification();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const [userUpdate, setUserUpdate] = useState<string>("");
  const [imageUpdate, setImageUpdate] = useState<string>("");

  const [createState, setCreateState] = useState<boolean>(false);
  const [updateState, setUpdateState] = useState<boolean>(false);
  // const [deleteState, setDeleteState] = useState<boolean>(false);

  const [doctors, setDoctors] = useState<DoctorModel[]>([]);

  const openNotification = (type: "success" | "error", status: string) => {
    api[type]({
      message: `Account ${status}`,
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

  const handleUpdate = (_doctor: DoctorModel) => {
    setImageUpdate(_doctor.imageUrl);
    setUserUpdate(_doctor.id);
    setUpdateState(true);
  };

  const fetchDataList = async () => {
    setIsLoading(true);
    try {
      const res = await instance.get("/api/v1/doctor");

      let tempRes = res.data.data;

      setDoctors(tempRes);
    } catch (error: any) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchDataList();
  }, []);

  const handleEvent = () => {
    fetchDataList();
  };

  return (
    <>
      <div>
        {contextHolder}
        <Row justify={"space-between"} style={{ marginBottom: 16 }}>
          <Col>
            <strong
            // className={cx('title')}
            >
              DOCTORS
            </strong>{" "}
            <br />
            <Breadcrumb
              items={[
                {
                  href: "/admin/dashboard",
                  title: "Home",
                },
                {
                  title: "Doctors",
                },
              ]}
            />
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
                  Totals {!isLoading ? doctors.length : <LoadingOutlined />}{" "}
                  records
                </span>
                <Divider type="vertical" />
                {/* <Filter handleDataFilter={handleDataFilter} /> */}
                <Button
                  type="primary"
                  onClick={() => setCreateState(true)}
                  // menu={{ items }}
                  disabled
                >
                  Create New Doctor
                </Button>
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
          // onRow={(record) => ({
          //   onClick: (event) => {
          //     const target = event.target as HTMLElement;
          //     const isWithinLink =
          //       target.tagName === "A" || target.closest("a");
          //     const isWithinAction =
          //       target.closest("td")?.classList.contains("ant-table-cell") &&
          //       !target
          //         .closest("td")
          //         ?.classList.contains("ant-table-selection-column") &&
          //       !target
          //         .closest("td")
          //         ?.classList.contains("ant-table-cell-fix-right");

          //     if (isWithinAction && !isWithinLink) {
          //       handleUpdate(record.id);
          //     }
          //   },
          // })}
          columns={doctorColumn}
          dataSource={doctors.map((doctor: any) => ({
            ...doctor,
            onUpdate: () => handleUpdate(doctor),
          }))}
        />
        <UpdateDoctor
          isOpen={updateState}
          onClose={() => setUpdateState(false)}
          onReload={handleEvent}
          id={userUpdate}
          image={imageUpdate}
        />
      </div>
    </>
  );
}
