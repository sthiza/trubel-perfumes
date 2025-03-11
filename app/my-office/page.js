"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Footer from '../components/Footer'; // Add this
import styles from '../styles/auth.module.css';
import layoutStyles from '../layout.module.css';

export default function MyOffice() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('User');
  const [referralLink, setReferralLink] = useState('');
  const [level1Recruits, setLevel1Recruits] = useState([]);
  const [monthlySales, setMonthlySales] = useState({ personal: 0, team: 0 });
  const [currentRank, setCurrentRank] = useState('Starter');
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
    if (typeof window === 'undefined') return;

    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
    setUserName(localStorage.getItem('userName') || 'User');

    const userId = localStorage.getItem('email') || 'USER' + Math.random().toString(36).substr(2, 9);
    const isAdmin = userId === 'admin@example.com';
    const refId = isAdmin ? 'TrubelPerfumes' : userId.replace(/[^a-zA-Z0-9]/g, '');
    const link = `${window.location.origin}/ref=${refId}`;
    setReferralLink(link);

    const allUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const recruits = allUsers.filter(user => user.upline === refId).map(user => ({
      id: user.email,
      name: user.name,
      sales: user.sales || 0,
    }));
    setLevel1Recruits(recruits.length > 0 ? recruits : [
      { id: 'rec1', name: 'JohnDoe', sales: 2000 },
      { id: 'rec2', name: 'JaneSmith', sales: 1500 },
    ]);

    let personalSales = 0;
    try {
      const storedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      personalSales = storedOrders.reduce((sum, order) => sum + parseFloat(order.total.replace('R', '') || 0), 0);
    } catch (e) {
      console.error('Error parsing orders:', e);
    }
    const teamSales = recruits.length > 0 ? recruits.reduce((sum, recruit) => sum + recruit.sales, 0) : 3500;
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

  if (!isMounted) return null;
  if (!isLoggedIn) return <p style={{ color: '#ffd700' }}>Redirecting to login...</p>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
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
      <main className={layoutStyles.mainWithSidebar} style={{ flex: '1' }}>
        <div className={styles.container} style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 className={styles.title}>My Office</h2>
          <div style={{ color: 'white', background: '#4b0082', padding: '20px', borderRadius: '10px', boxShadow: '0 6px 12px rgba(0,0,0,0.2)', marginBottom: '20px' }}>
            <h3 style={{ color: '#ffd700', marginBottom: '15px' }}>Your HeReferral Link</h3>
            <p style={{ margin: '0 0 15px', wordBreak: 'break-all' }}>{referralLink}</p>
            <button onClick={copyToClipboard} className={styles.button} style={{ padding: '10px 20px' }}>Copy Link</button>
          </div>
          <div style={{ color: 'white', background: '#4b0082', padding: '20px', borderRadius: '10px', boxShadow: '0 6px 12px rgba(0,0,0,0.2)', marginBottom: '20px' }}>
            <h3 style={{ color: '#ffd700', marginBottom: '15px' }}>Level 1 Recruits ({level1Recruits.length})</h3>
            {level1Recruits.length === 0 ? (
              <p>No recruits yet—share your link!</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {level1Recruits.map((recruit) => (
                  <div key={recruit.id} style={{ 
                    border: '1px solid #ffd700', 
                    padding: '10px', 
                    borderRadius: '5px', 
                    background: '#6a0dad', 
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)' 
                  }}>
                    {recruit.name} - R{recruit.sales.toFixed(2)}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div style={{ color: 'white', background: '#4b0082', padding: '20px', borderRadius: '10px', boxShadow: '0 6px 12px rgba(0,0,0,0.2)', marginBottom: '20px' }}>
            <h3 style={{ color: '#ffd700', marginBottom: '15px' }}>Rank Progress</h3>
            <p>Current Rank: {currentRank}</p>
            <p>Personal Sales (This Month): R{monthlySales.personal.toFixed(2)}</p>
            <p>Team Sales (Level 1): R{monthlySales.team.toFixed(2)}</p>
            <p><strong>Total:</strong> R{(monthlySales.personal + monthlySales.team).toFixed(2)}</p>
          </div>
          <div style={{ display: 'flex', gap: '15px' }}>
            <button onClick={() => router.push('/buy-perfumes')} className={styles.button} style={{ padding: '10px 20px', flex: 1 }}>Buy Perfumes</button>
            <button onClick={() => router.push('/my-orders')} className={styles.button} style={{ padding: '10px 20px', flex: 1 }}>View Orders</button>
            <button onClick={() => router.push('/team-sales')} className={styles.button} style={{ padding: '10px 20px', flex: 1 }}>Team Sales</button>
          </div>
        </div>
      </main>
      <Footer /> {/* Add this */}
    </div>
  );
}