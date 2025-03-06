"use client";
import { useState, useEffect } from 'react';
import styles from './network.module.css';

export default function Gen2() {
  const [recruits, setRecruits] = useState([]);

  useEffect(() => {
    const mockRecruits = [
      { id: 3, name: 'Lerato Khumalo', joined: '2025-03-04', sales: 'R600', rank: 'Recruit' },
    ];
    setRecruits(mockRecruits);
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Generation 2 Network</h1>
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