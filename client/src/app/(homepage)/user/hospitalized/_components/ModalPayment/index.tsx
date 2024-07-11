"use client";

import { Button, Modal, Result } from "antd";
import { MdOutlinePayment } from "react-icons/md";
import styles from "@/app/auth/_components/VerifyModal.module.scss";

interface IModalPayment {
  isOpen: boolean;
  onClose: () => void;
  handleCancelPayment: () => void;
  handleConfirmPayment: () => void;
}
const ModalPayment = (props: IModalPayment) => {
  const { isOpen, onClose, handleCancelPayment, handleConfirmPayment } = props;
  return (
    <>
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
                <MdOutlinePayment />
              </span>
            }
            title={
              <>
                <h2>Payment</h2>
                <br />
                <span style={{ fontSize: 14 }}></span>
              </>
            }
            extra={
              <>
                <Button onClick={() => handleCancelPayment()}>Cancel</Button>
                <Button type="primary" onClick={() => handleConfirmPayment()}>
                  GO TO PAYMENT
                </Button>
              </>
            }
          />
        </>
      </Modal>
    </>
  );
};

export default ModalPayment;
