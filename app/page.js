"use client";
import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './styles/auth.module.css';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      router.push('/miscellaneous');
    }
  }, [router]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Trubel Perfumes</h2>
      <p>Unlock Your Scent Kingdom</p>
      <Link href="/login">
        <button className={styles.button}>Sign In</button>
      </Link>
      <Link href="/register">
        <button className={styles.button}>Sign Up</button>
      </Link>
    </div>
  );
}