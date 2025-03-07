"use client";
import { useState, useEffect } from 'react';
import styles from './network.module.css';
import { getNetworkData } from '../../networkUtils';

export default function FirstGen() {
  const [recruits, setRecruits] = useState([]);
  const [editRecruit, setEditRecruit] = useState(null);
  const [bulkEditMode, setBulkEditMode] = useState(false);
  const [selectedRecruits, setSelectedRecruits] = useState([]);
  const [bulkEdit, setBulkEdit] = useState({ sales: '', rank: '' });

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

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this recruit?')) {
      const { networkData } = getNetworkData();
      const genIndex = networkData.findIndex(gen => gen.gen === 'First Gen');
      networkData[genIndex].recruits = networkData[genIndex].recruits.filter(r => r.id !== id);
      localStorage.setItem('network', JSON.stringify(networkData));
      window.dispatchEvent(new Event('networkChange'));
    }
  };

  const handleEdit = (recruit) => {
    setEditRecruit({ ...recruit });
  };

  const handleSave = () => {
    const { networkData } = getNetworkData();
    const genIndex = networkData.findIndex(gen => gen.gen === 'First Gen');
    networkData[genIndex].recruits = networkData[genIndex].recruits.map(r =>
      r.id === editRecruit.id ? { ...editRecruit, sales: `R${parseFloat(editRecruit.sales.replace('R', '') || 0).toFixed(2)}` } : r
    );
    localStorage.setItem('network', JSON.stringify(networkData));
    window.dispatchEvent(new Event('networkChange'));
    setEditRecruit(null);
  };

  const toggleBulkEdit = () => {
    setBulkEditMode(!bulkEditMode);
    setSelectedRecruits([]);
    setBulkEdit({ sales: '', rank: '' });
  };

  const handleSelect = (id) => {
    setSelectedRecruits(prev =>
      prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]
    );
  };

  const handleBulkSave = () => {
    const { networkData } = getNetworkData();
    const genIndex = networkData.findIndex(gen => gen.gen === 'First Gen');
    networkData[genIndex].recruits = networkData[genIndex].recruits.map(r => {
      if (selectedRecruits.includes(r.id)) {
        return {
          ...r,
          sales: bulkEdit.sales ? `R${parseFloat(bulkEdit.sales || 0).toFixed(2)}` : r.sales,
          rank: bulkEdit.rank || r.rank,
        };
      }
      return r;
    });
    localStorage.setItem('network', JSON.stringify(networkData));
    window.dispatchEvent(new Event('networkChange'));
    toggleBulkEdit();
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>First Generation Network</h1>
        <button onClick={toggleBulkEdit} className={styles.bulkEditButton}>
          {bulkEditMode ? 'Cancel Bulk Edit' : 'Bulk Edit'}
        </button>
      </div>
      {recruits.length === 0 ? (
        <p className={styles.empty}>No recruits yet.</p>
      ) : (
        <>
          {bulkEditMode && (
            <div className={styles.bulkEditForm}>
              <input
                type="number"
                step="0.01"
                value={bulkEdit.sales}
                onChange={(e) => setBulkEdit({ ...bulkEdit, sales: e.target.value })}
                placeholder="New Sales (R)"
                className={styles.editInput}
              />
              <select
                value={bulkEdit.rank}
                onChange={(e) => setBulkEdit({ ...bulkEdit, rank: e.target.value })}
                className={styles.editInput}
              >
                <option value="">Keep Current Rank</option>
                <option value="Recruit">Recruit</option>
                <option value="Team Leader">Team Leader</option>
              </select>
              <button onClick={handleBulkSave} className={styles.saveButton} disabled={!selectedRecruits.length}>
                Apply to {selectedRecruits.length} Recruit(s)
              </button>
            </div>
          )}
          <div className={styles.recruitList}>
            {recruits.map((recruit) => (
              <div key={recruit.id} className={styles.recruit}>
                {bulkEditMode ? (
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={selectedRecruits.includes(recruit.id)}
                      onChange={() => handleSelect(recruit.id)}
                    />
                    <span><strong>{recruit.name}</strong> - {recruit.rank}, Sales: {recruit.sales}</span>
                  </label>
                ) : editRecruit && editRecruit.id === recruit.id ? (
                  <>
                    <input
                      type="text"
                      value={editRecruit.name}
                      onChange={(e) => setEditRecruit({ ...editRecruit, name: e.target.value })}
                      className={styles.editInput}
                    />
                    <input
                      type="date"
                      value={editRecruit.joined}
                      onChange={(e) => setEditRecruit({ ...editRecruit, joined: e.target.value })}
                      className={styles.editInput}
                    />
                    <input
                      type="text"
                      value={editRecruit.sales}
                      onChange={(e) => setEditRecruit({ ...editRecruit, sales: e.target.value })}
                      className={styles.editInput}
                    />
                    <select
                      value={editRecruit.rank}
                      onChange={(e) => setEditRecruit({ ...editRecruit, rank: e.target.value })}
                      className={styles.editInput}
                    >
                      <option value="Recruit">Recruit</option>
                      <option value="Team Leader">Team Leader</option>
                    </select>
                    <button onClick={handleSave} className={styles.saveButton}>Save</button>
                    <button onClick={() => setEditRecruit(null)} className={styles.cancelButton}>Cancel</button>
                  </>
                ) : (
                  <>
                    <p><strong>{recruit.name}</strong> - {recruit.rank}</p>
                    <p>Joined: {recruit.joined}</p>
                    <p>Sales: {recruit.sales}</p>
                    <button onClick={() => handleEdit(recruit)} className={styles.editButton}>Edit</button>
                    <button onClick={() => handleDelete(recruit.id)} className={styles.deleteButton}>Delete</button>
                  </>
                )}
              </div>
            ))}
            <p className={styles.total}>Total Sales: R{recruits.reduce((sum, r) => sum + parseFloat(r.sales.slice(1)), 0)}</p>
          </div>
        </>
      )}
    </div>
  );
}