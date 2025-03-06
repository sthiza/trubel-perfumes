"use client";
import { useState } from 'react';
import Image from 'next/image';
import styles from './buyPerfumes.module.css';
import { useRouter } from 'next/navigation';

const perfumes = [
  { id: 1, name: 'Perfume 1', price: 'R150', image: '/Perfume1.jpg' },
  { id: 2, name: 'Perfume 2', price: 'R200', image: '/Perfume2.jpg' },
  { id: 3, name: 'Perfume 3', price: 'R180', image: '/Perfume3.jpg' },
];

export default function BuyPerfumes() {
  const [cart, setCart] = useState([]);
  const router = useRouter();

  const addToCart = (perfume) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === perfume.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === perfume.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...perfume, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('Your cart is empty—add some perfumes first!');
      return;
    }
    const total = cart.reduce((sum, item) => sum + parseFloat(item.price.slice(1)) * item.quantity, 0).toFixed(2);
    const order = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      items: cart.map((item) => `${item.name} x ${item.quantity}`),
      total: `R${total}`,
      status: 'Pending'
    };
    const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    localStorage.setItem('orders', JSON.stringify([...existingOrders, order]));
    alert(`Checkout successful! Total: R${total}. Thanks for shopping!`);
    setCart([]);
    router.push('/my-orders');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Buy Perfumes</h1>
      <div className={styles.grid}>
        {perfumes.map((perfume) => (
          <div key={perfume.id} className={styles.card}>
            <Image
              src={perfume.image}
              alt={perfume.name}
              width={300}
              height={200}
              className={styles.productImage}
            />
            <h2 className={styles.cardTitle}>{perfume.name}</h2>
            <p className={styles.cardPrice}>{perfume.price}</p>
            <button
              onClick={() => addToCart(perfume)}
              className={styles.addButton}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      <h2 className={styles.cartTitle}>My Cart</h2>
      {cart.length === 0 ? (
        <p className={styles.emptyCart}>Your cart is empty.</p>
      ) : (
        <div className={styles.cart}>
          {cart.map((item) => (
            <div key={item.id} className={styles.cartItem}>
              <span>{item.name} - {item.price} x {item.quantity}</span>
              <button
                onClick={() => removeFromCart(item.id)}
                className={styles.removeButton}
              >
                Remove
              </button>
            </div>
          ))}
          <p className={styles.cartTotal}>
            Total: R{cart.reduce((sum, item) => sum + parseFloat(item.price.slice(1)) * item.quantity, 0).toFixed(2)}
          </p>
          <button
            onClick={handleCheckout}
            className={styles.checkoutButton}
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}