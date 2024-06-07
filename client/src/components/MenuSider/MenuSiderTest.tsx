"use client";

import { Menu } from "antd";
import type { MenuProps } from "antd";
import MenuItem from "antd/es/menu/MenuItem";
import Link from "next/link";
import { FaChalkboardTeacher } from "react-icons/fa";
import { GrUserAdmin } from "react-icons/gr";
import { MdDashboard, MdSwitchAccount } from "react-icons/md";
import { PiStudent } from "react-icons/pi";

type MenuItem = Required<MenuProps>["items"][number];

const domain = "/admin";

const items: MenuItem[] = [
  {
    key: "Account",
    label: <Link href={`${domain}/dashboard`}>Dashboard</Link>,
    icon: <MdDashboard />,
  },
  //   getItem(
  //     "Account",
  //     `${domain}/account`,
  //     <MdSwitchAccount />,
  //     [
  //       getItem("Account", `${domain}/account/admins`, <GrUserAdmin />),
  //       getItem("Account", `${domain}/account/teachers`, <FaChalkboardTeacher />),
  //       getItem("Account", `${domain}/account/students`, <PiStudent />),
  //     ],
  //     "group"
  //   ),
];

const MenuSiderTest = () => {
  return (
    <>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={items}
      />
    </>
  );
};

export default MenuSiderTest;
