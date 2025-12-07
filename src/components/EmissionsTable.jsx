import React from 'react';

function EmissionsTable({ sectors, selectedYear }) {
  const hasData = sectors && sectors.length > 0;

  return (
    <div style={styles.card}>
      <h3 style={styles.title}>
        Sector-wise Emissions {selectedYear ? `(${selectedYear})` : ''}
      </h3>

      {!hasData ? (
        <div style={styles.empty}>No data available.</div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Sector</th>
                <th style={styles.th}>Emissions (Gt CO₂e)</th>
                <th style={styles.th}>Share (%)</th>
              </tr>
            </thead>
            <tbody>
              {sectors.map((row) => (
                <tr key={row.sector}>
                  <td style={styles.td}>{row.sector}</td>
                  <td style={styles.td}>{row.emissions.toFixed(2)}</td>
                  <td style={styles.td}>{row.percentage.toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: '#020617',
    borderRadius: 12,
    padding: 12,
    border: '1px solid #4b5563',
    color: '#e5e7eb',
    fontFamily: 'system-ui, sans-serif',
    marginBottom: 12,
  },
  title: {
    margin: '0 0 8px',
    fontSize: 13,
    fontWeight: 500,
  },
  empty: {
    fontSize: 12,
    color: '#9ca3af',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: 12,
  },
  th: {
    textAlign: 'left',
    borderBottom: '1px solid #4b5563',
    padding: '4px 6px',
    fontWeight: 500,
  },
  td: {
    padding: '4px 6px',
    borderBottom: '1px solid #111827',
  },
};

export default EmissionsTable;