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