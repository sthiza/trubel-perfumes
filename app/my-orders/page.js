"use client";
import { useState, useEffect } from 'react';
import styles from './orders.module.css';

export default function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    if (storedOrders.length === 0) {
      const mockOrders = [
        { id: 1, date: '2025-03-07', items: ['Perfume 1 x 2'], total: 'R300', status: 'Shipped' },
        { id: 2, date: '2025-03-06', items: ['Perfume 3 x 1'], total: 'R180', status: 'Pending' },
      ];
      setOrders(mockOrders);
      localStorage.setItem('orders', JSON.stringify(mockOrders));
    } else {
      setOrders(storedOrders);
    }
  }, []);

  const updateStatus = (id) => {
    const newOrders = orders.map(order => {
      if (order.id === id) {
        const nextStatus = order.status === 'Pending' ? 'Shipped' : order.status === 'Shipped' ? 'Delivered' : 'Pending';
        return { ...order, status: nextStatus };
      }
      return order;
    });
    setOrders(newOrders);
    localStorage.setItem('orders', JSON.stringify(newOrders));
  };

  const exportOrders = () => {
    const csvRows = [
      ['Order ID', 'Date', 'Items', 'Total', 'Status'],
      ...orders.map(order => [
        order.id,
        order.date,
        `"${order.items.join(', ')}"`,
        order.total,
        order.status,
      ]),
    ];
    const csvContent = csvRows.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `orders_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>My Orders</h1>
        <button onClick={exportOrders} className={styles.exportButton}>
          Export Orders
        </button>
      </div>
      {orders.length === 0 ? (
        <p className={styles.empty}>No orders yet.</p>
      ) : (
        <div className={styles.orderList}>
          {orders.map((order) => (
            <div key={order.id} className={styles.order}>
              <p>
                <strong>Order #{order.id}</strong> - {order.date}{' '}
                <span className={styles.status} data-status={order.status}>{order.status}</span>
                <button
                  onClick={() => updateStatus(order.id)}
                  className={styles.statusButton}
                >
                  {order.status === 'Pending' ? 'Mark Shipped' : order.status === 'Shipped' ? 'Mark Delivered' : 'Mark Pending'}
                </button>
              </p>
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