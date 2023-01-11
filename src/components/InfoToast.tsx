import { Dispatch, FC, SetStateAction } from "react";
import { ToastContainer } from "react-bootstrap";
import Toast from "react-bootstrap/Toast";

interface Props {
  show: boolean;
  setShow: Dispatch<
    SetStateAction<{
      message: string;
      title: string;
    } | null>
  >;
  message: string;
  title: string;
}

const ErrorToast: FC<Props> = ({ show, setShow, message, title }) => {
  return (
    <ToastContainer position="top-center">
      <Toast onClose={() => setShow(null)} show={show} delay={3000} autohide>
        <Toast.Header>
          <strong className="me-auto">{title}</strong>
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default ErrorToast;
