import React from 'react';
import { useSelector } from 'react-redux';
import styles from './StatisticsTable.module.css';

const StatisticsTable = () => {
  const stats = useSelector(state => state.statistics.data);
  if (!stats) return null;

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead className={styles.header}>
          <tr>
            <th className={`${styles.cell} ${styles.category}`}>Kategori</th>
            <th className={`${styles.cell} ${styles.amount}`}>Tutar</th>
          </tr>
        </thead>
        <tbody>
          {stats.categories.map(cat => (
            <tr key={cat.name} className={styles.row}>
              <td className={`${styles.cell} ${styles.category}`}>{cat.name}</td>
              <td className={`${styles.cell} ${styles.amount}`}>{cat.total.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StatisticsTable;