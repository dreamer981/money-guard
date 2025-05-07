import { useState } from "react";
import ModalEditTransaction from "../ModalEditTransaction/ModalEditTransaction";
import { useDispatch, useSelector } from "react-redux";
import { deleteTransaction } from "../../redux/transactions/operations";

const TransactionsItem = ({ transaction }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.transactions.isLoading);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleDelete = () => {
    dispatch(deleteTransaction(transaction.id));
  };

  return (
    <>
      <tr>
        <td>{transaction.date}</td>
        <td>{transaction.type}</td>
        <td>{transaction.category}</td>
        <td>{transaction.comment}</td>
        <td>{transaction.amount}</td>
        <td>
          <button onClick={openModal}>Edit</button>
          <button onClick={handleDelete} disabled={isLoading}>
            {isLoading ? "Deleting..." : "Delete"}
          </button>
        </td>
      </tr>

      {isModalOpen && (
        <tr>
          <td colSpan="6">
            <ModalEditTransaction
              transaction={transaction}
              closeModal={closeModal}
            />
          </td>
        </tr>
      )}
    </>
  );
};

export default TransactionsItem;
