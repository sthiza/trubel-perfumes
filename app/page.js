import styles from './dashboard.module.css';

export default function Dashboard() {
  return (
    <div className={styles.dashboard}>
      <h1 className={styles.title}>Dashboard</h1>
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
          <p className={styles.cardWarning}>Please pay R99 starter fee to become an IBO</p>
        </div>
        <div className={`${styles.card} ${styles.fullWidth}`}>
          <h2 className={styles.cardTitle}>Personal Ranking</h2>
          <p>You&apos;re currently a Team Leader Rank achiever with rank salary of R0</p>
        </div>
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>This Month&apos;s Commission</h2>
          <p className={styles.cardValue}>R0</p>
          <p className={styles.cardWarning}>
            Warning: If you don&apos;t maintain by the last day of this month, you&apos;ll forfeit this month&apos;s commission
          </p>
        </div>
      </div>
    </div>
  );
}