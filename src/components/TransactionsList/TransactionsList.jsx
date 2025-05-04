import css from './TransactionsList.module.css';
import { useSelector } from 'react-redux';
import { TransactionsItem } from '../TransactionsItem/TransactionsItem';

const TransactionsList = () => {
  const transactions = useSelector((state) => state.transactions.items);
  const isLoading = useSelector((state) => state.transactions.isLoading);
  const error = useSelector((state) => state.transactions.error);

  return (
    <div className={css.transactionsList}>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {transactions.map((transaction) => (
        <TransactionsItem key={transaction.id} transaction={transaction} />
      ))}
    </div>
  );
}
export default TransactionsList;