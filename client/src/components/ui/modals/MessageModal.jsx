import { Fragment } from "react";
import { Modal, Button } from "react-bootstrap";

function MessageModal(props) {
  const { open, title, onClose, children } = props;
  const handleClose = () => onClose && onClose();
  return (
    <Fragment>
      <Modal show={open} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title || "Message"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
}

export default MessageModal;
