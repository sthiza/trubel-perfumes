import { Inter } from 'next/font/google';
import { FaHome, FaShoppingCart, FaList, FaUsers, FaCog, FaTicketAlt, FaSignOutAlt } from 'react-icons/fa';
import Link from 'next/link';
import styles from './layout.module.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className={styles.container}>
          <aside className={styles.sidebar}>
            <div className={styles.sidebarHeader}>Trubel Perfumes</div>
            <nav>
              <ul className={styles.navList}>
                <li className={styles.navItem}>
                  <Link href="/" className={styles.navLink}><FaHome className="mr-2" /> Dashboard</Link>
                </li>
                <li className={styles.navItem}>
                  <Link href="/buy-perfumes" className={styles.navLink}><FaShoppingCart className="mr-2" /> Buy Perfume(s)</Link>
                </li>
                <li className={styles.navItem}>
                  <Link href="/my-orders" className={styles.navLink}><FaList className="mr-2" /> My Orders</Link>
                </li>
                <li className={styles.navDivider}>My Network</li>
                <li className={styles.navSubItem}>
                  <Link href="/my-network/first-gen" className={styles.navLink}><FaUsers className="mr-2" /> First Gen</Link>
                </li>
                <li className={styles.navSubItem}>
                  <Link href="/my-network/gen-2" className={styles.navLink}><FaUsers className="mr-2" /> Generation 2</Link>
                </li>
                <li className={styles.navSubItem}>
                  <Link href="/my-network/gen-3" className={styles.navLink}><FaUsers className="mr-2" /> Generation 3</Link>
                </li>
                <li className={styles.navSubItem}>
                  <Link href="/my-network/gen-4" className={styles.navLink}><FaUsers className="mr-2" /> Generation 4</Link>
                </li>
                <li className={styles.navSubItem}>
                  <Link href="/my-network/gen-5" className={styles.navLink}><FaUsers className="mr-2" /> Generation 5</Link>
                </li>
                <li className={styles.navDivider}>My Office</li>
                <li className={styles.navSubItem}>
                  <Link href="/my-office/team-commissions" className={styles.navLink}><FaCog className="mr-2" /> Team Commissions</Link>
                </li>
                <li className={styles.navSubItem}>
                  <Link href="/my-office/team-rankings" className={styles.navLink}><FaCog className="mr-2" /> Team Rankings</Link>
                </li>
                <li className={styles.navSubItem}>
                  <Link href="/my-office/team-sales" className={styles.navLink}><FaCog className="mr-2" /> Team Sales</Link>
                </li>
                <li className={styles.navSubItem}>
                  <Link href="/my-office/team-recruitment" className={styles.navLink}><FaCog className="mr-2" /> Team Recruitment</Link>
                </li>
                <li className={styles.navDivider}>Account Maintenance</li>
                <li className={styles.navSubItem}>
                  <Link href="/account/profile" className={styles.navLink}><FaCog className="mr-2" /> Account Profile</Link>
                </li>
                <li className={styles.navSubItem}>
                  <Link href="/account/bank-account" className={styles.navLink}><FaCog className="mr-2" /> Bank Account</Link>
                </li>
                <li className={styles.navDivider}>Miscellaneous</li>
                <li className={styles.navSubItem}>
                  <Link href="/misc/create-ticket" className={styles.navLink}><FaTicketAlt className="mr-2" /> Create Ticket</Link>
                </li>
                <li className={styles.navSubItem}>
                  <Link href="/misc/my-tickets" className={styles.navLink}><FaTicketAlt className="mr-2" /> My Tickets</Link>
                </li>
                <li className={styles.navItem}>
                  <Link href="/signout" className={styles.navLink}><FaSignOutAlt className="mr-2" /> Signout</Link>
                </li>
              </ul>
            </nav>
          </aside>
          <main className={styles.main}>
            {children}
            <footer className={styles.footer}>Trubel Perfumes (Pty) Ltd © 2025</footer>
          </main>
        </div>
      </body>
    </html>
  );
}