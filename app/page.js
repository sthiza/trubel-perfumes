"use client";
import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './styles/auth.module.css';
import { FaCrown } from 'react-icons/fa';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      router.push('/dashboard');
    }
  }, [router]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        <FaCrown className={styles.icon} /> Trubel Perfumes
      </h2>
      <p style={{ fontSize: '18px', marginBottom: '20px' }}>
        Unlock Your Scent Kingdom
      </p>
      <Link href="/login">
        <button className={styles.button}>Sign In</button>
      </Link>
      <Link href="/register">
        <button className={styles.button}>Sign Up</button>
      </Link>
    </div>
  );
}