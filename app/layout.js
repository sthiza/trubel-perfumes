"use client";
import { useState, useEffect, createContext, useContext } from 'react';
import Link from 'next/link';

export const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export default function RootLayout({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
    const handleLoginChange = () => {
      const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
      setIsLoggedIn(loggedIn);
    };
    window.addEventListener('loginChange', handleLoginChange);
    window.addEventListener('storage', handleLoginChange);
    return () => {
      window.removeEventListener('loginChange', handleLoginChange);
      window.removeEventListener('storage', handleLoginChange);
    };
  }, []);

  return (
    <html lang="en">
      <body>
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
          <div style={{ display: 'flex', minHeight: '100vh' }}>
            {isLoggedIn && (
              <nav style={{
                width: '16rem',
                backgroundColor: '#6b21a8',
                color: 'white',
                padding: '1rem',
                position: 'fixed',
                height: '100%',
                top: 0,
                left: 0,
                overflowY: 'auto', // Scroll if too long
              }}>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  <li style={{ margin: '1rem 0' }}><Link href="/" style={{ color: 'white', textDecoration: 'none' }}>Dashboard</Link></li>
                  <li style={{ margin: '1rem 0' }}><Link href="/buy-perfumes" style={{ color: 'white', textDecoration: 'none' }}>Buy Perfume(s)</Link></li>
                  <li style={{ margin: '1rem 0' }}><Link href="/my-orders" style={{ color: 'white', textDecoration: 'none' }}>My Orders</Link></li>
                  <li style={{ margin: '1rem 0' }}><Link href="/my-network/first-gen" style={{ color: 'white', textDecoration: 'none' }}>First Gen</Link></li>
                  <li style={{ margin: '1rem 0' }}><Link href="/my-network/gen-2" style={{ color: 'white', textDecoration: 'none' }}>Gen 2</Link></li>
                  <li style={{ margin: '1rem 0' }}><Link href="/my-network/gen-3" style={{ color: 'white', textDecoration: 'none' }}>Gen 3</Link></li>
                  <li style={{ margin: '1rem 0' }}><Link href="/my-network/gen-4" style={{ color: 'white', textDecoration: 'none' }}>Gen 4</Link></li>
                  <li style={{ margin: '1rem 0' }}><Link href="/my-network/gen-5" style={{ color: 'white', textDecoration: 'none' }}>Gen 5</Link></li>
                  <li style={{ margin: '1rem 0' }}><Link href="/my-office" style={{ color: 'white', textDecoration: 'none' }}>My Office</Link></li>
                  <li style={{ margin: '1rem 0' }}><Link href="/team-commissions" style={{ color: 'white', textDecoration: 'none' }}>Team Commissions</Link></li>
                  <li style={{ margin: '1rem 0' }}><Link href="/team-rankings" style={{ color: 'white', textDecoration: 'none' }}>Team Rankings</Link></li>
                  <li style={{ margin: '1rem 0' }}><Link href="/team-sales" style={{ color: 'white', textDecoration: 'none' }}>Team Sales</Link></li>
                  <li style={{ margin: '1rem 0' }}><Link href="/team-recruitment" style={{ color: 'white', textDecoration: 'none' }}>Team Recruitment</Link></li>
                  <li style={{ margin: '1rem 0' }}><Link href="/account-maintenance" style={{ color: 'white', textDecoration: 'none' }}>Account Maintenance</Link></li>
                  <li style={{ margin: '1rem 0' }}><Link href="/account-profile" style={{ color: 'white', textDecoration: 'none' }}>Account Profile</Link></li>
                  <li style={{ margin: '1rem 0' }}><Link href="/bank-account" style={{ color: 'white', textDecoration: 'none' }}>Bank Account</Link></li>
                  <li style={{ margin: '1rem 0' }}><Link href="/miscellaneous" style={{ color: 'white', textDecoration: 'none' }}>Miscellaneous</Link></li>
                  <li style={{ margin: '1rem 0' }}><Link href="/create-ticket" style={{ color: 'white', textDecoration: 'none' }}>Create Ticket</Link></li>
                  <li style={{ margin: '1rem 0' }}><Link href="/my-tickets" style={{ color: 'white', textDecoration: 'none' }}>My Tickets</Link></li>
                </ul>
              </nav>
            )}
            <main style={{
              flex: 1,
              marginLeft: isLoggedIn ? '16rem' : '0',
              padding: '1.5rem',
              backgroundColor: '#f3f4f6',
            }}>
              {children}
            </main>
          </div>
        </AuthContext.Provider>
      </body>
    </html>
  );
}