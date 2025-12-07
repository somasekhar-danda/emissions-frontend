import React from 'react';

function FiltersBar({ years, sectors, selectedYear, selectedSector, onYearChange, onSectorChange }) {
  return (
    <div style={styles.row}>
      {/* Year filter */}
      <div style={styles.filterGroup}>
        <label style={styles.label}>Year</label>
        <select
          style={styles.select}
          value={selectedYear ?? ''}
          onChange={(e) => {
            const value = e.target.value;
            // Reset sector when year changes (cascading)
            onYearChange(value === '' ? null : Number(value));
            onSectorChange(null);
          }}
        >
          <option value="">All Years</option>
          {years.map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      </div>

      {/* Sector filter */}
      <div style={styles.filterGroup}>
        <label style={styles.label}>Sector</label>
        <select
          style={styles.select}
          value={selectedSector ?? ''}
          onChange={(e) => {
            const value = e.target.value;
            onSectorChange(value === '' ? null : value);
          }}
        >
          <option value="">All Sectors</option>
          {sectors.map((s) => (
            <option key={s.name} value={s.name}>{s.name}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

const styles = {
  row: { display: 'flex', gap: 12, marginBottom: 12, flexWrap: 'wrap' },
  filterGroup: { display: 'flex', flexDirection: 'column', gap: 4 },
  label: { fontSize: 11, color: '#9ca3af', fontFamily: 'system-ui, sans-serif' },
  select: {
    padding: '6px 8px',
    borderRadius: 8,
    border: '1px solid #4b5563',
    backgroundColor: '#020617',
    color: '#e5e7eb',
    fontSize: 13,
    fontFamily: 'system-ui, sans-serif',
    minWidth: 160,
  },
};

export default FiltersBar;
