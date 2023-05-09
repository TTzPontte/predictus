import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import './style.scss';

const ModalComponent = ({ setShowModal, showModal, children, btnClassDisabled }) => (
  <div className="add-entity-container add-form">
    <Modal
      ariaHideApp={false}
      isOpen={showModal}
      shouldCloseOnOverlayClick
      onRequestClose={setShowModal}
      className={`add-entity-modal ${btnClassDisabled}`}
      contentLabel="Histórico de Propostas"
    >
      <div className="react-modal-header">
        <h3 className="add-participants">Adicionar participantes</h3>
        <button className="close-button" type="button" onClick={() => setShowModal(!showModal)}>
          X
        </button>
      </div>
      <div className="modal-wrapper">{children}</div>
    </Modal>
  </div>
);
ModalComponent.propTypes = {
  showModal: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  btnClassDisabled: PropTypes.string,
  setShowModal: PropTypes.func,
  children: PropTypes.any,
};
export default ModalComponent;
