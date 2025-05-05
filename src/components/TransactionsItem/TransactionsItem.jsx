import { useState } from "react";
import ModalEditTransaction from "./ModalEditTransaction"; 
import { useDispatch } from "react-redux";
import { deleteTransaction } from "../redux/transactions/operations";

const TransactionsItem = ({ transaction }) => {
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const dispatch = useDispatch();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleDelete = () => {
    dispatch(deleteTransaction(transaction._id)); // ID'yi göndererek işlemi sil
  };

  return (
    <div className="transaction-item">
      <p>Date: {transaction.date}</p>
      <p>Type: {transaction.type}</p>
      <p>Category: {transaction.category}</p>
      <p>Comment: {transaction.comment}</p>
      <p>Sum: {transaction.amount}</p>

      <button onClick={openModal}>Edit</button> {/* Modal açma butonu */}
      <button onClick={handleDelete}>Delete</button> {/* Silme butonu */}

      {/* ModalEditTransaction modal bileşeni */}
      {isModalOpen && (
        <ModalEditTransaction
          transaction={transaction}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

export default TransactionsItem;
