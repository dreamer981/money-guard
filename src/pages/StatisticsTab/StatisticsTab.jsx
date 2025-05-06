import StatisticsDashboard from "../../components/StatisticsDashboard/StatisticsDashboard";
import StatisticsTable from "../../components/StatisticsTable/StatisticsTable";
import Chart from "../../components/Chart/Chart";

export default function StatisticTab() {
  return (
      <>
      <div>
        <h1>Statistic Tab</h1>
      </div>
      <section>
            <h2>Statistics Dashboard</h2>
            <StatisticsDashboard  />
      </section>
      <section>
            <h2>Statistics Table</h2>
            <StatisticsTable />
      </section>
      <section>
            <h2>Chart</h2>
            <Chart />
      </section>
      </>
    );
}