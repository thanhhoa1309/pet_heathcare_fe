"use client";

import { UserOutlined } from "@ant-design/icons";
import { Avatar, ConfigProvider, Dropdown, MenuProps } from "antd";
import { getSession, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BsHospital } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { MdOutlinePets } from "react-icons/md";
import { PiHospital, PiHospitalLight } from "react-icons/pi";
import { VscSignOut } from "react-icons/vsc";

export default function Header() {
  const router = useRouter();
  const path = usePathname();
  const { data: session } = useSession();

  const [role, setRole] = useState<any>();

  useEffect(() => {
    const fetchSession = async () => {
      const sessionUse = await getSession();
      setRole(sessionUse?.user);
      // console.log(sessionUse?.user);
    };

    fetchSession();
    console.log(path);
  }, []);

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <div
          style={{ padding: "10px 20px" }}
          onClick={() => router.push("/user/profile")}
        >
          Profile
        </div>
      ),
      icon: <CgProfile style={{ fontSize: "24px" }} />,
    },
    {
      key: "2",
      label: (
        <div
          style={{ padding: "10px 20px" }}
          onClick={() => router.push("/user/pets")}
        >
          Pets
        </div>
      ),
      icon: <MdOutlinePets style={{ fontSize: "24px" }} />,
    },
    {
      key: "3",
      label: (
        <div
          style={{ padding: "10px 20px" }}
          onClick={() => router.push("/user/appointment")}
        >
          Appointment
        </div>
      ),
      icon: <BsHospital style={{ fontSize: "24px" }} />,
    },
    {
      key: "4",
      label: (
        <div
          style={{ padding: "10px 20px" }}
          onClick={() => router.push("/user/hospitalized")}
        >
          Hospitalized
        </div>
      ),
      icon: <PiHospital style={{ fontSize: "24px" }} />,
    },
    {
      key: "5",
      label: (
        <div style={{ padding: "10px 20px" }} onClick={() => signOut()}>
          <span>Sign out</span>
        </div>
      ),
      icon: <VscSignOut style={{ fontSize: "24px" }} />,
    },
  ];

  return (
    <>
      <div className="container-fluid">
        <div className="row py-3 px-lg-5">
          <div className="col-lg-4">
            <a href="" className="navbar-brand d-none d-lg-block">
              <h1 className="m-0 display-5 text-capitalize">
                <span className="text-primary">Pet</span>Lover
              </h1>
            </a>
          </div>
          <div className="col-lg-8 text-center text-lg-right">
            {/* <div className="d-inline-flex align-items-center">
              <div className="d-inline-flex flex-column text-center pr-3 border-right">
                <h6>Opening Hours</h6>
                <p className="m-0">8.00AM - 9.00PM</p>
              </div>
              <div className="d-inline-flex flex-column text-center px-3 border-right">
                <h6>Email Us</h6>
                <p className="m-0">info@example.com</p>
              </div>
              <div className="d-inline-flex flex-column text-center pl-3">
                <h6>Call Us</h6>
                <p className="m-0">+012 345 6789</p>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      <div className="container-fluid p-0">
        <nav className="navbar navbar-expand-lg bg-dark navbar-dark py-3 py-lg-0 px-lg-5">
          <a href="" className="navbar-brand d-block d-lg-none">
            <h1 className="m-0 display-5 text-capitalize font-italic text-white">
              <span className="text-primary">Safety</span>First
            </h1>
          </a>
          <button
            type="button"
            className="navbar-toggler"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-between px-3"
            id="navbarCollapse"
          >
            <div className="navbar-nav mr-auto py-0">
              <Link
                href="/"
                className={`nav-item nav-link ${path === "/" ? "active" : ""}`}
              >
                Home
              </Link>
              <Link
                href="about"
                className={`nav-item nav-link ${
                  path === "/about" ? "active" : ""
                }`}
              >
                About
              </Link>
              <Link
                href="service"
                className={`nav-item nav-link ${
                  path === "/service" ? "active" : ""
                }`}
              >
                Service
              </Link>
              <Link
                href="booking"
                className={`nav-item nav-link ${
                  path === "/booking" ? "active" : ""
                }`}
              >
                Booking
              </Link>
              <Link
                href="contact"
                className={`nav-item nav-link ${
                  path === "/contact" ? "active" : ""
                }`}
              >
                Contact
              </Link>
            </div>
            {role?.role && role?.role === "USER" ? (
              <>
                <ConfigProvider
                  theme={{
                    components: {
                      Avatar: {
                        containerSize: 50,
                      },
                    },
                  }}
                >
                  <Dropdown menu={{ items }} placement="bottomRight" arrow>
                    <Avatar
                      style={{ backgroundColor: "#87d068" }}
                      icon={<UserOutlined />}
                    />
                  </Dropdown>
                </ConfigProvider>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="btn btn-lg btn-primary px-3 d-none d-lg-block mr-3"
                >
                  Sign in
                </Link>{" "}
                <Link
                  href="/auth/register"
                  className="btn btn-lg btn-primary px-3 d-none d-lg-block"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </>
  );
}
