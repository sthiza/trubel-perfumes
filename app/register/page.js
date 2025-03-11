"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Footer from '../components/Footer'; // Add this
import styles from '../styles/auth.module.css';
import layoutStyles from '../layout.module.css';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
    if (typeof window === 'undefined') return;
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (loggedIn) router.push('/my-office');
  }, [router]);

  const handleRegister = () => {
    if (!email || !password) {
      setMessage('Please fill in all fields!');
      return;
    }
    const newUser = { email, name: email.split('@')[0], upline: null, sales: 0 };
    const allUsers = JSON.parse(localStorage.getItem('users') || '[]');
    allUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(allUsers));
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userName', newUser.name);
    localStorage.setItem('email', email);
    setMessage('Registered successfully! Welcome to Trubel Perfumes!');
    setTimeout(() => router.push('/my-office'), 2000);
  };

  if (!isMounted) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <header className={layoutStyles.header}>
        <h1 className={layoutStyles.headerTitle}>Trubel Perfumes</h1>
      </header>
      <main style={{ flex: '1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className={styles.container} style={{ maxWidth: '500px', margin: '0 20px' }}>
          <h2 className={styles.title}>Sign Up</h2>
          <div style={{ color: 'white', background: '#4b0082', padding: '20px', borderRadius: '10px', boxShadow: '0 6px 12px rgba(0,0,0,0.2)' }}>
            <h3 style={{ color: '#ffd700', marginBottom: '15px' }}>Join Trubel Perfumes</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className={styles.input} style={{ width: '100%' }} />
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className={styles.input} style={{ width: '100%' }} />
              <button onClick={handleRegister} className={styles.button} style={{ width: 'fit-content', padding: '10px 20px' }}>Sign Up</button>
              {message && <p style={{ color: '#ffd700', marginTop: '10px' }}>{message}</p>}
            </div>
            <p style={{ marginTop: '15px' }}>Already have an account? <Link href="/login" style={{ color: '#ffd700' }}>Sign In</Link></p>
          </div>
        </div>
      </main>
      <Footer /> {/* Add this */}
    </div>
  );
}