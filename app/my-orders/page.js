"use client";
import { useState, useEffect } from 'react';
import styles from './orders.module.css';

export default function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    if (storedOrders.length === 0) {
      const mockOrders = [
        { id: 1, date: '2025-03-07', items: ['Perfume 1 x 2', 'Perfume 2 x 1'], total: 'R500', status: 'Shipped' },
        { id: 2, date: '2025-03-06', items: ['Perfume 3 x 1'], total: 'R180', status: 'Pending' },
      ];
      setOrders(mockOrders);
    } else {
      // Add status to existing orders if missing
      const updatedOrders = storedOrders.map(order => ({
        ...order,
        status: order.status || 'Pending'
      }));
      setOrders(updatedOrders);
    }
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>My Orders</h1>
      {orders.length === 0 ? (
        <p className={styles.empty}>No orders yet.</p>
      ) : (
        <div className={styles.orderList}>
          {orders.map((order) => (
            <div key={order.id} className={styles.order}>
              <p><strong>Order #{order.id}</strong> - {order.date} <span className={styles.status}>{order.status}</span></p>
              <ul className={styles.items}>
                {order.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <p className={styles.total}>Total: {order.total}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}