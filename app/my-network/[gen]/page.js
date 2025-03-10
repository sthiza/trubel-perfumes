"use client";
import { useState, useEffect } from 'react';
import styles from '../../dashboard.module.css';
import { getNetworkData } from '../../networkUtils';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import layoutStyles from '../../layout.module.css';

export default function NetworkGen() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('User');
  const [networkDetails, setNetworkDetails] = useState([]);
  const [isMounted, setIsMounted] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();
  const { gen } = useParams();

  useEffect(() => {
    setIsMounted(true);
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const name = localStorage.getItem('userName') || 'User';
    setIsLoggedIn(loggedIn);
    setUserName(name);
    const { networkData } = getNetworkData();
    setNetworkDetails(networkData || []);
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

  const genMap = {
    'first-gen': 'First Gen',
    'gen-2': 'Gen 2',
    'gen-3': 'Gen 3',
    'gen-4': 'Gen 4',
    'gen-5': 'Gen 5'
  };
  const displayGen = genMap[gen] || 'Unknown Generation';
  const currentGenData = networkDetails.find(g => g.gen === displayGen) || { recruits: [] };
  const totalSales = currentGenData.recruits?.reduce((sum, r) => sum + parseFloat(r.sales?.slice(1) || 0), 0) || 0;

  return (
    <>
      {isLoggedIn ? (
        <>
          <header className={`${layoutStyles.header} ${isLoggingOut ? layoutStyles.fadeOut : ''}`}>
            <h1 className={layoutStyles.headerTitle}>Trubel Perfumes</h1>
            <div className={layoutStyles.userProfile}>
              <span className={layoutStyles.userName}>{userName}</span>
              <button onClick={handleLogout} className={layoutStyles.logoutButton}>
                Logout
              </button>
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
              <h1 className={styles.title}>{displayGen} Network</h1>
              <div className={styles.details}>
                <h2 className={styles.detailsTitle}>Recruits</h2>
                <div className={styles.detailsList}>
                  {currentGenData.recruits && currentGenData.recruits.length > 0 ? (
                    currentGenData.recruits.map((recruit, index) => (
                      <div key={index} className={styles.detailItem}>
                        <p><strong>{recruit.name || 'Unknown'}</strong></p>
                        <p><strong>Joined:</strong> {recruit.joined || 'N/A'}</p>
                        <p><strong>Sales:</strong> {recruit.sales || 'R0'}</p>
                      </div>
                    ))
                  ) : (
                    <p>No recruits in this generation.</p>
                  )}
                </div>
                <p className={styles.totalSales}><strong>Total Sales:</strong> R{totalSales.toFixed(2)}</p>
              </div>
            </div>
          </main>
        </>
      ) : (
        <main className={layoutStyles.mainFull}>
          <p>Please log in to view this page.</p>
        </main>
      )}
    </>
  );
}