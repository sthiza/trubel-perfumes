"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link'; // Add this
import styles from '../styles/auth.module.css';

export default function MyOffice() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const email = localStorage.getItem('email');
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

      if (!isLoggedIn || !email) {
        router.push('/login');
        return;
      }

      try {
        const response = await fetch('/api/user', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });
        const data = await response.json();
        if (response.ok) {
          setUser(data.user);
        } else {
          setUser(null);
          localStorage.clear();
          router.push('/login');
        }
      } catch (error) {
        console.error(error);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  if (loading) return <div>Loading...</div>;

  if (!user) return null;

  return (
    <div className={styles.container} style={{ maxWidth: '600px', margin: '20px auto', textAlign: 'center' }}>
      <h2 className={styles.title}>My Office</h2> {/* Single title */}
      <div style={{ background: '#4b0082', color: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 6px 12px rgba(0,0,0,0.2)' }}>
        <h3 style={{ color: '#ffd700' }}>Welcome, {user.name}!</h3>
        <p>Email: {user.email}</p>
        <p>Role: {user.role}</p>
        <p>Sales: R{user.sales.toFixed(2)}</p>
        {user.upline && <p>Upline: {user.upline}</p>}
        <div style={{ marginTop: '20px' }}>
          <Link href="/" style={{ color: '#ffd700', marginRight: '15px' }}>Home</Link>
          <Link href="/register" style={{ color: '#ffd700', marginRight: '15px' }}>Register</Link>
          {user.role === 'SuperAdmin' && (
            <Link href="/admin/users" style={{ color: '#ffd700', marginRight: '15px' }}>Manage Users</Link>
          )}
          <button
            onClick={() => {
              localStorage.clear();
              router.push('/login');
            }}
            className={styles.button}
            style={{ marginLeft: '15px' }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}