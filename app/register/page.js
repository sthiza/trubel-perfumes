"use client";
import { useState, useEffect } from 'react'; // Added useEffect
import styles from './register.module.css';
import { useRouter } from 'next/navigation';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registered, setRegistered] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Clear login state on initial load of register page
    localStorage.setItem('isLoggedIn', 'false');
    window.dispatchEvent(new Event('loginChange'));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Payment of R99 processed for ${name} (${email})`);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userName', name);
    window.dispatchEvent(new Event('loginChange'));
    setRegistered(true);
    setTimeout(() => router.push('/'), 1500);
  };

  if (registered) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Welcome, {name}!</h1>
        <p>You’re now an IBO—redirecting to Dashboard...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Register as an IBO</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.input}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
          required
        />
        <button type="submit" className={styles.button}>Pay R99 & Register</button>
      </form>
    </div>
  );
}