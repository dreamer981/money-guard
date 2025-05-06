import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import TransactionsList from "../../components/TransactionsList/TransactionsList";
import ModalAddTransaction from "../../components/ModalAddTransaction/ModalAddTransaction";
import {
  addTransaction,
  fetchTransactions,
} from "../../redux/transactions/operations";

export default function HomeTab() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleAddTransaction = async (transactionData) => {
    try {
      await dispatch(addTransaction(transactionData)).unwrap();
      closeModal();
    } catch (err) {
      console.error("Transaction eklenemedi:", err);
    }
  };

  return (
    <div>
      <h1>Home Tab</h1>
      <TransactionsList />
      <button onClick={openModal}>Add Transaction</button>
      <ModalAddTransaction
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleAddTransaction}
      />
    </div>
  );
}

import TransActionsList from "../../components/TransactionsList/TransactionsList";
import TransactionsItem from "../../components/TransactionsItem/TransactionsItem";
import ButtonAddTransactions  from "../../components/ButtonAddTransactions/ButtonAddTransactions";

export default function HomeTab() {
  return (
      <>
      <div>
        <h1>Home Tab</h1>
      </div>
      <section>
            <h2>Transactions List</h2>
            <TransActionsList />
      </section>
      <section>
            <h2>Transactions Item</h2>
            <TransactionsItem />
      </section>
      <section>
            <h2>Button Add Transactions</h2>
            <ButtonAddTransactions />
      </section>
      </>
    );
}
  

