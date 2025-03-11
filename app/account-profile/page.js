"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../styles/auth.module.css';
import { FaUser, FaBox, FaMoneyBillWave, FaUsers, FaLock } from 'react-icons/fa';

export default function AccountProfile() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('User');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [gender, setGender] = useState('');
  const [unit, setUnit] = useState('');
  const [street, setStreet] = useState('');
  const [suburb, setSuburb] = useState('');
  const [town, setTown] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [orders, setOrders] = useState(0);
  const [sales, setSales] = useState(0);
  const [network, setNetwork] = useState(0);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const name = localStorage.getItem('userName') || 'User';
    const storedEmail = localStorage.getItem('email') || '';
    const storedFirstName = localStorage.getItem('firstName') || '';
    const storedLastName = localStorage.getItem('lastName') || '';
    const storedPhone = localStorage.getItem('phone') || '';
    const storedId = localStorage.getItem('idNumber') || '';
    const storedGender = localStorage.getItem('gender') || '';
    const storedUnit = localStorage.getItem('unit') || '';
    const storedStreet = localStorage.getItem('street') || '';
    const storedSuburb = localStorage.getItem('suburb') || '';
    const storedTown = localStorage.getItem('town') || '';
    const storedPostal = localStorage.getItem('postalCode') || '';
    const storedOrders = parseInt(localStorage.getItem('orders')) || 0;
    const storedSales = parseInt(localStorage.getItem('sales')) || 0;
    const storedNetwork = parseInt(localStorage.getItem('network')) || 0;
    setIsLoggedIn(loggedIn);
    setUserName(name);
    setFirstName(storedFirstName);
    setLastName(storedLastName);
    setEmail(storedEmail);
    setPhone(storedPhone);
    setIdNumber(storedId);
    setGender(storedGender);
    setUnit(storedUnit);
    setStreet(storedStreet);
    setSuburb(storedSuburb);
    setTown(storedTown);
    setPostalCode(storedPostal);
    setOrders(storedOrders);
    setSales(storedSales);
    setNetwork(storedNetwork);
    if (!loggedIn) router.push('/login');
  }, [router]);

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem('firstName', firstName);
    localStorage.setItem('lastName', lastName);
    localStorage.setItem('email', email);
    localStorage.setItem('phone', phone);
    localStorage.setItem('idNumber', idNumber);
    localStorage.setItem('gender', gender);
    localStorage.setItem('unit', unit);
    localStorage.setItem('street', street);
    localStorage.setItem('suburb', suburb);
    localStorage.setItem('town', town);
    localStorage.setItem('postalCode', postalCode);
    setMessage('Profile updated successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (newPassword && newPassword === confirmPassword) {
      setMessage('Password updated successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setMessage(''), 3000);
    } else {
      setMessage('New password and confirmation must match!');
    }
  };

  if (!isMounted) return null;

  return (
    <div className={styles.container}>
      {isLoggedIn ? (
        <>
          <h2 className={styles.title}>
            <FaUser className={styles.icon} /> {userName}’s Profile
          </h2>
          <p style={{ color: '#ffd700', marginBottom: '20px' }}>
            Note: Your link will not work until you pay the business starter fee of R99
          </p>
          <form onSubmit={handleSave}>
            <h3 style={{ color: '#ffd700', marginBottom: '15px' }}>Profile Information</h3>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className={styles.input}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
            />
            <input
              type="tel"
              placeholder="Phone (+27)"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={styles.input}
            />
            <input
              type="text"
              placeholder="ID or Passport Number"
              value={idNumber}
              onChange={(e) => setIdNumber(e.target.value)}
              className={styles.input}
            />
            <div style={{ margin: '15px 0', color: 'white' }}>
              <label style={{ marginRight: '20px' }}>
                <input
                  type="radio"
                  value="Male"
                  checked={gender === 'Male'}
                  onChange={(e) => setGender(e.target.value)}
                /> Male
              </label>
              <label>
                <input
                  type="radio"
                  value="Female"
                  checked={gender === 'Female'}
                  onChange={(e) => setGender(e.target.value)}
                /> Female
              </label>
            </div>
            <h3 style={{ color: '#ffd700', marginBottom: '15px' }}>Billing Details</h3>
            <input
              type="text"
              placeholder="Unit or House No"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Street Address"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Suburb"
              value={suburb}
              onChange={(e) => setSuburb(e.target.value)}
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Town"
              value={town}
              onChange={(e) => setTown(e.target.value)}
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Postal Code"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              className={styles.input}
            />
            <button type="submit" className={styles.button}>Save Profile</button>
          </form>
          <form onSubmit={handlePasswordChange} style={{ marginTop: '20px' }}>
            <h3 style={{ color: '#ffd700', marginBottom: '15px' }}>Manage Password</h3>
            <div style={{ position: 'relative' }}>
              <FaLock className={styles.icon} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="password"
                placeholder="Current Password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className={styles.input}
                style={{ paddingLeft: '30px' }}
              />
            </div>
            <div style={{ position: 'relative' }}>
              <FaLock className={styles.icon} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className={styles.input}
                style={{ paddingLeft: '30px' }}
              />
            </div>
            <div style={{ position: 'relative' }}>
              <FaLock className={styles.icon} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="password"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={styles.input}
                style={{ paddingLeft: '30px' }}
              />
            </div>
            <button type="submit" className={styles.button}>Update Password</button>
          </form>
          {message && <p style={{ color: '#ffd700', marginTop: '15px' }}>{message}</p>}
          <button
            onClick={() => router.push('/dashboard')}
            className={styles.button}
            style={{ marginTop: '20px' }}
          >
            Back to Dashboard
          </button>
          <div style={{ marginTop: '20px', color: 'white' }}>
            <h3>Stats</h3>
            <p><FaBox style={{ marginRight: '10px' }} /> Orders: {orders} Pending</p>
            <p><FaMoneyBillWave style={{ marginRight: '10px' }} /> Team Sales: R {sales}</p>
            <p><FaUsers style={{ marginRight: '10px' }} /> Network Size: {network} Members</p>
          </div>
        </>
      ) : (
        <p style={{ color: '#ffd700' }}>Redirecting to login...</p>
      )}
    </div>
  );
}