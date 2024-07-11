"use client";

import { Button, Modal, Result } from "antd";
import { MdOutlinePayment } from "react-icons/md";
import styles from "@/app/auth/_components/VerifyModal.module.scss";

interface IModalCancel {
  isOpen: boolean;
  onClose: () => void;
  handleCancelAppointment: () => void;
  handleConfirmAppointment: () => void;
}
const ModalCancel = (props: IModalCancel) => {
  const { isOpen, onClose, handleCancelAppointment, handleConfirmAppointment } =
    props;
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
                <h2>Cancel Appointment</h2>
                <br />
                <span style={{ fontSize: 18 }}>
                  Your payment amount will be transferred to PetLovers account
                </span>
              </>
            }
            extra={
              <>
                <Button onClick={() => handleCancelAppointment()}>
                  Cancel
                </Button>
                <Button
                  type="primary"
                  onClick={() => handleConfirmAppointment()}
                >
                  Confirm
                </Button>
              </>
            }
          />
        </>
      </Modal>
    </>
  );
};

export default ModalCancel;
