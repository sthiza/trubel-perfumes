"use client";
import { useState, useEffect } from 'react';
import styles from '../dashboard.module.css';
import layoutStyles from '../layout.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getNetworkData } from '../networkUtils';

export default function TeamCommissions() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('User');
  const [isSuperUser, setIsSuperUser] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [networkData, setNetworkData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const name = localStorage.getItem('userName') || 'User';
    setIsLoggedIn(loggedIn);
    setUserName(name);
    setIsSuperUser(name === 'Lwakhe Sangweni'); // Super User check
    const { networkData } = getNetworkData();
    setNetworkData(networkData || []);
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

  const calculateCommission = (sales) => {
    const amount = parseFloat(sales.slice(1) || 0);
    return (amount * 0.1).toFixed(2); // 10% commission
  };

  const exportPayslip = (recruit) => {
    const csvRows = [
      ['Name', 'Sales', 'Commission', 'Date'],
      [recruit.name, recruit.sales, `R${calculateCommission(recruit.sales)}`, recruit.joined],
    ];
    const csvContent = csvRows.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `payslip_${recruit.name}_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const exportAllPayslips = () => {
    const allRecruits = networkData.flatMap(gen => gen.recruits);
    const csvRows = [
      ['Name', 'Sales', 'Commission', 'Date'],
      ...allRecruits.map(recruit => [
        recruit.name,
        recruit.sales,
        `R${calculateCommission(recruit.sales)}`,
        recruit.joined,
      ]),
    ];
    const csvContent = csvRows.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `all_payslips_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  if (!isMounted) return null;

  return (
    <>
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
              <h1 className={styles.title}>Team Commissions</h1>
              {isSuperUser ? (
                <>
                  <button onClick={exportAllPayslips} className={styles.exportAllButton}>
                    Export All Payslips
                  </button>
                  <div className={styles.commissionList}>
                    {networkData.flatMap(gen => gen.recruits).map((recruit, index) => (
                      <div key={index} className={styles.commissionCard}>
                        <p><strong>Name:</strong> {recruit.name}</p>
                        <p><strong>Sales:</strong> {recruit.sales}</p>
                        <p><strong>Commission (10%):</strong> R{calculateCommission(recruit.sales)}</p>
                        <p><strong>Joined:</strong> {recruit.joined}</p>
                        <button
                          onClick={() => exportPayslip(recruit)}
                          className={styles.exportButton}
                        >
                          Export Payslip
                        </button>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <p className={styles.restricted}>
                  Payslip generation is restricted to the Super User. Please contact Lwakhe Sangweni for assistance.
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
    </>
  );
}