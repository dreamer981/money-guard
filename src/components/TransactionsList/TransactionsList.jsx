import { useSelector } from "react-redux";
import {
  selectTransactions,
  selectIsLoading,
  selectError,
} from "../../redux/transactions/selectors";
import TransactionsItem from "../TransactionsItem/TransactionsItem";

const TransactionsList = () => {
  const transactions = useSelector(selectTransactions) || [];
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {transactions.length === 0 ? (
        <p>No transactions yet</p>
      ) : (
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
      )}
    </div>
  );
};

export default TransactionsList;
