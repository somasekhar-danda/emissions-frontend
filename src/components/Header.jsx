import React from 'react';

function Header({ userName, userRole, onLogout }) {
  return (
    <header style={styles.navbar}>
      <div>
        <div style={styles.title}>Emissions Insight Dashboard</div>
        <div style={styles.subtitle}>Stride Labs: HackForward 2025</div>
      </div>

      <div style={styles.right}>
        <div style={styles.userInfo}>
          <div style={styles.userName}>{userName}</div>
          <div style={styles.userRole}>{userRole}</div>
        </div>
        <button style={styles.logoutBtn} onClick={onLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}

const styles = {
  navbar: {
    padding: '10px 16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#020617',
    borderBottom: '1px solid #4b5563',
    color: '#e5e7eb',
    fontFamily: 'system-ui, sans-serif',
    position: 'sticky',
    top: 0,
    zIndex: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 600,
  },
  subtitle: {
    fontSize: 11,
    color: '#9ca3af',
    marginTop: 2,
  },
  right: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  userInfo: {
    textAlign: 'right',
  },
  userName: {
    fontSize: 13,
  },
  userRole: {
    fontSize: 11,
    color: '#9ca3af',
  },
  logoutBtn: {
    padding: '6px 10px',
    borderRadius: 999,
    border: '1px solid #4b5563',
    background: 'transparent',
    color: '#e5e7eb',
    cursor: 'pointer',
    fontSize: 12,
  },
};

export default Header;