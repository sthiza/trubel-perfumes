"use client";
import { useState, useEffect } from 'react';
import styles from '../dashboard.module.css';
import layoutStyles from '../layout.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function BuyPerfumes() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('User');
  const [isMounted, setIsMounted] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [address, setAddress] = useState({ street: '', city: '', postalCode: '' });
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
        { name: 'Perfume 1', price: 'R200', image: '/Perfume1.jpg', description: 'Fresh scent', category: 'Floral' },
        { name: 'Perfume 2', price: 'R250', image: '/Perfume2.jpg', description: 'Bold aroma', category: 'Woody' },
        { name: 'Perfume 3', price: 'R300', image: '/Perfume3.jpg', description: 'Sweet notes', category: 'Fruity' }
      ];
      localStorage.setItem('products', JSON.stringify(storedProducts));
    }
    setProducts(storedProducts);

    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(storedCart);
  }, []);

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      setIsLoggingOut(true);
      setTimeout(() => {
        localStorage.setItem('isLoggedIn', 'false');
        localStorage.removeItem('userName');
        localStorage.removeItem('orders');
        localStorage.removeItem('cart');
        setIsLoggedIn(false);
        router.push('/');
      }, 500);
    }
  };

  const addToCart = (product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const checkout = () => {
    if (!address.street || !address.city || !address.postalCode) {
      alert('Please fill in all address fields.');
      return;
    }
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const total = cart.reduce((sum, p) => sum + parseFloat(p.price.slice(1)), 0);
    const newOrder = {
      id: Date.now(),
      items: cart,
      total: `R${total.toFixed(2)}`,
      address: { ...address },
      status: 'Pending',
      date: new Date().toISOString().split('T')[0]
    };
    orders.push(newOrder);
    localStorage.setItem('orders', JSON.stringify(orders));
    setCart([]);
    localStorage.setItem('cart', '[]');
    setAddress({ street: '', city: '', postalCode: '' });
    alert('Order placed!');
    router.push('/my-orders');
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
          <main className={layoutStyles.mainWithSidebar}>
            <div className={styles.container}>
              <h1 className={styles.title}>Buy Perfumes</h1>
              <div className={styles.section}>
                <h2>Available Perfumes</h2>
                <div className={styles.productRow}>
                  {products.map((p, i) => (
                    <div key={i} className={styles.productCard}>
                      <img src={p.image} alt={p.name} className={styles.productImage} />
                      <h3>{p.name}</h3>
                      <p>{p.price}</p>
                      <p>{p.description}</p>
                      <button className={styles.actionButton} onClick={() => addToCart(p)}>Add to Cart</button>
                    </div>
                  ))}
                </div>
                <h2>Cart</h2>
                {cart.length === 0 ? (
                  <p>No items in cart.</p>
                ) : (
                  <div>
                    <ul className={styles.detailsList}>
                      {cart.map((p, i) => (
                        <li key={i} className={styles.detailItem}>
                          {p.name} - {p.price}
                        </li>
                      ))}
                    </ul>
                    <h2>Delivery Address</h2>
                    <input
                      value={address.street}
                      onChange={e => setAddress({ ...address, street: e.target.value })}
                      placeholder="Street Address"
                      className={styles.searchInput}
                    />
                    <input
                      value={address.city}
                      onChange={e => setAddress({ ...address, city: e.target.value })}
                      placeholder="City"
                      className={styles.searchInput}
                    />
                    <input
                      value={address.postalCode}
                      onChange={e => setAddress({ ...address, postalCode: e.target.value })}
                      placeholder="Postal Code"
                      className={styles.searchInput}
                    />
                    <button className={styles.actionButton} onClick={checkout}>Checkout</button>
                  </div>
                )}
              </div>
            </div>
          </main>
        </>
      ) : (
        <main className={layoutStyles.mainFull}>
          <p>Please log in to view this page.</p>
        </main>
      )}
    </div>
  );
}