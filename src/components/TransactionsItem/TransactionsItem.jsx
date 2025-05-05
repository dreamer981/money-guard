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
    dispatch(deleteTransaction(transaction.id)); // ID'yi göndererek işlemi sil
  };

  return (
    <div>
    <tr>
      <td>{transaction.date}</td>
      <td>{transaction.type}</td>
      <td>{transaction.category}</td>
      <td>{transaction.comment}</td>
      <td>{transaction.amount}</td>
      <td>
        <button onClick={openModal}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </td>
    </tr>

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
