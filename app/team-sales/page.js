"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from '../styles/auth.module.css';
import layoutStyles from '../layout.module.css';

export default function TeamSales() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('User');
  const [teamSales, setTeamSales] = useState({ level1: 0, level2: 0, level3: 0, level4: 0, level5: 0 });
  const [level1Recruits, setLevel1Recruits] = useState([]);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
    if (typeof window === 'undefined') return;

    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
    setUserName(localStorage.getItem('userName') || 'User');

    const userId = localStorage.getItem('email') || 'USER' + Math.random().toString(36).substr(2, 9);
    const refId = userId === 'admin@example.com' ? 'TrubelPerfumes' : userId.replace(/[^a-zA-Z0-9]/g, '');

    // Level 1 from users
    const allUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const recruits = allUsers.filter(user => user.upline === refId).map(user => ({
      id: user.email,
      name: user.name,
      sales: user.sales || 0,
    }));
    setLevel1Recruits(recruits);

    const level1Sales = recruits.reduce((sum, recruit) => sum + recruit.sales, 0);
    setTeamSales({
      level1: level1Sales,
      level2: 3000, // Mock L2-5 for now
      level3: 2000,
      level4: 1000,
      level5: 500,
    });

    if (!loggedIn) router.push('/login');
  }, [router]);

  if (!isMounted) return null;
  if (!isLoggedIn) return <p style={{ color: '#ffd700' }}>Redirecting to login...</p>;

  return (
    <div>
      <header className={layoutStyles.header}>
        <h1 className={layoutStyles.headerTitle}>Trubel Perfumes</h1>
        <div className={layoutStyles.userProfile}>
          <span className={layoutStyles.userName}>{userName}</span>
          <button onClick={() => router.push('/')} className={layoutStyles.logoutButton}>Logout</button>
        </div>
      </header>
      <nav className={layoutStyles.sidebar}>
        <ul className={layoutStyles.navList}>
          <li><Link href="/dashboard">Dashboard</Link></li>
          <li><Link href="/buy-perfumes">Buy Perfumes</Link></li>
          <li><Link href="/my-orders">My Orders</Link></li>
          <li><Link href="/my-office">My Office</Link></li>
          <li><Link href="/team-sales">Team Sales</Link></li>
        </ul>
      </nav>
      <main className={layoutStyles.mainWithSidebar}>
        <div className={styles.container} style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 className={styles.title}>Team Sales</h2>
          <div style={{ color: 'white', background: '#4b0082', padding: '20px', borderRadius: '10px', boxShadow: '0 6px 12px rgba(0,0,0,0.2)' }}>
            <h3 style={{ color: '#ffd700', marginBottom: '15px' }}>This Month’s Team Sales</h3>
            <p>Level 1 (Your Recruits): R{teamSales.level1.toFixed(2)}</p>
            {level1Recruits.map((recruit) => (
              <p key={recruit.id} style={{ marginLeft: '20px' }}>- {recruit.name}: R{recruit.sales.toFixed(2)}</p>
            ))}
            <p>Level 2 (L1 Recruits): R{teamSales.level2.toFixed(2)}</p>
            <p>Level 3 (L2 Recruits): R{teamSales.level3.toFixed(2)}</p>
            <p>Level 4 (L3 Recruits): R{teamSales.level4.toFixed(2)}</p>
            <p>Level 5 (L4 Recruits): R{teamSales.level5.toFixed(2)}</p>
            <p><strong>Total Team Sales:</strong> R{Object.values(teamSales).reduce((sum, val) => sum + val, 0).toFixed(2)}</p>
          </div>
          <button onClick={() => router.push('/my-office')} className={styles.button} style={{ marginTop: '20px' }}>
            Back to My Office
          </button>
        </div>
      </main>
    </div>
  );
}