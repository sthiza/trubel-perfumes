"use client";
import { useState, useEffect } from 'react';
import styles from './network.module.css';

export default function Gen4() {
  const [recruits, setRecruits] = useState([]);

  useEffect(() => {
    const mockRecruits = [
      { id: 6, name: 'Zandi Mbatha', joined: '2025-03-07', sales: 'R200', rank: 'Recruit' },
    ];
    setRecruits(mockRecruits);
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Generation 4 Network</h1>
      {recruits.length === 0 ? (
        <p className={styles.empty}>No recruits yet.</p>
      ) : (
        <div className={styles.recruitList}>
          {recruits.map((recruit) => (
            <div key={recruit.id} className={styles.recruit}>
              <p><strong>{recruit.name}</strong> - {recruit.rank}</p>
              <p>Joined: {recruit.joined}</p>
              <p>Sales: {recruit.sales}</p>
            </div>
          ))}
          <p className={styles.total}>Total Sales: R{recruits.reduce((sum, r) => sum + parseFloat(r.sales.slice(1)), 0)}</p>
        </div>
      )}
    </div>
  );
}