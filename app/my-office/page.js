"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Footer from '../components/Footer';
import styles from '../styles/auth.module.css';
import layoutStyles from '../layout.module.css';

export default function MyOffice() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('User');
  const [role, setRole] = useState('User'); // Add this
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
    setRole(localStorage.getItem('role') || 'User'); // Add this

    const userId = localStorage.getItem('email') || 'USER' + Math.random().toString(36).substr(2, 9);
    const refId = userId.replace(/[^a-zA-Z0-9]/g, '');
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
          {(role === 'Admin' || role === 'SuperAdmin') && <li><Link href="/admin-upload">Admin Upload</Link></li>}
        </ul>
      </nav>
      {/* ... (rest unchanged) ... */}
      <Footer />
    </div>
  );
}