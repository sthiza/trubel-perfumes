"use client";
import { useState, useEffect } from 'react';
import styles from './dashboard.module.css';
import { getNetworkData } from './networkUtils';

export default function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [networkStats, setNetworkStats] = useState({ totalRecruits: 0, totalSales: 0 });
  const [networkDetails, setNetworkDetails] = useState([]);

  const updateNetwork = () => {
    const { networkData, totalRecruits, totalSales } = getNetworkData();
    setNetworkStats({ totalRecruits, totalSales });
    setNetworkDetails(networkData);
  };

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    setOrders(storedOrders);
    updateNetwork();
    window.addEventListener('networkChange', updateNetwork);
    return () => window.removeEventListener('networkChange', updateNetwork);
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
      <div className={styles.details}>
        <h2 className={styles.detailsTitle}>Network Breakdown</h2>
        <div className={styles.detailsList}>
          {networkDetails.map((gen, index) => (
            <div key={index} className={styles.detailItem}>
              <p><strong>{gen.gen}</strong></p>
              <p>Recruits: {gen.recruits.length}</p>
              <p>Sales: R{gen.recruits.reduce((sum, r) => sum + parseFloat(r.sales.slice(1)), 0)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}