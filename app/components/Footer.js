import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{ 
      background: '#4b0082', 
      color: 'white', 
      padding: '20px', 
      textAlign: 'center', 
      borderTop: '2px solid #ffd700',
      marginTop: 'auto'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <p>© {new Date().getFullYear()} Trubel Perfumes. All rights reserved.</p>
        <div style={{ margin: '10px 0', display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <Link href="/privacy-policy" style={{ color: '#ffd700' }}>Privacy</Link>
          <Link href="/terms-of-service" style={{ color: '#ffd700' }}>Terms</Link>
          <Link href="/refund-policy" style={{ color: '#ffd700' }}>Refund</Link>
          <Link href="/shipping-delivery" style={{ color: '#ffd700' }}>Shipping</Link>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap', marginTop: '10px' }}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" style={{ height: '25px', filter: 'brightness(0) invert(1)' }} />
          <img src="https://upload.wikimedia.org/wikipedia/commons/b/b7/MasterCard_Logo.svg" alt="Mastercard" style={{ height: '25px', filter: 'brightness(0) invert(1)' }} />
          <img src="https://payfast.io/wp-content/uploads/2023/08/Payfast-by-Network-Logo-Horizontal-RGB-1.png" alt="Payfast" style={{ height: '25px', filter: 'brightness(0) invert(1)' }} />
          <img src="https://ozow.com/wp-content/uploads/2023/03/Ozow-Logo-White-1.png" alt="Ozow" style={{ height: '25px' }} />
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/American_Express_logo_%282018%29.svg" alt="AmEx" style={{ height: '25px', filter: 'brightness(0) invert(1)' }} />
        </div>
      </div>
    </footer>
  );
}