"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from '../styles/auth.module.css';
import { FaUser, FaLock } from 'react-icons/fa';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // New: Error feedback
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userName', email.split('@')[0]);
      localStorage.setItem('orders', '3'); // New: Match login stats
      localStorage.setItem('sales', '8500'); // New: Match login stats
      localStorage.setItem('network', '15'); // New: Match login stats
      router.push('/dashboard');
    } else {
      setError('Please fill in both email and password'); // New: Error message
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ position: 'relative' }}>
          <FaUser className={styles.icon} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            style={{ paddingLeft: '30px' }}
          />
        </div>
        <div style={{ position: 'relative' }}>
          <FaLock className={styles.icon} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            style={{ paddingLeft: '30px' }}
          />
        </div>
        {error && <p style={{ color: '#ffd700', margin: '10px 0' }}>{error}</p>} {/* New: Error display */}
        <button type="submit" className={styles.button}>Sign Up</button>
      </form>
      <p>
        <Link href="/login" className={styles.link}>Sign In</Link>
      </p>
    </div>
  );
}