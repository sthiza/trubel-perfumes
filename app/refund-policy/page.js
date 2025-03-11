"use client";
import React from 'react';
import Link from 'next/link';
import Footer from '../components/Footer';
import layoutStyles from '../layout.module.css';

export default function PrivacyPolicy() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <header className={layoutStyles.header}>
        <h1 className={layoutStyles.headerTitle}>Trubel Perfumes</h1>
      </header>
      <main style={{ flex: '1', padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ color: '#ffd700', marginBottom: '20px' }}>Privacy Policy</h2>
        <div style={{ color: 'white', background: '#4b0082', padding: '20px', borderRadius: '10px', boxShadow: '0 6px 12px rgba(0,0,0,0.2)' }}>
          <p>At Trubel Management Solutions, we respect your right to privacy. This policy outlines how we collect, use, and protect your personal information.</p>
          <ul style={{ paddingLeft: '20px' }}>
            <li>These terms and conditions outline the agreement between Trubel Management Solutions and our customers. .</li>
            <li>We use this information to process your orders, provide customer service, and communicate with you about our products and promotions.</li>
            <li>We do not share your personal information with third parties, except as necessary to process your orders or provide customer service.</li>
            <li>You may opt-out of receiving promotional emails from us at any time by clicking the unsubscribe link at the bottom of our emails.</li>
          </ul>
          <p style={{ marginTop: '15px' }}>
            Back to <Link href="/" style={{ color: '#ffd700' }}>Home</Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}