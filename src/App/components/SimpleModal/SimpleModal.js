import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import useContextReducer from "../../Containers/CreateContract/store/context/hook";

const SimpleModal = ({ title = "Launch demo modal", opened = false, children, callback }) => {
  const [show, setShow] = useState(opened);
  const [state, actions] = useContextReducer();
  useEffect(()=>{
    if(state?.step1 && state?.step2 && state?.success) {
      setShow(true);
    }
  })
  const handleClose = () => {
    if(state?.step1 && state?.step2 && state?.success) {
      setShow(false);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default SimpleModal;
