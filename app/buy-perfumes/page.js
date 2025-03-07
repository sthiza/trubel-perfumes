"use client";
import { useState, useEffect } from 'react';
import styles from './buyPerfumes.module.css';
import layoutStyles from '../layout.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function BuyPerfumes() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('User');
  const [cart, setCart] = useState([]);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  const perfumes = [
    { id: 1, name: 'Perfume 1', price: 'R500', image: '/Perfume1.jpg' },
    { id: 2, name: 'Perfume 2', price: 'R600', image: '/Perfume2.jpg' },
    { id: 3, name: 'Perfume 3', price: 'R700', image: '/Perfume3.jpg' },
  ];

  useEffect(() => {
    setIsMounted(true);
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const name = localStorage.getItem('userName') || 'User';
    setIsLoggedIn(loggedIn);
    setUserName(name);
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(Array.isArray(storedCart) ? storedCart : []);
  }, []);

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      localStorage.setItem('isLoggedIn', 'false');
      localStorage.removeItem('userName');
      localStorage.removeItem('orders');
      localStorage.removeItem('cart');
      setIsLoggedIn(false);
      router.push('/');
    }
  };

  const addToCart = (perfume) => {
    const updatedCart = [...cart, { ...perfume, date: new Date().toISOString() }];
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const checkout = async () => {
    try {
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      const total = cart.reduce((sum, item) => sum + parseFloat(item.price.slice(1)), 0).toFixed(2);
      const newOrder = { id: Date.now(), items: cart, total: `R${total}`, status: 'Pending', date: new Date().toISOString() };
      localStorage.setItem('orders', JSON.stringify([...orders, newOrder]));
      localStorage.setItem('cart', '[]');
      setCart([]);
      await router.push('/my-orders'); // Ensure navigation completes
    } catch (error) {
      console.error('Checkout failed:', error);
    }
  };

  if (!isMounted) return null;

  return (
    <>
      {isLoggedIn && (
        <>
          <header className={layoutStyles.header}>
            <h1 className={layoutStyles.headerTitle}>Trubel Perfumes</h1>
            <div className={layoutStyles.userProfile}>
              <span className={layoutStyles.userName}>{userName}</span>
              <button onClick={handleLogout} className={layoutStyles.logoutButton}>
                Logout
              </button>
            </div>
          </header>
          <nav className={layoutStyles.sidebar}>
            <ul className={layoutStyles.navList}>
              <li><Link href="/">Dashboard</Link></li>
              <li><Link href="/buy-perfumes">Buy Perfume(s)</Link></li>
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
              <li><Link href="/account-profile">Account Profile</Link></li>
              <li><Link href="/bank-account">Bank Account</Link></li>
              <li><Link href="/miscellaneous">Miscellaneous</Link></li>
              <li><Link href="/create-ticket">Create Ticket</Link></li>
              <li><Link href="/my-tickets">My Tickets</Link></li>
            </ul>
          </nav>
        </>
      )}
      <main className={isLoggedIn ? layoutStyles.mainWithSidebar : layoutStyles.mainFull}>
        <div className={styles.container}>
          <h1 className={styles.title}>Buy Perfumes</h1>
          <div className={styles.perfumeList}>
            {perfumes.map(perfume => (
              <div key={perfume.id} className={styles.perfumeCard}>
                <img src={perfume.image} alt={perfume.name} className={styles.perfumeImage} />
                <h2 className={styles.perfumeName}>{perfume.name}</h2>
                <p className={styles.perfumePrice}>{perfume.price}</p>
                <button onClick={() => addToCart(perfume)} className={styles.addButton}>
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
          <div className={styles.cart}>
            <h2 className={styles.cartTitle}>Cart ({cart.length})</h2>
            {cart.map((item, index) => (
              <div key={index} className={styles.cartItem}>
                <p>{item.name} - {item.price}</p>
              </div>
            ))}
            {cart.length > 0 && (
              <button onClick={checkout} className={styles.checkoutButton}>
                Checkout
              </button>
            )}
          </div>
        </div>
      </main>
    </>
  );
}