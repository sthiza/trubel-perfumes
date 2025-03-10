"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userName', email.split('@')[0]);
      router.push('/miscellaneous');
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ display: 'block', margin: '10px auto', padding: '5px' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ display: 'block', margin: '10px auto', padding: '5px' }}
        />
        <button type="submit" style={{ padding: '8px 16px' }}>Sign In</button>
      </form>
      <p>
        <Link href="/register">Sign Up</Link> | Recover Password
      </p>
    </div>
  );
}
