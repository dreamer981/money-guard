import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";
import Navigation from "../../components/Navigation/Navigation";

export default function DashboardPage() {
  return (
    <div>
      <h1>Dashboard Page</h1>
      <Header />
      <Navigation />
      <Outlet />
    </div>
  );
}
import Header from "../../components/Header/Header";
import TransActionsList from "../../components/TransactionsList/TransactionsList";
import StatisticsDashboard from "../../components/StatisticsDashboard/StatisticsDashboard";
import StatisticsTable from "../../components/StatisticsTable/StatisticsTable";
import Chart from "../../components/Chart/Chart";
import Currency from "../../components/Currency/Currency";

export default function DashboardPage() {
  return (
      <>
      <div>
        <h1>Dashboard Page</h1>
      </div>
      <section>
            <h2>Header</h2>
            <Header />
      </section>
      <section>
            <h2>TransActions List</h2>
            <TransActionsList />
      </section>
      <section>
            <h2>Statistics Dashboard</h2>
            <StatisticsDashboard />
      </section>
      <section>
            <h2>Statistics Table</h2>
            <StatisticsTable />
      </section>
      <section>
            <h2>Chart</h2>
            <Chart />
      </section>
      <section>
            <h2>Currency</h2>
            <Currency />
      </section>
      </>
    );
  }
  
