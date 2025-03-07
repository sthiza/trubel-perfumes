"use client";
import { useState, useEffect } from 'react';
import styles from './orders.module.css';
import layoutStyles from '../layout.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function MyOrders() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('User');
  const [orders, setOrders] = useState([]);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const name = localStorage.getItem('userName') || 'User';
    setIsLoggedIn(loggedIn);
    setUserName(name);
    const storedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    setOrders(Array.isArray(storedOrders) ? storedOrders : []);
  }, []);

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      localStorage.setItem('isLoggedIn', 'false');
      localStorage.removeItem('userName');
      localStorage.removeItem('orders');
      localStorage.removeItem('cart');
      setIsLoggedIn(false);
      router.push('/');
    }
  };

  if (!isMounted) return null;

  return (
    <>
      {isLoggedIn && (
        <>
          <header className={layoutStyles.header}>
            <h1 className={layoutStyles.headerTitle}>Trubel Perfumes</h1>
            <div className={layoutStyles.userProfile}>
              <span className={layoutStyles.userName}>{userName}</span>
              <button onClick={handleLogout} className={layoutStyles.logoutButton}>
                Logout
              </button>
            </div>
          </header>
          <nav className={layoutStyles.sidebar}>
            <ul className={layoutStyles.navList}>
              <li><Link href="/">Dashboard</Link></li>
              <li><Link href="/buy-perfumes">Buy Perfume(s)</Link></li>
              <li><Link href="/my-orders">My Orders</Link></li>
              <li><Link href="/my-network/first-gen">First Gen</Link></li>
              <li><Link href="/my-network/gen-2">Gen 2</Link></li>
              <li><Link href="/my-network/gen-3">Gen 3</Link></li>
              <li><Link href="/my-network/gen-4">Gen 4</Link></li>
              <li><Link href="/my-network/gen-5">Gen 5</Link></li>
              <li><Link href="/my-office">My Office</Link></li>
              <li><Link href="/team-commissions">Team Commissions</Link></li>
              <li><Link href="/team-rankings">Team Rankings</Link></li>
              <li><Link href="/team-sales">Team Sales</Link></li>
              <li><Link href="/team-recruitment">Team Recruitment</Link></li>
              <li><Link href="/account-maintenance">Account Maintenance</Link></li>
              <li><Link href="/account-profile">Account Profile</Link></li>
              <li><Link href="/bank-account">Bank Account</Link></li>
              <li><Link href="/miscellaneous">Miscellaneous</Link></li>
              <li><Link href="/create-ticket">Create Ticket</Link></li>
              <li><Link href="/my-tickets">My Tickets</Link></li>
            </ul>
          </nav>
        </>
      )}
      <main className={isLoggedIn ? layoutStyles.mainWithSidebar : layoutStyles.mainFull}>
        <div className={styles.container}>
          <h1 className={styles.title}>My Orders</h1>
          <div className={styles.orderList}>
            {orders.length === 0 ? (
              <p>No orders yet.</p>
            ) : (
              orders.map(order => (
                <div key={order.id} className={styles.orderCard}>
                  <p><strong>Order ID:</strong> {order.id}</p>
                  <p><strong>Total:</strong> {order.total}</p>
                  <p><strong>Status:</strong> {order.status}</p>
                  <p><strong>Date:</strong> {new Date(order.date).toLocaleString()}</p>
                  <ul>
                    {order.items.map((item, index) => (
                      <li key={index}>{item.name} - {item.price}</li>
                    ))}
                  </ul>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </>
  );
}