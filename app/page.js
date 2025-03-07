"use client";
import { useState, useEffect } from 'react';
import styles from './dashboard.module.css';
import { getNetworkData } from './networkUtils';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import layoutStyles from './layout.module.css';
import dynamic from 'next/dynamic';

const SimpleChart = dynamic(() => import('./components/SimpleChart'), { ssr: false });

export default function Dashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('User');
  const [orders, setOrders] = useState([]);
  const [networkStats, setNetworkStats] = useState({ totalRecruits: 0, totalSales: 0 });
  const [networkDetails, setNetworkDetails] = useState([]);
  const [isMounted, setIsMounted] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const router = useRouter();

  const updateNetwork = () => {
    try {
      const { networkData, totalRecruits, totalSales } = getNetworkData();
      setNetworkStats({ totalRecruits, totalSales });
      setNetworkDetails(networkData || []);
    } catch (e) {
      console.error('Network update failed:', e);
    }
  };

  useEffect(() => {
    setIsMounted(true);
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const name = localStorage.getItem('userName') || 'User';
    setIsLoggedIn(loggedIn);
    setUserName(name);
    const storedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    setOrders(Array.isArray(storedOrders) ? storedOrders : []);
    updateNetwork();
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

  const filteredOrders = orders.filter(order => 
    order.total.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterType === 'all' || order.status === filterType)
  );

  if (!isMounted) return null;

  const orderTotal = filteredOrders.reduce((sum, order) => {
    const total = parseFloat(order.total?.slice(1) || 0);
    return sum + (isNaN(total) ? 0 : total);
  }, 0).toFixed(2);

  return (
    <>
      {isLoggedIn && (
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
        </>
      )}
      <main className={isLoggedIn ? layoutStyles.mainWithSidebar : layoutStyles.mainFull}>
        <div className={styles.container}>
          <div className={styles.welcome}>
            <h1 className={styles.welcomeTitle}>Welcome, {userName}!</h1>
            <p className={styles.welcomeText}>Your empire is thriving—keep ruling the perfume game!</p>
          </div>
          <h1 className={styles.title}>Dashboard</h1>
          <div className={styles.filters}>
            <input
              type="text"
              placeholder="Search orders by total..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className={styles.dropdown}
            >
              <option value="all">All Orders</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div className={styles.summary}>
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>Total Orders</h2>
              <p className={styles.cardValue}>{filteredOrders.length}</p>
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
          <SimpleChart networkDetails={networkDetails} />
          <div className={styles.details}>
            <h2 className={styles.detailsTitle}>Network Breakdown</h2>
            <div className={styles.detailsList}>
              {networkDetails.map((gen, index) => (
                <div key={index} className={styles.detailItem}>
                  <p><strong>{gen.gen || 'Unknown'}</strong></p>
                  <p>Recruits: {gen.recruits?.length || 0}</p>
                  <p>Sales: R{gen.recruits?.reduce((sum, r) => sum + parseFloat(r.sales?.slice(1) || 0), 0) || 0}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}