import React, { useState } from "react";
import PropTypes from "prop-types";
import { Card, Container, Modal } from "react-bootstrap";
import "./style.scss";
import "../styles.scss";

function ModalComponent({ children, btnClassDisabled }) {
  const [showModal, setShowModal] = useState(true);

  return (
    <Container
      className={`add-entity-modal ${btnClassDisabled}`}
      contentLabel="Histórico de Propostas"
    >
      <div className="modal-wrapper">{children}</div>
    </Container>
  );
}

ModalComponent.propTypes = {
  btnClassDisabled: PropTypes.string,
  children: PropTypes.node.isRequired
};

export default ModalComponent;
