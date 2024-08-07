"use client";
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

  const [pets, setPets] = useState<PetModel[]>([]);

  const openNotification = (type: "success" | "error", status: string) => {
    api[type]({
      message: `Pet ${status}`,
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
    setUserUpdate(id);
    setUpdateState(true);
  };

  const handleDelete = async (id: string) => {
    setIsLoading(true);
    try {
      const res = await instance.patch(`/api/v1/pet/delete/${id}`);
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

  const fetchDataList = async () => {
    setIsLoading(true);
    try {
      const res = await instance.get("/api/v1/pet/all");

      let tempRes = res.data.data;

      setPets(tempRes);
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
      <div className="container py-5">
        {contextHolder}
        <Row justify={"space-between"} style={{ marginBottom: 16 }}>
          <Col>
            <strong
            // className={cx('title')}
            >
              PETS
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
                  Totals {!isLoading ? pets.length : <LoadingOutlined />}{" "}
                  records
                </span>
                <Divider type="vertical" />
                {/* <Filter handleDataFilter={handleDataFilter} /> */}
                <Button
                  type="primary"
                  onClick={() => setCreateState(true)}
                  // menu={{ items }}
                >
                  Create New Pet
                </Button>
                <CreatePet
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
                // handleUpdate(record.id);
              }
            },
          })}
          columns={petColumn}
          dataSource={pets.map((pet: any) => ({
            ...pet,
            onUpdate: () => handleUpdate(pet.id),
            onRemove: () => handleDelete(pet.id),
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
        <UpdatePet
          isOpen={updateState}
          onClose={() => setUpdateState(false)}
          onReload={handleEvent}
          id={userUpdate}
        />
      </div>
    </>
  );
}
