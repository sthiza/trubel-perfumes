"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../styles/auth.module.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage('Please fill in all fields!');
      return;
    }

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
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
        setTimeout(() => router.push('/my-office'), 1000);
      }
    } catch (error) {
      setMessage('Login failed! Try again.');
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Login to Trubel Perfumes</h2>
      <form onSubmit={handleLogin}>
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
        <button type="submit" className={styles.button}>
          Login
        </button>
      </form>
      {message && <p style={{ color: '#ffd700', marginTop: '20px' }}>{message}</p>}
    </div>
  );
}