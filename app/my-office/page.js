"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from '../styles/auth.module.css';
import layoutStyles from '../layout.module.css';

export default function MyOffice() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('User');
  const [referralLink, setReferralLink] = useState('');
  const [level1Recruits, setLevel1Recruits] = useState([]);
  const [monthlySales, setMonthlySales] = useState({ personal: 0, team: 0 });
  const [currentRank, setCurrentRank] = useState('Starter');
  const [isMounted, setIsMounted] = useState(false); // Add this
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true); // Mark as mounted

    if (typeof window === 'undefined') return; // Guard server-side

    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const name = localStorage.getItem('userName') || 'User';
    setIsLoggedIn(loggedIn);
    setUserName(name);

    // Referral link
    const userId = localStorage.getItem('email') || 'USER' + Math.random().toString(36).substr(2, 9);
    const isAdmin = userId === 'admin@example.com';
    const refId = isAdmin ? 'TrubelPerfumes' : userId.replace(/[^a-zA-Z0-9]/g, '');
    const link = `${window.location.origin}/ref=${refId}`;
    setReferralLink(link);

    // Mock Level 1 recruits
    const mockRecruits = [
      { id: 'rec1', name: 'JohnDoe', sales: 2000 },
      { id: 'rec2', name: 'JaneSmith', sales: 1500 },
    ];
    setLevel1Recruits(mockRecruits);

    // Mock sales and rank
    const storedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    const personalSales = storedOrders.reduce((sum, order) => sum + parseFloat(order.total.replace('R', '')), 0);
    const teamSales = mockRecruits.reduce((sum, recruit) => sum + recruit.sales, 0);
    setMonthlySales({ personal: personalSales, team: teamSales });

    const totalSales = personalSales + teamSales;
    if (totalSales >= 150000) setCurrentRank('President');
    else if (totalSales >= 100000) setCurrentRank('Director');
    else if (totalSales >= 53000) setCurrentRank('Manager');
    else if (totalSales >= 38000) setCurrentRank('Supervisor');
    else if (totalSales >= 13500) setCurrentRank('Team Leader');

    if (!loggedIn) router.push('/login');
  }, [router]);

  const copyToClipboard = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(referralLink);
      alert('Referral link copied to clipboard!');
    }
  };

  if (!isMounted) return null; // Prevent render until mounted
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
        </ul>
      </nav>
      <main className={layoutStyles.mainWithSidebar}>
        <div className={styles.container} style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 className={styles.title}>My Office</h2>
          <div style={{ color: 'white', background: '#4b0082', padding: '20px', borderRadius: '10px', boxShadow: '0 6px 12px rgba(0,0,0,0.2)', marginBottom: '20px' }}>
            <h3 style={{ color: '#ffd700', marginBottom: '15px' }}>Your Referral Link</h3>
            <p style={{ margin: '0 0 15px', wordBreak: 'break-all' }}>{referralLink}</p>
            <button onClick={copyToClipboard} className={styles.button} style={{ padding: '10px 20px' }}>
              Copy Link
            </button>
          </div>
          <div style={{ color: 'white', background: '#4b0082', padding: '20px', borderRadius: '10px', boxShadow: '0 6px 12px rgba(0,0,0,0.2)', marginBottom: '20px' }}>
            <h3 style={{ color: '#ffd700', marginBottom: '15px' }}>Level 1 Recruits ({level1Recruits.length})</h3>
            {level1Recruits.length === 0 ? (
              <p>No recruits yet—share your link!</p>
            ) : (
              level1Recruits.map((recruit) => (
                <p key={recruit.id}>{recruit.name} - R{recruit.sales.toFixed(2)}</p>
              ))
            )}
          </div>
          <div style={{ color: 'white', background: '#4b0082', padding: '20px', borderRadius: '10px', boxShadow: '0 6px 12px rgba(0,0,0,0.2)', marginBottom: '20px' }}>
            <h3 style={{ color: '#ffd700', marginBottom: '15px' }}>Rank Progress</h3>
            <p>Current Rank: {currentRank}</p>
            <p>Personal Sales (This Month): R{monthlySales.personal.toFixed(2)}</p>
            <p>Team Sales (Level 1): R{monthlySales.team.toFixed(2)}</p>
            <p><strong>Total:</strong> R{(monthlySales.personal + monthlySales.team).toFixed(2)}</p>
            <p style={{ marginTop: '10px' }}>
              Next Rank: {currentRank === 'President' ? 'Maxed Out!' : 'Team Leader (R13,500)'}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '15px' }}>
            <button onClick={() => router.push('/buy-perfumes')} className={styles.button} style={{ padding: '10px 20px', flex: 1 }}>
              Buy Perfumes
            </button>
            <button onClick={() => router.push('/my-orders')} className={styles.button} style={{ padding: '10px 20px', flex: 1 }}>
              View Orders
            </button>
            <button onClick={() => router.push('/team-sales')} className={styles.button} style={{ padding: '10px 20px', flex: 1 }}>
              Team Sales
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}