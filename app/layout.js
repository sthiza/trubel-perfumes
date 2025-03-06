"use client";
import { useState, useEffect, createContext, useContext } from 'react';
import styles from './layout.module.css';
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

  const handleLogout = () => {
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('userName');
    localStorage.removeItem('orders'); // Optional: clear orders
    window.dispatchEvent(new Event('loginChange'));
    window.location.href = '/'; // Force reload to root
  };

  return (
    <html lang="en">
      <body>
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
          <div className={styles.appContainer}>
            {isLoggedIn && (
              <nav className={styles.sidebar}>
                <ul className={styles.navList}>
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
                  <li>
                    <button
                      onClick={handleLogout}
                      className={styles.logoutButton}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </nav>
            )}
            <main className={isLoggedIn ? styles.mainWithSidebar : styles.mainFull}>
              {children}
            </main>
          </div>
        </AuthContext.Provider>
      </body>
    </html>
  );
}