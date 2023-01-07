import { Dispatch, FC, SetStateAction } from "react";
import { ToastContainer } from "react-bootstrap";
import Toast from "react-bootstrap/Toast";

interface Props {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  errorMessage: string;
}

const ErrorToast: FC<Props> = ({ show, setShow, errorMessage }) => {
  return (
    <ToastContainer position="top-center">
      <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
        <Toast.Header>
          <strong className="me-auto">Error</strong>
        </Toast.Header>
        <Toast.Body>{errorMessage}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default ErrorToast;
