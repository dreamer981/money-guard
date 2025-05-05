import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectTransactions,
  selectIsLoading,
  selectError,
} from "../../redux/transactions/selectors";
import { fetchTransactions } from "../../redux/transactions/operations";
import TransactionsItem from "../TransactionsItem/TransactionsItem";
// import css from "./TransactionsList.module.css";

const TransactionsList = () => {
  const dispatch = useDispatch();
  const transactions = useSelector(selectTransactions);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {transactions.length === 0 ? (
        <p>No transactions yet</p>
      ) : (
        <div>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Category</th>
                <th>Comment</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <TransactionsItem
                  key={transaction.id}
                  transaction={transaction}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TransactionsList;