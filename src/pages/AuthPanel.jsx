import React, { useState } from 'react';
import { api } from '../api/api';

function AuthPanel({ onAuthSuccess }) {
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let res;
      if (mode === 'login') {
        res = await api.login(email, password);
      } else {
        res = await api.register(fullName, email, password);
      }
      onAuthSuccess(res);
    } catch (err) {
      console.error(err);
      setError('Authentication failed. Please check your details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Emissions Insight Dashboard</h1>
        <p style={styles.subtitle}>
          Stride Labs: HackForward 2025 – Secure Access
        </p>

        <div style={styles.toggleRow}>
          <button
            type="button"
            onClick={() => setMode('login')}
            style={{
              ...styles.toggleBtn,
              ...(mode === 'login' ? styles.toggleActive : {}),
            }}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => setMode('register')}
            style={{
              ...styles.toggleBtn,
              ...(mode === 'register' ? styles.toggleActive : {}),
            }}
          >
            Register
          </button>
        </div>

        <form onSubmit={submit}>
          {mode === 'register' && (
            <div style={styles.formGroup}>
              <label style={styles.label}>Full Name</label>
              <input
                style={styles.input}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
          )}

          <div style={styles.formGroup}>
            <label style={styles.label}>Email</label>
            <input
              style={styles.input}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Password</label>
            <input
              style={styles.input}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <div style={styles.error}>{error}</div>}

          <button
            type="submit"
            style={styles.primaryBtn}
            disabled={loading}
          >
            {loading
              ? 'Please wait...'
              : mode === 'login'
              ? 'Login'
              : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AuthPanel;

const styles = {
  page: {
    minHeight: '100vh',
    background:
      'radial-gradient(circle at top, #1d4ed8 0, #020617 55%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    fontFamily: 'system-ui, sans-serif',
    color: '#e5e7eb',
  },
  card: {
    backgroundColor: '#020617',
    padding: 24,
    borderRadius: 16,
    border: '1px solid #4b5563',
    width: '100%',
    maxWidth: 420,
    boxShadow: '0 25px 50px -12px rgba(15,23,42,0.9)',
  },
  title: { margin: 0, fontSize: 22, fontWeight: 600 },
  subtitle: { margin: '4px 0 16px', fontSize: 12, color: '#9ca3af' },
  toggleRow: { display: 'flex', gap: 8, marginBottom: 16 },
  toggleBtn: {
    flex: 1,
    padding: '6px 10px',
    borderRadius: 999,
    border: '1px solid #4b5563',
    background: 'transparent',
    color: '#e5e7eb',
    cursor: 'pointer',
    fontSize: 13,
  },
  toggleActive: {
    background: '#3b82f6',
    borderColor: '#3b82f6',
  },
  formGroup: { marginBottom: 10, display: 'flex', flexDirection: 'column' },
  label: { fontSize: 12, marginBottom: 4, color: '#9ca3af' },
  input: {
    padding: '6px 8px',
    borderRadius: 8,
    border: '1px solid #4b5563',
    background: '#020617',
    color: '#e5e7eb',
    fontSize: 13,
  },
  primaryBtn: {
    width: '100%',
    marginTop: 8,
    padding: '8px 12px',
    borderRadius: 999,
    border: 'none',
    background: '#3b82f6',
    color: '#fff',
    fontWeight: 600,
    cursor: 'pointer',
    fontSize: 14,
  },
  error: { fontSize: 12, color: '#f97316', marginBottom: 8 },
};