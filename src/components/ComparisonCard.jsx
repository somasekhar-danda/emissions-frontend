import React, { useEffect, useState } from 'react';
import { api } from '../api/api';

function ComparisonCard({ year, sectorA, sectorB }) {
  const [comparison, setComparison] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!year || !sectorA || !sectorB) {
      setComparison(null);
      return;
    }

    (async () => {
      setLoading(true);
      try {
        const data = await api.compareSectors(year, sectorA, sectorB);
        setComparison(data);
      } catch (err) {
        console.error('Failed to load comparison', err);
        setComparison('Error fetching comparison data.');
      } finally {
        setLoading(false);
      }
    })();
  }, [year, sectorA, sectorB]);

  if (!year || !sectorA || !sectorB) {
    return null; // don’t render if inputs missing
  }

  return (
    <div style={styles.card}>
      <h3 style={styles.title}>
        Comparison: {sectorA} vs {sectorB} ({year})
      </h3>
      {loading ? (
        <div style={styles.loading}>Loading comparison...</div>
      ) : (
        <p style={styles.text}>{comparison}</p>
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
    margin: '0 0 6px',
    fontSize: 13,
    fontWeight: 500,
  },
  loading: {
    fontSize: 12,
    color: '#9ca3af',
  },
  text: {
    fontSize: 12,
    color: '#9ca3af',
  },
};

export default ComparisonCard;
