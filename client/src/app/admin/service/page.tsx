"use client";
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
import { ServiceModel } from "@/app/admin/service/_components/type";
import { serviceColumn } from "@/app/admin/service/_components/columnTypes";
import CreateService from "@/app/admin/service/createServices";
import UpdateService from "@/app/admin/service/updateServices";

export default function AdminAccount() {
  const instance = UseAxiosAuth();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [api, contextHolder] = notification.useNotification();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const [userUpdate, setUserUpdate] = useState<string>("");

  const [createState, setCreateState] = useState<boolean>(false);
  const [updateState, setUpdateState] = useState<boolean>(false);
  // const [deleteState, setDeleteState] = useState<boolean>(false);

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const [services, setServices] = useState<ServiceModel[]>([]);

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
    setUserUpdate(id);
    setUpdateState(true);
  };

  const handleDelete = async (id: string) => {
    setIsLoading(true);
    try {
      const res = await instance.patch(`/api/v1/service/delete/${id}`);
      if (res.data.status === 200 || res.data.status === 201) {
        openNotification("success", "delete successfully");
        handleEvent();
      } else {
        openNotification("error", "delete failure");
      }
    } catch (error) {
      openNotification("error", "delete failure");
      console.log(error);
    }
    setIsLoading(false);
  };

  const handleUnDelete = async (id: string) => {
    setIsLoading(true);
    try {
      const res = await instance.patch(`/api/v1/service/undelete/${id}`);
      if (res.data.status === 200 || res.data.status === 201) {
        openNotification("success", "Undelete successfully");
        handleEvent();
      } else {
        openNotification("error", "Undelete failure");
      }
    } catch (error) {
      openNotification("error", "delete failure");
      console.log(error);
    }
    setIsLoading(false);
  };

  const fetchDataList = async () => {
    setIsLoading(true);
    try {
      const res = await instance.get("/api/v1/service/all");

      let tempRes = res.data.data;

      setServices(tempRes);
      // setPagination((_pagination) => ({
      //   ..._pagination,
      //   pageSize: tempRes.size,
      //   total: tempRes.totalElements,
      // }));
    } catch (error: any) {
      console.log(error);
    }
    setIsLoading(false);
  };

  // const handlePagination = async (page: number = pagination.current) => {
  //   setIsLoading(true);
  //   try {
  //     const res = await instance.get("/api/v1/user", {
  //       params: {
  //         page: page - 1,
  //       },
  //     });

  //     let tempRes = res.data.data;

  //     setUserRes(tempRes);
  //     setUsers(tempRes.content);
  //     setPagination({
  //       current: page,
  //       pageSize: tempRes.size,
  //       total: tempRes.totalElements,
  //     });
  //     setIsLoading(false);
  //   } catch (error: any) {
  //     console.log(error);
  //   }
  // };

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
              SERVICES
            </strong>{" "}
            <br />
            <Breadcrumb
              items={[
                {
                  href: "/admin/dashboard",
                  title: "Home",
                },
                {
                  title: "Services",
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
                  Totals {!isLoading ? services.length : <LoadingOutlined />}{" "}
                  records
                </span>
                <Divider type="vertical" />
                {/* <Filter handleDataFilter={handleDataFilter} /> */}
                <Button
                  type="primary"
                  onClick={() => setCreateState(true)}
                  // menu={{ items }}
                >
                  Create New Service
                </Button>
                <CreateService
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
                handleUpdate(record.id);
              }
            },
          })}
          columns={serviceColumn}
          dataSource={services.map((service: any) => ({
            ...service,
            onUpdate: () => handleUpdate(service.id),
            onRemove: () => handleDelete(service.id),
            onUnRemove: () => handleUnDelete(service.id),
          }))}
        />
        <UpdateService
          isOpen={updateState}
          onClose={() => setUpdateState(false)}
          onReload={handleEvent}
          id={userUpdate}
        />
      </div>
    </>
  );
}
