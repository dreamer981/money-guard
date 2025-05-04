import React, { useState } from "react";
//import { useDispatch } from 'react-redux';
import ModalAddTransaction from "../ModalAddTransaction/ModalAddTransaction";
//import { addTransaction } from "../../redux/transactions"; //redux ta transactions dosyası oluşturulmalı
import css from './ButtonAddTransactions.module.css';

const ButtonAddTransactions = () => {
    //const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <button
                onClick={handleOpenModal}
                className={css.addTransactionButton}
            >
                <span className={css.plusButton}>+</span>
            </button>

            <ModalAddTransaction
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />
        </div>
    )
};

export default ButtonAddTransactions;
