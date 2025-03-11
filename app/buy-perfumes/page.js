"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import styles from '../styles/auth.module.css';
import layoutStyles from '../layout.module.css';
import { FaShoppingCart, FaBox, FaMoneyBillWave, FaUsers } from 'react-icons/fa';

export default function BuyPerfumes() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('User');
  const [isMounted, setIsMounted] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [address, setAddress] = useState({ street: '', city: '', postalCode: '' });
  const [message, setMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const name = localStorage.getItem('userName') || 'User';
    setIsLoggedIn(loggedIn);
    setUserName(name);

    let storedProducts = JSON.parse(localStorage.getItem('products') || '[]');
    if (storedProducts.length === 0) {
      storedProducts = [
        {
          id: 1,
          name: 'Royal Oud',
          price: 200.00,
          image: 'https://images.unsplash.com/photo-1608248543803-5a93f848e97a?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
          description: 'A luxurious blend of deep oud and warm spices, evoking royalty and mystery. Perfect for evening wear.',
          category: 'Oriental',
        },
        {
          id: 2,
          name: 'Midnight Rose',
          price: 250.00,
          image: 'https://images.unsplash.com/photo-1587017539504-1304d5e9ea36?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
          description: 'Velvety rose petals dance with hints of musk under a moonlit sky. A romantic, floral escape.',
          category: 'Floral',
        },
        {
          id: 3,
          name: 'Golden Amber',
          price: 300.00,
          image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
          description: 'Rich amber fused with sweet vanilla and a touch of citrus. A golden glow for any occasion.',
          category: 'Woody',
        },
      ];
      localStorage.setItem('products', JSON.stringify(storedProducts));
    }
    setProducts(storedProducts);

    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(storedCart);
    if (!loggedIn) router.push('/login');
  }, [router]);

  const addToCart = (product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setMessage(`${product.name} added to cart!`);
    setTimeout(() => setMessage(''), 3000);
  };

  const handleCheckout = async () => {
    if (cart.length === 0) {
      setMessage('Cart is empty!');
      return;
    }
    if (!address.street || !address.city || !address.postalCode) {
      setMessage('Please fill in all address fields!');
      return;
    }

    const total = cart.reduce((sum, p) => sum + p.price, 0).toFixed(2);
    try {
      const response = await axios.post('/api/payfast', {
        amount: total,
        item_name: 'Perfume Purchase',
        email: localStorage.getItem('email') || 'test@example.com',
      });
      const { signature, formData } = response.data;

      const form = document.createElement('form');
      form.method = 'POST';
      form.action = 'https://sandbox.payfast.co.za/eng/process';
      Object.entries({
        merchant_id: '10000100',
        merchant_key: '46f0cd694581a',
        return_url: `${window.location.origin}/my-orders`,
        cancel_url: `${window.location.origin}/buy-perfumes`,
        notify_url: `${window.location.origin}/api/payfast-notify`,
        ...formData,
        signature,
      }).forEach(([key, value]) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = value;
        form.appendChild(input);
      });

      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      const newOrder = {
        id: Date.now(),
        items: cart,
        total: `R${total}`,
        address: { ...address },
        status: 'Pending',
        date: new Date().toISOString().split('T')[0],
      };
      orders.push(newOrder);
      localStorage.setItem('orders', JSON.stringify(orders));
      setCart([]);
      localStorage.setItem('cart', '[]');
      setAddress({ street: '', city: '', postalCode: '' });

      document.body.appendChild(form);
      form.submit();
    } catch (error) {
      setMessage('Payment initiation failed. Try again!');
    }
  };

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      setIsLoggingOut(true);
      setTimeout(() => {
        localStorage.setItem('isLoggedIn', 'false');
        localStorage.removeItem('userName');
        localStorage.removeItem('orders');
        localStorage.removeItem('sales');
        localStorage.removeItem('network');
        localStorage.removeItem('cart');
        setIsLoggedIn(false);
        router.push('/');
      }, 500);
    }
  };

  if (!isMounted) return null;

  return (
    <div>
      {isLoggedIn ? (
        <>
          <header className={`${layoutStyles.header} ${isLoggingOut ? layoutStyles.fadeOut : ''}`}>
            <h1 className={layoutStyles.headerTitle}>Trubel Perfumes</h1>
            <div className={layoutStyles.userProfile}>
              <span className={layoutStyles.userName}>{userName}</span>
              <button onClick={handleLogout} className={layoutStyles.logoutButton}>Logout</button>
            </div>
          </header>
          <nav className={`${layoutStyles.sidebar} ${isLoggingOut ? layoutStyles.fadeOut : ''}`}>
            <ul className={layoutStyles.navList}>
              <li><Link href="/dashboard">Dashboard</Link></li>
              <li><Link href="/account-profile">Account Profile</Link></li>
              <li><Link href="/buy-perfumes">Buy Expensive Perfume(s)</Link></li>
              <li><Link href="/my-orders">My Orders</Link></li>
              <li><Link href="/my-network/first-gen">First Gen</Link></li>
              <li><Link href="/my-network/gen-2">Gen 2</Link></li>
              <li><Link href="/my-network/gen-3">Gen 3</Link></li>
              <li><Link href="/my-network/gen-4">Gen 4</Link></li>
              <li><Link href="/my-network/gen-5">Gen 5</Link></li>
              <li><Link href="/my-office">My Office</Link></li>
              <li><Link href="/team-commissions">Team Commissions</Link></li>
              <li><Link href="/team-rankings">Team Rankings</Link></li>
              <li><Link href="/team-sales">Team Sales</Link></li>
              <li><Link href="/team-recruitment">Team Recruitment</Link></li>
              <li><Link href="/account-maintenance">Account Maintenance</Link></li>
              <li><Link href="/bank-account">Bank Account</Link></li>
              <li><Link href="/miscellaneous">Miscellaneous</Link></li>
              <li><Link href="/create-ticket">Create Ticket</Link></li>
              <li><Link href="/my-tickets">My Tickets</Link></li>
            </ul>
          </nav>
          <main className={layoutStyles.mainWithSidebar}>
            <div className={styles.container}>
              <h2 className={styles.title}>Buy Expensive Perfumes</h2>
              <div style={{ marginBottom: '40px' }}>
                <h3 style={{ color: '#ffd700', marginBottom: '20px' }}>Available Perfumes</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px' }}>
                  {products.map((product) => (
                    <div
                      key={product.id}
                      style={{
                        background: '#4b0082',
                        color: 'white',
                        padding: '20px',
                        borderRadius: '10px',
                        textAlign: 'center',
                        boxShadow: '0 6px 12px rgba(0,0,0,0.2)',
                        transition: 'transform 0.2s',
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        style={{ width: '100%', maxWidth: '200px', height: 'auto', borderRadius: '8px', marginBottom: '15px' }}
                      />
                      <h3 style={{ margin: '0 0 10px', fontSize: '1.5em' }}>{product.name}</h3>
                      <p style={{ margin: '0 0 10px', fontSize: '1.2em', color: '#ffd700' }}>R {product.price.toFixed(2)}</p>
                      <p style={{ margin: '0 0 15px', fontSize: '1em', lineHeight: '1.4' }}>{product.description}</p>
                      <button
                        onClick={() => addToCart(product)}
                        className={styles.button}
                        style={{ padding: '10px 20px', fontSize: '1em' }}
                      >
                        <FaShoppingCart style={{ marginRight: '8px' }} /> Add to Cart
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ color: 'white' }}>
                <h3 style={{ color: '#ffd700', marginBottom: '20px' }}>Cart ({cart.length})</h3>
                {cart.length === 0 ? (
                  <p>Cart is empty</p>
                ) : (
                  <>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                      {cart.map((item, index) => (
                        <li key={index} style={{ margin: '10px 0', fontSize: '1.1em' }}>
                          {item.name} - R {item.price.toFixed(2)}
                        </li>
                      ))}
                    </ul>
                    <p style={{ fontSize: '1.2em' }}>Total: R {cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)}</p>
                    <h3 style={{ color: '#ffd700', marginBottom: '15px' }}>Delivery Address</h3>
                    <input
                      value={address.street}
                      onChange={(e) => setAddress({ ...address, street: e.target.value })}
                      placeholder="Street Address"
                      className={styles.input}
                      style={{ marginBottom: '15px', padding: '12px' }}
                    />
                    <input
                      value={address.city}
                      onChange={(e) => setAddress({ ...address, city: e.target.value })}
                      placeholder="City"
                      className={styles.input}
                      style={{ marginBottom: '15px', padding: '12px' }}
                    />
                    <input
                      value={address.postalCode}
                      onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
                      placeholder="Postal Code"
                      className={styles.input}
                      style={{ marginBottom: '15px', padding: '12px' }}
                    />
                    <button onClick={handleCheckout} className={styles.button} style={{ padding: '12px 24px', fontSize: '1.1em' }}>
                      Checkout with PayFast
                    </button>
                  </>
                )}
              </div>
              {message && <p style={{ color: '#ffd700', marginTop: '20px', fontSize: '1.1em' }}>{message}</p>}
              <button
                onClick={() => router.push('/dashboard')}
                className={styles.button}
                style={{ marginTop: '30px', padding: '12px 24px', fontSize: '1.1em' }}
              >
                Back to Dashboard
              </button>
            </div>
          </main>
        </>
      ) : (
        <main className={layoutStyles.mainFull}>
          <p style={{ color: '#ffd700' }}>Redirecting to login...</p>
        </main>
      )}
    </div>
  );
}