import styles from './layout.module.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Trubel Perfumes</title>
      </head>
      <body className={styles.body}>
        <div className={styles.appContainer}>
          {children}
        </div>
      </body>
    </html>
  );
}