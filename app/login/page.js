"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../styles/auth.module.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    if (!email || !password) {
      setMessage('Please fill in all fields!');
      return;
    }
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('email', email);
    localStorage.setItem('userName', email.split('@')[0]);
    setMessage('Logged in successfully!');
    setTimeout(() => router.push('/my-office'), 1000);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Login to Trubel Perfumes</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className={styles.input}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className={styles.input}
      />
      <button onClick={handleLogin} className={styles.button}>
        Login
      </button>
      {message && <p style={{ color: '#ffd700', marginTop: '20px' }}>{message}</p>}
    </div>
  );
}