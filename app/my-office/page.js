"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from '../styles/auth.module.css';

export default function MyOffice() {
  const [user, setUser] = useState(null);
  const [payslips, setPayslips] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const email = localStorage.getItem('email');
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

      if (!isLoggedIn || !email) {
        router.push('/login');
        return;
      }

      try {
        const userResponse = await fetch('/api/user', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });
        const userData = await userResponse.json();
        if (userResponse.ok) setUser(userData.user);

        const payslipResponse = await fetch('/api/payslips', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });
        const payslipData = await payslipResponse.json();
        if (payslipResponse.ok) setPayslips(payslipData.payslips);
      } catch (error) {
        console.error(error);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  if (loading) return <div>Loading...</div>;
  if (!user) return null;

  return (
    <div className={styles.container} style={{ maxWidth: '600px', margin: '20px auto', textAlign: 'center' }}>
      <h2 className={styles.title}>My Office</h2>
      <div style={{ background: '#4b0082', color: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 6px 12px rgba(0,0,0,0.2)' }}>
        <h3 style={{ color: '#ffd700' }}>Welcome, {user.name}!</h3>
        <p>Email: {user.email}</p>
        <p>Role: {user.role}</p>
        <p>Sales: R{user.sales.toFixed(2)}</p>
        {user.upline && <p>Upline: {user.upline}</p>}
        <h4 style={{ color: '#ffd700', marginTop: '20px' }}>Payslips</h4>
        {payslips.length > 0 ? (
          payslips.map((slip) => (
            <div key={slip.id} style={{ margin: '10px 0', border: '1px solid #ffd700', padding: '10px', borderRadius: '5px' }}>
              <p>Period: {new Date(slip.periodStart).toLocaleDateString()} - {new Date(slip.periodEnd).toLocaleDateString()}</p>
              <p>Sales: R{slip.sales.toFixed(2)}</p>
              <p>Earnings: R{slip.earnings.toFixed(2)}</p>
            </div>
          ))
        ) : (
          <p>No payslips available yet.</p>
        )}
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