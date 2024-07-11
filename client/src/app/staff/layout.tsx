"use client";
import MenuHeader from "@/components/Layouts/staff/MenuHeader";
import MenuSider from "@/components/MenuSider/MenuSider";
import {
  AlignLeftOutlined,
  BellOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Badge, Button, ConfigProvider, Layout, MenuProps, Space } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Header } from "antd/es/layout/layout";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  MdDashboard,
  MdMedicalServices,
  MdSwitchAccount,
} from "react-icons/md";
import { GrUserAdmin } from "react-icons/gr";
import { FaChalkboardTeacher, FaUser } from "react-icons/fa";
import { PiExamBold, PiStudent } from "react-icons/pi";
import { SiCoursera, SiGoogleclassroom } from "react-icons/si";
import "@/styles/admin.scss";
import Link from "next/link";
import { GiBirdCage } from "react-icons/gi";
import { FaUserDoctor } from "react-icons/fa6";

const domain = "/staff";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    key: `${domain}/appointment`,
    label: <Link href={`${domain}/appointment`}>Appointment</Link>,
    icon: <MdDashboard />,
  },
  {
    key: `${domain}/hospitalized`,
    label: <Link href={`${domain}/hospitalized`}>Hospitalized</Link>,
    icon: <FaUser />,
  },
];

export default function StaffLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout className="layout">
      <Header>
        <Space size={"middle"}>
          <Button
            type="text"
            size="middle"
            className="sidebar-toggle"
            onClick={() => setCollapsed(!collapsed)}
          >
            <AlignLeftOutlined />
          </Button>
          <Link href={"/"} className="logo">
            <span className={`textLogo`}>PetShop</span>
          </Link>
        </Space>
        <Space size={"middle"} align="center" className={"right_menu"}>
          <Badge count={1} dot offset={[-10, 10]} className="iconButton">
            <BellOutlined />
          </Badge>
          <Link href="/settings" style={{ color: "#000000" }}>
            <SettingOutlined className="iconButton" />
          </Link>
          <MenuHeader path={"pathName"} />
        </Space>
      </Header>
      <Layout className="site_layout m_h" hasSider>
        <Sider
          width={230}
          theme="light"
          className="sidebar"
          collapsible
          trigger={null}
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <MenuSider path={pathname} items={items} />
        </Sider>
        <ConfigProvider
          theme={{
            components: {
              Button: {
                colorPrimary: "#ed6436",
                // defaultHoverBg: "#ed6436",
                primaryShadow: "#ed6436",
                defaultHoverBg: "#ed6436",
                defaultActiveColor: "#ed6436",
                // defaultHoverBorderColor: "#ed6436",
              },
            },
          }}
        >
          <Content className="site_layout_background">{children}</Content>
        </ConfigProvider>
      </Layout>
    </Layout>
  );
}
