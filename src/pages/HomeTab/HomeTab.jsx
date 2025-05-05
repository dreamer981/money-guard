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
  