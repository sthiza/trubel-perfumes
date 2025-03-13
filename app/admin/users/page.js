"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../styles/auth.module.css';

export default function ManageUsers() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('User');
  const [message, setMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    const userRole = localStorage.getItem('role');
    if (userRole !== 'SuperAdmin') router.push('/login');
  }, [router]);

  const handleAddUser = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setMessage('Please fill in all fields!');
      return;
    }

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, upline: null, role }),
      });
      const result = await response.json();
      setMessage(result.message);
      if (response.ok) {
        setEmail('');
        setPassword('');
        setRole('User');
      }
    } catch (error) {
      setMessage('Failed to add user!');
      console.error(error);
    }
  };

  return (
    <div className={styles.container} style={{ maxWidth: '600px', margin: '20px auto' }}>
      <h2 className={styles.title}>Manage Users (SuperAdmin)</h2>
      <form onSubmit={handleAddUser}>
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
        <select value={role} onChange={(e) => setRole(e.target.value)} className={styles.input}>
          <option value="User">User</option>
          <option value="Admin">Admin</option>
          <option value="SuperAdmin">SuperAdmin</option>
        </select>
        <button type="submit" className={styles.button}>Add User</button>
      </form>
      {message && <p style={{ color: '#ffd700' }}>{message}</p>}
    </div>
  );
}