"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from '../dashboard.module.css';
import layoutStyles from '../layout.module.css';

export default function Dashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('User');
  const [isMounted, setIsMounted] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const name = localStorage.getItem('userName') || 'User';
    setIsLoggedIn(loggedIn);
    setUserName(name);
    if (!loggedIn) router.push('/login');
  }, [router]);

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

  if (!isMounted) return null;

  return (
    <div>
      {isLoggedIn ? (
        <>
          <header className={`${layoutStyles.header} ${isLoggingOut ? layoutStyles.fadeOut : ''}`}>
            <h1 className={layoutStyles.headerTitle}>Trubel Perfumes</h1>
            <div className={layoutStyles.userProfile}>
              <span className={layoutStyles.userName}>{userName}</span>
              <button onClick={handleLogout} className={layoutStyles.logoutButton}>Logout</button>
            </div>
          </header>
          <nav className={`${layoutStyles.sidebar} ${isLoggingOut ? layoutStyles.fadeOut : ''}`}>
            <ul className={layoutStyles.navList}>
              <li><Link href="/dashboard">Dashboard</Link></li>
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
              <h1 className={styles.title}>Dashboard</h1>
              <p style={{ fontSize: '18px', marginBottom: '20px' }}>
                Welcome back, {userName}! Your scent empire awaits.
              </p>
              {/* Stats Cards */}
              <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
                <div style={{ flex: 1, padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
                  <h3>My Orders</h3>
                  <p>5 Pending</p> {/* Dummy data */}
                </div>
                <div style={{ flex: 1, padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
                  <h3>Team Sales</h3>
                  <p>R 12,500</p> {/* Dummy data */}
                </div>
                <div style={{ flex: 1, padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
                  <h3>Network Size</h3>
                  <p>25 Members</p> {/* Dummy data */}
                </div>
              </div>
              {/* Quick Links */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px' }}>
                <Link href="/buy-perfumes" style={{ textDecoration: 'none' }}>
                  <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '5px', textAlign: 'center' }}>
                    <h4>Buy Perfumes</h4>
                  </div>
                </Link>
                <Link href="/my-orders" style={{ textDecoration: 'none' }}>
                  <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '5px', textAlign: 'center' }}>
                    <h4>My Orders</h4>
                  </div>
                </Link>
                <Link href="/my-network/first-gen" style={{ textDecoration: 'none' }}>
                  <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '5px', textAlign: 'center' }}>
                    <h4>My Network</h4>
                  </div>
                </Link>
              </div>
            </div>
          </main>
        </>
      ) : (
        <main className={layoutStyles.mainFull}>
          <p>Redirecting to login...</p>
        </main>
      )}
    </div>
  );
}