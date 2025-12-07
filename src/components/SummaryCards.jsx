import React from 'react';

function SummaryCards({ summary, selectedYear }) {
  if (!summary) {
    // You can also show skeletons here if you want
    return null;
  }

  const total = summary.totalEmissions || 0;
  const sectors = summary.sectors || [];
  const sectorsCount = sectors.length;

  const topSector =
    sectorsCount > 0
      ? sectors.reduce((max, s) =>
          s.emissions > max.emissions ? s : max
        )
      : null;

  const avgPerSector = sectorsCount > 0 ? total / sectorsCount : 0;

  return (
    <div style={styles.row}>
      {/* Total Emissions */}
      <div style={styles.card}>
        <h3 style={styles.title}>Total Emissions</h3>
        <div style={styles.metric}>
          {total.toFixed(2)} <span style={styles.unit}>Gt CO₂e</span>
        </div>
        <div style={styles.caption}>
          Global emissions in {selectedYear || summary.year}
        </div>
      </div>

      {/* Top Sector */}
      <div style={styles.card}>
        <h3 style={styles.title}>Top Emitting Sector</h3>
        <div style={styles.metric}>
          {topSector ? topSector.sector : '--'}
        </div>
        <div style={styles.caption}>
          {topSector
            ? `${topSector.emissions.toFixed(2)} Gt CO₂e (${topSector.percentage.toFixed(
                1
              )}%)`
            : 'No data available'}
        </div>
      </div>

      {/* Sectors Count */}
      <div style={styles.card}>
        <h3 style={styles.title}>Number of Sectors</h3>
        <div style={styles.metric}>{sectorsCount}</div>
        <div style={styles.caption}>In the selected dataset</div>
      </div>

      {/* Average per Sector */}
      <div style={styles.card}>
        <h3 style={styles.title}>Avg Emissions / Sector</h3>
        <div style={styles.metric}>
          {avgPerSector.toFixed(2)} <span style={styles.unit}>Gt CO₂e</span>
        </div>
        <div style={styles.caption}>
          Simple average across all sectors for {selectedYear || summary.year}
        </div>
      </div>
    </div>
  );
}

const styles = {
  row: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 12,
  },
  card: {
    flex: '1 1 200px',
    backgroundColor: '#020617',
    borderRadius: 12,
    padding: 12,
    border: '1px solid #4b5563',
    color: '#e5e7eb',
    fontFamily: 'system-ui, sans-serif',
  },
  title: {
    margin: '0 0 6px',
    fontSize: 13,
    color: '#e5e7eb',
  },
  metric: {
    fontSize: 18,
    fontWeight: 600,
    display: 'flex',
    alignItems: 'baseline',
    gap: 4,
  },
  unit: {
    fontSize: 11,
    color: '#9ca3af',
  },
  caption: {
    marginTop: 4,
    fontSize: 11,
    color: '#9ca3af',
  },
};

export default SummaryCards;