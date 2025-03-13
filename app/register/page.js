"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Suspense } from 'react';
import Link from 'next/link';
import Footer from '../components/Footer';
import styles from '../styles/auth.module.css';
import layoutStyles from '../layout.module.css';

function RegisterContent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();
  const { useSearchParams } = require('next/navigation');
  const searchParams = useSearchParams();
  const upline = searchParams.get('ref') || null;

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (loggedIn) router.push('/my-office');
  }, [router]);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage('Please fill in all fields!');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setMessage('Please enter a valid email address!');
      return;
    }

    if (password.length < 6) {
      setMessage('Password must be at least 6 characters long!');
      return;
    }

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, upline }),
      });
      const result = await response.json();

      setMessage(result.message);
      if (response.ok && result.user) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('email', result.user.email);
        localStorage.setItem('userName', result.user.name);
        localStorage.setItem('role', result.user.role);
        setEmail('');
        setPassword('');
        setTimeout(() => router.push('/my-office'), 2000);
      }
    } catch (error) {
      setMessage('Registration failed! Try again.');
      console.error(error);
    }
  };

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
            <form onSubmit={handleRegister}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder="Email" 
                  className={styles.input} 
                  style={{ width: '100%', padding: '10px' }} 
                />
                <input 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  placeholder="Password (min 6 characters)" 
                  className={styles.input} 
                  style={{ width: '100%', padding: '10px' }} 
                />
                {upline && <p style={{ color: '#ffd700' }}>Upline: {upline}</p>}
                <button 
                  type="submit"
                  className={styles.button} 
                  style={{ width: 'fit-content', padding: '10px 20px', alignSelf: 'center' }}
                >
                  Sign Up
                </button>
                {message && <p style={{ color: '#ffd700', marginTop: '10px', textAlign: 'center' }}>{message}</p>}
              </div>
            </form>
            <p style={{ marginTop: '15px', textAlign: 'center' }}>
              Already have an account? <Link href="/login" style={{ color: '#ffd700' }}>Sign In</Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function Register() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RegisterContent />
    </Suspense>
  );
}