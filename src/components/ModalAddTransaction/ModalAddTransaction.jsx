import React from 'react';
import Modal from 'react-modal';
import AddTransactionForm from '../AddTransactionForm/AddTransactionForm';
import css from './ModalAddTransaction.module.css';

const ModalAddTransaction = ({ onClose, isOpen }) => {

    return (
        <div>
            <Modal
                isOpen={isOpen}
                onRequestClose={onClose}
                className={css.modalAddTransaction}
                overlayClassName={css.overlay}
                shouldCloseOnOverlayClick={true}
            >
                <button onClick={onClose} className={css.modalCloseButton}>✖</button>
                <h2 className={css.modalTitle}>Add Transaction</h2>

                <AddTransactionForm onClose={onClose} />
            </Modal>
        </div>
    )
};

export default ModalAddTransaction;
