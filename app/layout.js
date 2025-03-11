import { Montserrat } from 'next/font/google';
import styles from './layout.module.css';
import './globals.css';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '700'] });

export const metadata = {
  title: 'Trubel Perfumes',
  description: 'Unlock Your Scent Kingdom',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} ${styles.body}`}>
        <div className={styles.appContainer}>
          {children}
        </div>
      </body>
    </html>
  );
}