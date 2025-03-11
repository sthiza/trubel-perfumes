"use client";
import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import styles from '../../styles/auth.module.css';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();
  const { id } = useParams(); // Grabs the "id" from /ref/[id]

  const handleRegister = () => {
    if (!email || !password) {
      setMessage('Please fill in all fields!');
      return;
    }
    // Mock registration—tie to upliner
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userName', email.split('@')[0]);
    localStorage.setItem('email', email);
    localStorage.setItem('upline', id); // Links new user to upliner
    setMessage('Registered successfully! Welcome to Trubel Perfumes!');
    setTimeout(() => router.push('/buy-perfumes'), 2000);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Join Trubel Perfumes</h2>
      <p style={{ color: 'white', marginBottom: '20px' }}>Referred by: {id}</p>
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
      <button onClick={handleRegister} className={styles.button}>
        Register
      </button>
      {message && <p style={{ color: '#ffd700', marginTop: '20px' }}>{message}</p>}
    </div>
  );
}