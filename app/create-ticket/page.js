"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from '../styles/auth.module.css';
import layoutStyles from '../layout.module.css';

export default function CreateTicket() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('User');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitMessage, setSubmitMessage] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
    if (typeof window === 'undefined') return;

    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
    setUserName(localStorage.getItem('userName') || 'User');

    if (!loggedIn) router.push('/login');
  }, [router]);

  const handleSubmit = () => {
    if (!subject || !message) {
      setSubmitMessage('Please fill in all fields!');
      return;
    }
    // Mock submit—store in localStorage for now
    const tickets = JSON.parse(localStorage.getItem('tickets') || '[]');
    tickets.push({ subject, message, user: userName, date: new Date().toISOString() });
    localStorage.setItem('tickets', JSON.stringify(tickets));
    setSubmitMessage('Ticket submitted successfully!');
    setSubject('');
    setMessage('');
    setTimeout(() => setSubmitMessage(''), 3000);
  };

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
          <li><Link href="/team-commissions">Team Commissions</Link></li>
          <li><Link href="/team-rankings">Team Rankings</Link></li>
          <li><Link href="/create-ticket">Create Ticket</Link></li>
        </ul>
      </nav>
      <main className={layoutStyles.mainWithSidebar}>
        <div className={styles.container} style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 className={styles.title}>Create Support Ticket</h2>
          <div style={{ color: 'white', background: '#4b0082', padding: '20px', borderRadius: '10px', boxShadow: '0 6px 12px rgba(0,0,0,0.2)' }}>
            <h3 style={{ color: '#ffd700', marginBottom: '15px' }}>Submit a Ticket</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Subject"
                className={styles.input}
                style={{ width: '100%', maxWidth: '500px' }}
              />
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe your issue..."
                className={styles.input}
                style={{ width: '100%', maxWidth: '500px', minHeight: '150px', resize: 'vertical' }}
              />
              <button onClick={handleSubmit} className={styles.button} style={{ width: 'fit-content', padding: '10px 20px' }}>
                Submit Ticket
              </button>
              {submitMessage && <p style={{ color: '#ffd700', marginTop: '10px' }}>{submitMessage}</p>}
            </div>
          </div>
          <button onClick={() => router.push('/my-office')} className={styles.button} style={{ marginTop: '20px' }}>
            Back to My Office
          </button>
        </div>
      </main>
    </div>
  );
}