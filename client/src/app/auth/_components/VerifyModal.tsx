"use client";

import { Button, Flex, Modal, Result, Spin, notification } from "antd";
import { useForm } from "antd/es/form/Form";
import { useState } from "react";
import OtpInput from "react-otp-input";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import styles from "@/app/auth/_components/VerifyModal.module.scss";
import { http } from "@/utils/config";
import { SmileOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { IoIosMailOpen } from "react-icons/io";

interface verifyProps {
  isOpen: boolean;
  onClose: () => void;
}

const VerifyModal = ({ isOpen, onClose }: verifyProps) => {
  const [api, contextHolder] = notification.useNotification();

  const router = useRouter();

  // const [otp, setOtp] = useState("");
  // const [isTimeReSend, setIsTimeReSend] = useState<boolean>(true);
  // const [error, setError] = useState<string>("");

  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const openNotification = (title: string, message: string) => {
    api.info({
      message: title,
      description: message,
      placement: `top`,
      duration: 1.5,
    });
  };

  return (
    <>
      {contextHolder}
      <Modal
        title=""
        open={isOpen}
        width={500}
        // onCancel={onClose}
        footer={() => <></>}
        cancelText="No"
        mask={true}
        closable={false}
      >
        <>
          <Result
            icon={
              <span className={styles.containerOTP}>
                <IoIosMailOpen />
              </span>
            }
            title={
              <>
                <span style={{ fontSize: 26 }}>Verify your account</span>
                <br />
                <span style={{ fontSize: 14 }}>
                  Thanks for joining pet_health! We just sent a verifications
                  link to your email. Click on it and get started to explore!
                </span>
              </>
            }
            extra={
              <Button type="primary" onClick={() => router.push("login")}>
                GOT IT
              </Button>
            }
          />
        </>
      </Modal>
    </>
  );
};

export default VerifyModal;
