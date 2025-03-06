"use client";
import { useState, useEffect } from 'react';
import styles from './dashboard.module.css';
import { useAuth } from './layout';

export default function Dashboard() {
  const [userName, setUserName] = useState('');
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    const name = localStorage.getItem('userName') || 'Guest';
    setUserName(name);
  }, []);

  if (!isLoggedIn) {
    return (
      <div className={styles.dashboard}>
        <h1 className={styles.title}>Please Register</h1>
        <p>Go to <a href="/register">Register</a> to become an IBO.</p>
      </div>
    );
  }

  return (
    <div className={styles.dashboard}>
      <h1 className={styles.title}>Dashboard - Welcome, {userName}!</h1>
      <div className={styles.grid}>
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Total Orders</h2>
          <p className={styles.cardValue}>R0.0</p>
        </div>
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>No of Directs</h2>
          <p className={styles.cardValue}>0</p>
        </div>
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Rank Up Bonus</h2>
          <p className={styles.cardValue}>R0</p>
        </div>
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Salary</h2>
          <p className={styles.cardValue}>R0</p>
        </div>
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Items Purchased</h2>
          <p className={styles.cardValue}>0</p>
        </div>
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>IBO Status</h2>
          <p className={styles.cardWarning}>Active IBO</p>
        </div>
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>My Office</h2>
          <p className={styles.cardValue}>0 Tasks</p>
        </div>
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Team Commission</h2>
          <p className={styles.cardValue}>R0</p>
        </div>
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Misc</h2>
          <p className={styles.cardValue}>N/A</p>
        </div>
        <div className={`${styles.card} ${styles.fullWidth}`}>
          <h2 className={styles.cardTitle}>Personal Ranking</h2>
          <p>You’re currently a Team Leader Rank achiever with rank salary of R0</p>
        </div>
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>This Month’s Commission</h2>
          <p className={styles.cardValue}>R0</p>
          <p className={styles.cardWarning}>Warning: If you don’t maintain by the last day of this month, you’ll forfeit this month’s commission</p>
        </div>
      </div>
    </div>
  );
}