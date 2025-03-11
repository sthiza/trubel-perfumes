"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import styles from '../styles/auth.module.css';
import layoutStyles from '../layout.module.css';
import { FaShoppingCart, FaBox, FaMoneyBillWave, FaUsers, FaTrash } from 'react-icons/fa';

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
        { id: 1, name: 'Midnight Serenade', price: 220.00, image: '/perfume1.jpg', description: 'A captivating blend of dark vanilla, amber, and musk, with hints of black currant. Perfect for those who love mysterious and alluring scents.', category: 'Oriental' },
        { id: 2, name: 'Golden Horizon', price: 190.00, image: '/perfume2.jpg', description: 'A warm and sunny fragrance featuring notes of bergamot, sandalwood, and a touch of honey. Ideal for daytime wear.', category: 'Woody' },
        { id: 3, name: 'Velvet Bloom', price: 250.00, image: '/perfume3.jpg', description: 'A luxurious floral scent with peony, jasmine, and a base of creamy vanilla. Soft, elegant, and timeless.', category: 'Floral' },
        { id: 4, name: 'Ocean Whisper', price: 180.00, image: '/perfume4.jpg', description: 'A fresh aquatic fragrance with sea salt, green apple, and marine accord. Perfect for a refreshing, clean vibe.', category: 'Aquatic' },
        { id: 5, name: 'Ember Glow', price: 260.00, image: '/perfume5.jpg', description: 'A spicy and woody scent with cinnamon, clove, and smoky cedarwood. Great for cozy evenings.', category: 'Spicy' },
        { id: 6, name: 'Citrus Mirage', price: 200.00, image: '/perfume6.jpg', description: 'A zesty blend of lemon, grapefruit, and mandarin, balanced with a hint of vetiver. Energizing and vibrant.', category: 'Citrus' },
        { id: 7, name: 'Mystic Rose', price: 270.00, image: '/perfume7.jpg', description: 'A romantic fragrance with Damask rose, oud, and a touch of saffron. Exotic and enchanting.', category: 'Floral' },
        { id: 8, name: 'Frosted Woods', price: 195.00, image: '/perfume8.jpg', description: 'A cool, earthy scent with pine, eucalyptus, and a whisper of mint. Perfect for winter days.', category: 'Woody' },
        { id: 9, name: 'Sunlit Garden', price: 210.00, image: '/perfume9.jpg', description: 'A cheerful floral bouquet of lavender, geranium, and orange blossom. Bright and uplifting.', category: 'Floral' },
        { id: 10, name: 'Crimson Noir', price: 280.00, image: '/perfume10.jpg', description: 'A bold and seductive fragrance with black cherry, leather, and patchouli. For the daring and confident.', category: 'Oriental' },
        { id: 11, name: 'Breeze of Bliss', price: 185.00, image: '/perfume11.jpg', description: 'A light, airy scent with white tea, pear, and a hint of musk. Simple and soothing.', category: 'Fruity' },
        { id: 12, name: 'Enchanted Orchid', price: 240.00, image: '/perfume12.jpg', description: 'A sophisticated floral with orchid, vanilla, and a touch of sandalwood. Elegant and modern.', category: 'Floral' },
        { id: 13, name: 'Sapphire Sky', price: 205.00, image: '/perfume13.jpg', description: 'A crisp, clean fragrance with blue sage, juniper, and a hint of ozone. Refreshing and invigorating.', category: 'Aquatic' },
        { id: 14, name: 'Amber Dusk', price: 265.00, image: '/perfume14.jpg', description: 'A warm, resinous scent with amber, tonka bean, and a touch of incense. Perfect for evening wear.', category: 'Oriental' },
        { id: 15, name: 'Lush Meadow', price: 215.00, image: '/perfume15.jpg', description: 'A green, earthy fragrance with fresh-cut grass, wildflowers, and a hint of citrus. Nature-inspired and revitalizing.', category: 'Green' },
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

  const removeFromCart = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setMessage('Item removed from cart!');
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
            <div className={styles.container} style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <h2 className={styles.title}>Buy Expensive Perfumes</h2>
              <div style={{ marginBottom: '40px' }}>
                <h3 style={{ color: '#ffd700', marginBottom: '20px' }}>Available Perfumes</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '20px' }}>
                  {products.map((product) => (
                    <div
                      key={product.id}
                      style={{
                        background: '#4b0082',
                        color: 'white',
                        padding: '15px',
                        borderRadius: '10px',
                        textAlign: 'center',
                        boxShadow: '0 6px 12px rgba(0,0,0,0.2)',
                        transition: 'transform 0.2s',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        style={{ width: '100%', maxWidth: '150px', height: 'auto', borderRadius: '8px', marginBottom: '10px' }}
                      />
                      <h3 style={{ margin: '0 0 8px', fontSize: '1.2em' }}>{product.name}</h3>
                      <p style={{ margin: '0 0 8px', fontSize: '1em', color: '#ffd700' }}>R {product.price.toFixed(2)}</p>
                      <p style={{ margin: '0 0 10px', fontSize: '0.9em', lineHeight: '1.3' }}>{product.description}</p>
                      <button
                        onClick={() => addToCart(product)}
                        className={styles.button}
                        style={{ padding: '8px 16px', fontSize: '0.9em' }}
                      >
                        <FaShoppingCart style={{ marginRight: '6px' }} /> Add to Cart
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ color: 'white', background: '#4b0082', padding: '20px', borderRadius: '10px', boxShadow: '0 6px 12px rgba(0,0,0,0.2)' }}>
                <h3 style={{ color: '#ffd700', marginBottom: '20px' }}>Cart ({cart.length})</h3>
                {cart.length === 0 ? (
                  <p>Cart is empty</p>
                ) : (
                  <>
                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '15px', marginBottom: '20px' }}>
                      <span style={{ fontWeight: 'bold', color: '#ffd700' }}>Item</span>
                      <span style={{ fontWeight: 'bold', color: '#ffd700' }}>Price</span>
                      <span style={{ fontWeight: 'bold', color: '#ffd700' }}>Quantity</span>
                      <span style={{ fontWeight: 'bold', color: '#ffd700' }}>Actions</span>
                      {cart.map((item, index) => (
                        <React.Fragment key={index}>
                          <span>{item.name}</span>
                          <span>R {item.price.toFixed(2)}</span>
                          <span>1</span>
                          <button
                            onClick={() => removeFromCart(index)}
                            style={{ background: '#ffd700', color: '#4b0082', padding: '5px 10px', borderRadius: '5px', border: 'none', cursor: 'pointer' }}
                          >
                            <FaTrash />
                          </button>
                        </React.Fragment>
                      ))}
                    </div>
                    <p style={{ fontSize: '1.2em', textAlign: 'right' }}>Total: R {cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)}</p>
                    <h3 style={{ color: '#ffd700', marginBottom: '15px' }}>Delivery Address</h3>
                    <input
                      value={address.street}
                      onChange={(e) => setAddress({ ...address, street: e.target.value })}
                      placeholder="Street Address"
                      className={styles.input}
                      style={{ marginBottom: '15px', padding: '12px', width: '100%' }}
                    />
                    <input
                      value={address.city}
                      onChange={(e) => setAddress({ ...address, city: e.target.value })}
                      placeholder="City"
                      className={styles.input}
                      style={{ marginBottom: '15px', padding: '12px', width: '100%' }}
                    />
                    <input
                      value={address.postalCode}
                      onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
                      placeholder="Postal Code"
                      className={styles.input}
                      style={{ marginBottom: '15px', padding: '12px', width: '100%' }}
                    />
                    <button onClick={handleCheckout} className={styles.button} style={{ padding: '12px 24px', fontSize: '1.1em', width: '100%' }}>
                      Checkout with PayFast
                    </button>
                  </>
                )}
              </div>
              {message && <p style={{ color: '#ffd700', marginTop: '20px', fontSize: '1.1em', textAlign: 'center' }}>{message}</p>}
              <button
                onClick={() => router.push('/dashboard')}
                className={styles.button}
                style={{ marginTop: '30px', padding: '12px 24px', fontSize: '1.1em', width: '100%' }}
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