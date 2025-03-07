"use client";
import { useState, useEffect } from 'react';
import styles from './dashboard.module.css';

export default function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [networkStats, setNetworkStats] = useState({ totalRecruits: 0, totalSales: 0 });

  useEffect(() => {
    // Orders from localStorage
    const storedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    setOrders(storedOrders);

    // Mock network stats (replace with real data later)
    const mockNetwork = [
      { gen: 'First Gen', recruits: 2, sales: 2000 },
      { gen: 'Gen 2', recruits: 2, sales: 1000 },
      { gen: 'Gen 3', recruits: 1, sales: 300 },
      { gen: 'Gen 4', recruits: 1, sales: 200 },
      { gen: 'Gen 5', recruits: 1, sales: 100 },
    ];
    const totalRecruits = mockNetwork.reduce((sum, gen) => sum + gen.recruits, 0);
    const totalSales = mockNetwork.reduce((sum, gen) => sum + gen.sales, 0);
    setNetworkStats({ totalRecruits, totalSales });
  }, []);

  const orderTotal = orders.reduce((sum, order) => sum + parseFloat(order.total.slice(1)), 0).toFixed(2);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Dashboard</h1>
      <div className={styles.summary}>
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Total Orders</h2>
          <p className={styles.cardValue}>{orders.length}</p>
          <p className={styles.cardSub}>Value: R{orderTotal}</p>
        </div>
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Network Size</h2>
          <p className={styles.cardValue}>{networkStats.totalRecruits}</p>
          <p className={styles.cardSub}>Recruits</p>
        </div>
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Network Sales</h2>
          <p className={styles.cardValue}>R{networkStats.totalSales}</p>
          <p className={styles.cardSub}>Total Earnings</p>
        </div>
      </div>
    </div>
  );
}