"use client";
import UseAxiosAuth from "@/utils/axiosClient";
import { Card, Col, Flex, Row } from "antd";
import { useEffect } from "react";
import { PiChalkboardTeacherFill, PiStudentFill } from "react-icons/pi";
import styles from "./_components/dashboard.module.scss";
import { SiCoursera } from "react-icons/si";
import { MdClass, MdOutlinePets } from "react-icons/md";
import { ImUserTie } from "react-icons/im";
import { FaUser, FaUserTie } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";

export default function AdminDashboard() {
  return (
    <>
      <Row gutter={16}>
        <Col className="gutter-row" span={6}>
          <Card>
            <Flex justify="space-between" align="center">
              <div>
                <span className={styles.text_h4}>Customers</span>
                <br />
                <span className={styles.text_h3}>123.3</span>
              </div>
              <div className={`${styles.containerIcon} ${styles.bg_Student}`}>
                <FaUser className={styles.icon} />
              </div>
            </Flex>
          </Card>
        </Col>

        <Col className="gutter-row" span={6}>
          <Card>
            <Flex justify="space-around" align="center">
              <div>
                <span className={styles.text_h4}>Pets</span>
                <br />
                <span className={styles.text_h3}>123</span>
              </div>
              <div className={`${styles.containerIcon} ${styles.bg_Teacher}`}>
                <MdOutlinePets className={styles.icon} />
              </div>
            </Flex>
          </Card>
        </Col>

        <Col className="gutter-row" span={6}>
          <Card>
            <Flex justify="space-around" align="center">
              <div>
                <span className={styles.text_h4}>Doctors</span>
                <br />
                <span className={styles.text_h3}>123</span>
              </div>
              <div className={`${styles.containerIcon} ${styles.bg_Course}`}>
                <FaUserDoctor className={styles.icon} />
              </div>
            </Flex>
          </Card>
        </Col>

        <Col className="gutter-row" span={6}>
          <Card>
            <Flex justify="space-around" align="center">
              <div>
                <span className={styles.text_h4}>Staff</span>
                <br />
                <span className={styles.text_h3}>123</span>
              </div>
              <div className={`${styles.containerIcon} ${styles.bg_Class}`}>
                <FaUserTie className={styles.icon} />
              </div>
            </Flex>
          </Card>
        </Col>
      </Row>
    </>
  );
}
