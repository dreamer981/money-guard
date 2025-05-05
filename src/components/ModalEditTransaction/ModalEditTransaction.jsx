import React from "react";
import Modal from "react-modal";
import EditTransactionForm from "../EditTransactionForm/EditTransactionForm";
import css from "./ModalEditTransaction.module.css";

const ModalEditTransaction = ({ onClose, isOpen }) => {
  if (!isOpen) return null;

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        className={css.modalEditTransaction}
        overlayClassName={css.overlay}
        shouldCloseOnOverlayClick={true}
      >
        <button onClick={onClose} className={css.modalCloseButton}>
          ✖
        </button>
        <h2 className={css.modalTitle}>Edit Transaction</h2>

        <EditTransactionForm onClose={onClose} transaction={transaction} />
      </Modal>
    </div>
  );
};

export default ModalEditTransaction;
