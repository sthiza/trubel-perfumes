"use client";
import { useState, useEffect } from 'react';
import styles from '../dashboard.module.css';
import layoutStyles from '../layout.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getNetworkData } from '../networkUtils';

export default function TeamRankings() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('User');
  const [isSuperUser, setIsSuperUser] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [rankings, setRankings] = useState([]);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const name = localStorage.getItem('userName') || 'User';
    setIsLoggedIn(loggedIn);
    setUserName(name);
    setIsSuperUser(name === 'Lwakhe Sangweni');
    const { networkData } = getNetworkData();
    const allRecruits = networkData.flatMap(gen => gen.recruits);
    const sorted = allRecruits
      .map(r => ({ ...r, salesNum: parseFloat(r.sales.slice(1) || 0) }))
      .sort((a, b) => b.salesNum - a.salesNum)
      .slice(0, 10); // Top 10
    setRankings(sorted);
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
              <h1 className={styles.title}>Team Rankings</h1>
              {isSuperUser ? (
                <div className={styles.section}>
                  <h2>Top 10 Recruits by Sales</h2>
                  <ul>
                    {rankings.map((r, i) => (
                      <li key={i}>
                        {i + 1}. {r.name} - {r.sales} (Joined: {r.joined})
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className={styles.restricted}>
                  Rankings are restricted to Super User. Contact Lwakhe Sangweni for access.
                </p>
              )}
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