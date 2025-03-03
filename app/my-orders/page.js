import styles from './orders.module.css';

export default function MyOrders() {
  return (
    <div>
      <h1 className={styles.title}>My Orders</h1>
      <div className={styles.card}>
        <p>No orders yet</p>
      </div>
    </div>
  );
}