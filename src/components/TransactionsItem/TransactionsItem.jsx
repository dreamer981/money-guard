import css from "./TransactionsItem.module.css";
import { useDispatch } from "react-redux";
import {
  updateTransaction,
  deleteTransaction,
} from "../../redux/transactions/operations";

const TransactionsItem = ({ transaction }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteTransaction(transaction.id));
  };

  const handleUpdate = () => {
    const updatedTransaction = { ...transaction, status: "completed" };
    dispatch(
      updateTransaction({
        transactionId: transaction.id,
        transaction: updatedTransaction,
      })
    );
  };
  return (
    <div className={css.transactionItem}>
      <p>{transaction.description}</p>
      <p>{transaction.amount}</p>
      <p>{transaction.date}</p>
      <button onClick={handleUpdate}>Update</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};
export default TransactionsItem;
