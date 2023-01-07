import { FC } from "react";
import Button from "react-bootstrap/Button";
import Modal, { ModalProps } from "react-bootstrap/Modal";

const centeredModal: FC<ModalProps> = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>{props.heading}</h4>
        <p>{props.body}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide} variant="secondary">
          Cancel
        </Button>
        <Button onClick={props.confirm} variant="primary">Confirm</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default centeredModal;
