import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  LineChart,
  Line,
  ResponsiveContainer,
} from 'recharts';

const COLORS = ['#3b82f6', '#f97316', '#22c55e', '#a855f7', '#eab308', '#ef4444'];

function EmissionsCharts({ summary, trend, selectedYear, selectedSector }) {
  const sectors = summary?.sectors || [];
  const hasSummary = sectors.length > 0;
  const hasTrend = trend && trend.length > 0;

  return (
    <div style={styles.grid}>
      {/* Pie chart: sector share */}
      <div style={styles.card}>
        <h3 style={styles.title}>
          Emissions Share by Sector {selectedYear ? `(${selectedYear})` : ''}
        </h3>
        {!hasSummary ? (
          <div style={styles.empty}>No data available for this year.</div>
        ) : (
          <div style={styles.chartWrapper}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sectors}
                  dataKey="emissions"
                  nameKey="sector"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {sectors.map((entry, index) => (
                    <Cell
                      key={`cell-${entry.sector}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Bar chart: emissions by sector */}
      <div style={styles.card}>
        <h3 style={styles.title}>
          Emissions by Sector {selectedYear ? `(${selectedYear})` : ''}
        </h3>
        {!hasSummary ? (
          <div style={styles.empty}>No data available for this year.</div>
        ) : (
          <div style={styles.chartWrapper}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sectors}>
                <XAxis dataKey="sector" hide />
                <YAxis />
                <Tooltip />
                <Bar dataKey="emissions">
                  {sectors.map((entry, index) => (
                    <Cell
                      key={`bar-${entry.sector}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div style={styles.xAxisLabels}>
              {sectors.map((s) => (
                <span key={s.sector} style={styles.xAxisLabel}>
                  {s.sector}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Line chart: trend for selected sector */}
      <div style={{ ...styles.card, gridColumn: '1 / -1' }}>
        <h3 style={styles.title}>
          Emissions Trend – {selectedSector || 'Select sector'}
        </h3>
        {!hasTrend ? (
          <div style={styles.empty}>No trend data available.</div>
        ) : (
          <div style={styles.chartWrapper}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trend}>
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="emissions"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    gap: 12,
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#020617',
    borderRadius: 12,
    padding: 12,
    border: '1px solid #4b5563',
    color: '#e5e7eb',
    fontFamily: 'system-ui, sans-serif',
    minHeight: 260,
    display: 'flex',
    flexDirection: 'column',
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
  chartWrapper: {
    flex: 1,
    minHeight: 200,
  },
  xAxisLabels: {
    marginTop: 6,
    display: 'flex',
    flexWrap: 'wrap',
    gap: 6,
    fontSize: 10,
    color: '#9ca3af',
  },
  xAxisLabel: {
    backgroundColor: '#020617',
    borderRadius: 999,
    padding: '2px 8px',
    border: '1px solid #111827',
  },
};

export default EmissionsCharts;