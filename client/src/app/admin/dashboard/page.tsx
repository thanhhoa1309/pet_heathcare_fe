"use client";
import UseAxiosAuth from "@/utils/axiosClient";
import { Card, Col, Flex, Row, Statistic } from "antd";
import { useEffect, useState } from "react";
import { PiChalkboardTeacherFill, PiStudentFill } from "react-icons/pi";
import styles from "./_components/dashboard.module.scss";
import { SiCoursera } from "react-icons/si";
import { MdClass, MdOutlinePets } from "react-icons/md";
import { ImUserTie } from "react-icons/im";
import { FaUser, FaUserTie } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import BarChart from "@/app/admin/dashboard/_components/BarChart";

interface statistic {
  totalCustomer: number;
  totalStaff: number;
  totalPet: number;
  totalDoctor: number;
}

export default function AdminDashboard() {
  const instance = UseAxiosAuth();

  const [statisticValue, setStatisticValue] = useState<statistic>();

  const fetchData = async () => {
    try {
      const res = await instance.get(`/api/v1/user/statistic`);
      if (res.data.status === 200 || res.data.status === 201) {
        let tempRes = res.data.data;
        setStatisticValue(tempRes);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Row gutter={16}>
        <Col className="gutter-row" span={6}>
          <Card>
            <Flex justify="space-around" align="center">
              <div>
                <span className={styles.text_h4}>Customers</span>
                <br />
                <span className={styles.text_h3}>
                  {statisticValue?.totalCustomer}
                </span>
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
                <span className={styles.text_h3}>
                  {statisticValue?.totalPet}
                </span>
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
                <span className={styles.text_h3}>
                  {statisticValue?.totalDoctor}
                </span>
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
                <span className={styles.text_h3}>
                  {statisticValue?.totalStaff}
                </span>
              </div>
              <div className={`${styles.containerIcon} ${styles.bg_Class}`}>
                <FaUserTie className={styles.icon} />
              </div>
            </Flex>
          </Card>
        </Col>
      </Row>

      {/* <Row className="mt-3">
        <Col span={24}>
          <Card>
            <BarChart></BarChart>
          </Card>
        </Col>
      </Row> */}
    </>
  );
}
