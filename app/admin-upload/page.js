"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Footer from '../components/Footer';
import styles from '../styles/auth.module.css';
import layoutStyles from '../layout.module.css';

export default function AdminUpload() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('User');
  const [isAdmin, setIsAdmin] = useState(false);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [message, setMessage] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
    if (typeof window === 'undefined') return;

    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const email = localStorage.getItem('email');
    setIsLoggedIn(loggedIn);
    setUserName(localStorage.getItem('userName') || 'User');
    setIsAdmin(email === 'admin@example.com');

    if (!loggedIn) router.push('/login');
  }, [router]);

  const handleUpload = () => {
    if (!name || !price || !imageUrl) {
      setMessage('Please fill in all fields!');
      return;
    }
    const product = { id: Date.now().toString(), name, price: parseFloat(price), imageUrl };
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    products.push(product);
    localStorage.setItem('products', JSON.stringify(products));
    setMessage('Product uploaded successfully!');
    setName('');
    setPrice('');
    setImageUrl('');
    setTimeout(() => setMessage(''), 3000);
  };

  if (!isMounted) return null;
  if (!isLoggedIn) return <p style={{ color: '#ffd700' }}>Redirecting to login...</p>;
  if (!isAdmin) return <p style={{ color: '#ffd700', textAlign: 'center' }}>Access denied—Admin only!</p>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
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
          <li><Link href="/admin-upload">Admin Upload</Link></li>
        </ul>
      </nav>
      <main className={layoutStyles.mainWithSidebar} style={{ flex: '1' }}>
        <div className={styles.container} style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 className={styles.title}>Upload Product</h2>
          <div style={{ color: 'white', background: '#4b0082', padding: '20px', borderRadius: '10px', boxShadow: '0 6px 12px rgba(0,0,0,0.2)' }}>
            <h3 style={{ color: '#ffd700', marginBottom: '15px' }}>Add New Perfume</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '500px' }}>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Product Name"
                className={styles.input}
                style={{ width: '100%' }}
              />
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Price (R)"
                className={styles.input}
                style={{ width: '100%' }}
              />
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Image URL"
                className={styles.input}
                style={{ width: '100%' }}
              />
              <button onClick={handleUpload} className={styles.button} style={{ width: 'fit-content', padding: '10px 20px' }}>
                Upload Product
              </button>
              {message && <p style={{ color: '#ffd700', marginTop: '10px' }}>{message}</p>}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}