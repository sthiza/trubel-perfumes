"use client";
import { useState, useEffect } from 'react';
import styles from './network.module.css';
import { getNetworkData } from '../../networkUtils';

export default function FirstGen() {
  const [recruits, setRecruits] = useState([]);

  const updateRecruits = () => {
    const { networkData } = getNetworkData();
    const firstGen = networkData.find(gen => gen.gen === 'First Gen') || { recruits: [] };
    setRecruits(firstGen.recruits);
  };

  useEffect(() => {
    updateRecruits();
    window.addEventListener('networkChange', updateRecruits);
    return () => window.removeEventListener('networkChange', updateRecruits);
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>First Generation Network</h1>
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