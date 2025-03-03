import styles from './network.module.css';

export default function FirstGen() {
  return (
    <div>
      <h1 className={styles.title}>First Gen</h1>
      <div className={styles.card}>
        <p>No recruits in First Generation yet</p>
      </div>
    </div>
  );
}