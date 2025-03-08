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
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [filter, setFilter] = useState('All');
  const [searchId, setSearchId] = useState('');
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
      setIsLoggingOut(true);
      setTimeout(() => {
        localStorage.setItem('isLoggedIn', 'false');
        localStorage.removeItem('userName');
        localStorage.removeItem('orders');
        localStorage.removeItem('cart');
        setIsLoggedIn(false);
        router.push('/');
      }, 500);
    }
  };

  const exportOrders = () => {
    const filteredOrders = getFilteredOrders();
    const csvRows = [
      ['Order ID', 'Date', 'Items', 'Total', 'Status'],
      ...filteredOrders.map(order => [
        order.id,
        order.date,
        `"${order.items.map(item => item.name).join(', ')}"`,
        order.total,
        order.status,
      ]),
    ];
    const csvContent = csvRows.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `orders_${filter.toLowerCase()}_${searchId || 'all'}_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const getFilteredOrders = () => {
    let filtered = orders;
    if (filter !== 'All') {
      filtered = filtered.filter(order => order.status === filter);
    }
    if (searchId) {
      filtered = filtered.filter(order => order.id.toString().includes(searchId));
    }
    return filtered;
  };

  const filteredOrders = getFilteredOrders();

  if (!isMounted) return null;

  return (
    <>
      {isLoggedIn ? (
        <>
          <header className={`${layoutStyles.header} ${isLoggingOut ? layoutStyles.fadeOut : ''}`}>
            <h1 className={layoutStyles.headerTitle}>Trubel Perfumes</h1>
            <div className={layoutStyles.userProfile}>
              <span className={layoutStyles.userName}>{userName}</span>
              <button onClick={handleLogout} className={layoutStyles.logoutButton}>
                Logout
              </button>
            </div>
          </header>
          <nav className={`${layoutStyles.sidebar} ${isLoggingOut ? layoutStyles.fadeOut : ''}`}>
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
          <main className={layoutStyles.mainWithSidebar}>
            <div className={styles.container}>
              <h1 className={styles.title}>My Orders</h1>
              <div className={styles.controls}>
                <input
                  type="text"
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                  placeholder="Search by Order ID"
                  className={styles.searchInput}
                />
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className={styles.filterSelect}
                >
                  <option value="All">All</option>
                  <option value="Pending">Pending</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                </select>
                <button onClick={exportOrders} className={styles.exportButton}>
                  Export Orders
                </button>
              </div>
              {filteredOrders.length === 0 ? (
                <p className={styles.empty}>No orders match this filter or search.</p>
              ) : (
                <div className={styles.orderList}>
                  {filteredOrders.map(order => (
                    <div key={order.id} className={styles.orderCard}>
                      <p><strong>Order ID:</strong> {order.id}</p>
                      <p><strong>Date:</strong> {new Date(order.date).toLocaleString()}</p>
                      <p><strong>Items:</strong> {order.items.map(item => item.name).join(', ')}</p>
                      <p><strong>Total:</strong> {order.total}</p>
                      <p><strong>Status:</strong> <span className={styles.status} data-status={order.status}>{order.status}</span></p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </main>
        </>
      ) : (
        <main className={layoutStyles.mainFull}>
          <p>Please log in to view this page.</p>
        </main>
      )}
    </>
  );
}