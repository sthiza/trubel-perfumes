"use client";
import { useState, useEffect } from 'react';
import styles from './dashboard.module.css';
import { getNetworkData } from './networkUtils';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [networkStats, setNetworkStats] = useState({ totalRecruits: 0, totalSales: 0 });
  const [networkDetails, setNetworkDetails] = useState([]);
  const [userName, setUserName] = useState('');

  const updateNetwork = () => {
    const { networkData, totalRecruits, totalSales } = getNetworkData();
    setNetworkStats({ totalRecruits, totalSales });
    setNetworkDetails(networkData);
  };

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    setOrders(storedOrders);
    const name = localStorage.getItem('userName') || 'User';
    setUserName(name);
    updateNetwork();
    window.addEventListener('networkChange', updateNetwork);
    return () => window.removeEventListener('networkChange', updateNetwork);
  }, []);

  const orderTotal = orders.reduce((sum, order) => sum + parseFloat(order.total.slice(1)), 0).toFixed(2);

  const chartData = {
    labels: networkDetails.map(gen => gen.gen),
    datasets: [{
      label: 'Sales (R)',
      data: networkDetails.map(gen => gen.recruits.reduce((sum, r) => sum + parseFloat(r.sales.slice(1)), 0)),
      backgroundColor: '#6b21a8',
      borderColor: '#5b1d98',
      borderWidth: 1,
    }],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Network Sales by Generation' },
    },
    scales: {
      y: { beginAtZero: true, title: { display: true, text: 'Sales (R)' } },
      x: { title: { display: true, text: 'Generation' } },
    },
  };

  return (
    <div className={styles.container}>
      <div className={styles.welcome}>
        <h1 className={styles.welcomeTitle}>Welcome, {userName}!</h1>
        <p className={styles.welcomeText}>Your empire is thriving—keep ruling the perfume game!</p>
      </div>
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
      <div className={styles.chartContainer}>
        <Bar data={chartData} options={chartOptions} />
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