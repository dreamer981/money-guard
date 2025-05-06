import React, { useState } from 'react';
import StatisticsDashboard from './StatisticsDashboard';
import Chart from './Chart';
import StatisticsTable from './StatisticsTable';
import styles from './StatisticsTab.module.css';

const StatisticsTab = () => {
  const now = new Date();
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [year, setYear] = useState(now.getFullYear());

  return (
    <div className={styles.tabContainer}>

import StatisticsDashboard from "../../components/StatisticsDashboard/StatisticsDashboard";
import StatisticsTable from "../../components/StatisticsTable/StatisticsTable";
import Chart from "../../components/Chart/Chart";

export default function StatisticTab() {
  return (
      <>
      <div>
        <StatisticsDashboard month={month} year={year} onChangeMonth={setMonth} onChangeYear={setYear} />
        <Chart month={month} year={year} />
      </div>
      <div>
        <StatisticsTable />
      </div>
    </div>
  );
};

export default StatisticsTab;
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
