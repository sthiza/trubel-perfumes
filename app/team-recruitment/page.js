"use client";
import { useState } from 'react';
import styles from './recruitment.module.css';
import { getNetworkData } from '../networkUtils';

export default function TeamRecruitment() {
  const [form, setForm] = useState({ name: '', joined: '', sales: '', rank: 'Recruit', gen: 'First Gen' });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { networkData } = getNetworkData();
    const newRecruit = {
      id: Date.now(),
      name: form.name,
      joined: form.joined || new Date().toISOString().split('T')[0],
      sales: `R${parseFloat(form.sales || 0).toFixed(2)}`,
      rank: form.rank,
    };
    const genIndex = networkData.findIndex(g => g.gen === form.gen);
    if (genIndex !== -1) {
      networkData[genIndex].recruits.push(newRecruit);
    } else {
      networkData.push({ gen: form.gen, recruits: [newRecruit] });
    }
    localStorage.setItem('network', JSON.stringify(networkData));
    window.dispatchEvent(new Event('networkChange')); // Trigger update
    setForm({ name: '', joined: '', sales: '', rank: 'Recruit', gen: 'First Gen' });
    alert('Recruit added!');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Add New Recruit</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>
          Name:
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={styles.input}
            required
          />
        </label>
        <label className={styles.label}>
          Joined Date:
          <input
            type="date"
            value={form.joined}
            onChange={(e) => setForm({ ...form, joined: e.target.value })}
            className={styles.input}
          />
        </label>
        <label className={styles.label}>
          Sales (R):
          <input
            type="number"
            step="0.01"
            value={form.sales}
            onChange={(e) => setForm({ ...form, sales: e.target.value })}
            className={styles.input}
          />
        </label>
        <label className={styles.label}>
          Rank:
          <select
            value={form.rank}
            onChange={(e) => setForm({ ...form, rank: e.target.value })}
            className={styles.input}
          >
            <option value="Recruit">Recruit</option>
            <option value="Team Leader">Team Leader</option>
          </select>
        </label>
        <label className={styles.label}>
          Generation:
          <select
            value={form.gen}
            onChange={(e) => setForm({ ...form, gen: e.target.value })}
            className={styles.input}
          >
            <option value="First Gen">First Gen</option>
            <option value="Gen 2">Gen 2</option>
            <option value="Gen 3">Gen 3</option>
            <option value="Gen 4">Gen 4</option>
            <option value="Gen 5">Gen 5</option>
          </select>
        </label>
        <button type="submit" className={styles.submitButton}>Add Recruit</button>
      </form>
    </div>
  );
}