import React, { useEffect, useState } from 'react';
import { api } from '../api/api';

import Header from '../components/Header';
import FiltersBar from '../components/FiltersBar';
import SummaryCards from '../components/SummaryCards';
import EmissionsCharts from '../components/EmissionsCharts';
import EmissionsTable from '../components/EmissionsTable';
import ChatPanel from '../components/ChatPanel';

function Dashboard() {
  const [years, setYears] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedSector, setSelectedSector] = useState(null);

  const [summary, setSummary] = useState(null);
  const [trend, setTrend] = useState([]);

  const [sectorSummary, setSectorSummary] = useState(null);
  const [trendSummary, setTrendSummary] = useState(null);

  const [loadingSummary, setLoadingSummary] = useState(false);
  const [loadingTrend, setLoadingTrend] = useState(false);

  // New loading + error states
  const [loadingSectorSummary, setLoadingSectorSummary] = useState(false);
  const [errorSectorSummary, setErrorSectorSummary] = useState(null);

  const [loadingTrendSummary, setLoadingTrendSummary] = useState(false);
  const [errorTrendSummary, setErrorTrendSummary] = useState(null);

  // Fetch sector summary
  useEffect(() => {
    if (selectedYear && selectedSector) {
      setLoadingSectorSummary(true);
      setErrorSectorSummary(null);
      api.getSectorSummary(selectedYear, selectedSector)
        .then(setSectorSummary)
        .catch(() => setErrorSectorSummary('Failed to load sector summary.'))
        .finally(() => setLoadingSectorSummary(false));
    } else {
      setSectorSummary(null);
    }
  }, [selectedYear, selectedSector]);

  // Fetch trend summary
  useEffect(() => {
    if (selectedSector) {
      setLoadingTrendSummary(true);
      setErrorTrendSummary(null);
      api.getTrendSummary(selectedSector)
        .then(setTrendSummary)
        .catch(() => setErrorTrendSummary('Failed to load trend summary.'))
        .finally(() => setLoadingTrendSummary(false));
    } else {
      setTrendSummary(null);
    }
  }, [selectedSector]);

  // First load: years + sectors
  useEffect(() => {
    (async () => {
      try {
        const [yearsData, sectorsData] = await Promise.all([
          api.getYears(),
          api.getSectors(),
        ]);
        setYears(yearsData || []);
        setSectors(sectorsData || []);
      } catch (err) {
        console.error('Failed to load metadata', err);
      }
    })();
  }, []);

  // Summary by year
  useEffect(() => {
    if (selectedYear === null) {
      setSummary(null);
      return;
    }
    (async () => {
      setLoadingSummary(true);
      try {
        const data = await api.getSummary(selectedYear);
        setSummary(data);
      } catch (err) {
        console.error('Failed to load summary', err);
      } finally {
        setLoadingSummary(false);
      }
    })();
  }, [selectedYear]);

  // Trend by sector
  useEffect(() => {
    if (!selectedSector) return;
    (async () => {
      setLoadingTrend(true);
      try {
        const data = await api.getTrend(selectedSector);
        setTrend(data || []);
      } catch (err) {
        console.error('Failed to load trend', err);
      } finally {
        setLoadingTrend(false);
      }
    })();
  }, [selectedSector]);

  return (
    <div style={styles.page}>
     <Header
      userName="Guest User"
      userRole="Viewer"
      onLogout={() => {}}
    />

      <div style={styles.mainLayout}>
        {/* Left: dashboard */}
        <div style={styles.left}>
          <FiltersBar
            years={years}
            sectors={sectors}
            selectedYear={selectedYear}
            selectedSector={selectedSector}
            onYearChange={setSelectedYear}
            onSectorChange={setSelectedSector}
          />

          {loadingSummary && !summary ? (
            <div style={styles.loading}>Loading summary...</div>
          ) : (
            <SummaryCards summary={summary} selectedYear={selectedYear} />
          )}

          {/* Sector Summary card */}
          {loadingSectorSummary ? (
            <div style={cardStyle}>
              <h3 style={styles.cardTitle}>Sector Summary</h3>
              <div style={styles.skeleton}></div>
            </div>
          ) : errorSectorSummary ? (
            <div style={cardStyle}>
              <h3 style={styles.cardTitle}>Sector Summary</h3>
              <div style={styles.error}>{errorSectorSummary}</div>
            </div>
          ) : sectorSummary && (
            <div style={cardStyle}>
              <h3 style={styles.cardTitle}>Sector Summary</h3>
              <p style={styles.cardText}>{sectorSummary}</p>
            </div>
          )}

          {/* Trend Summary card */}
          {loadingTrendSummary ? (
            <div style={cardStyle}>
              <h3 style={styles.cardTitle}>Trend Summary</h3>
              <div style={styles.skeleton}></div>
            </div>
          ) : errorTrendSummary ? (
            <div style={cardStyle}>
              <h3 style={styles.cardTitle}>Trend Summary</h3>
              <div style={styles.error}>{errorTrendSummary}</div>
            </div>
          ) : trendSummary && (
            <div style={cardStyle}>
              <h3 style={styles.cardTitle}>Trend Summary</h3>
              <p style={styles.cardText}>{trendSummary}</p>
            </div>
          )}

          <EmissionsCharts
            summary={summary}
            trend={trend}
            selectedYear={selectedYear}
            selectedSector={selectedSector}
            loadingTrend={loadingTrend}
          />

          <EmissionsTable
            sectors={summary ? summary.sectors : []}
            selectedYear={selectedYear || (summary && summary.year)}
          />
        </div>

        {/* Right: chat */}
        <div style={styles.right}>
          <ChatPanel
            onYearChange={setSelectedYear}
            onSectorChange={setSelectedSector}
            trend={trend}
          />


        </div>
      </div>
    </div>
  );
}

export default Dashboard;

const styles = {
  page: {
    minHeight: '100vh',
    background: 'radial-gradient(circle at top, #0f172a 0, #020617 55%)',
    color: '#e5e7eb',
    fontFamily: 'system-ui, sans-serif',
    display: 'flex',
    flexDirection: 'column',
  },
  mainLayout: {
    flex: 1,
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 2.4fr) minmax(0, 1fr)',
    gap: 12,
    padding: 16,
  },
  left: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  right: {
    display: 'flex',
    flexDirection: 'column',
  },
  loading: {
    fontSize: 12,
    color: '#9ca3af',
  },
  cardTitle: {
    margin: '0 0 6px',
    fontSize: 13,
    fontWeight: 500,
  },
  cardText: {
    fontSize: 12,
    color: '#9ca3af',
  },
  skeleton: {
    backgroundColor: '#1e293b',
    height: 40,
    borderRadius: 8,
    marginBottom: 6,
    animation: 'pulse 1.5s infinite',
  },
  error: {
    fontSize: 12,
    color: '#f87171',
    marginTop: 4,
  },
};

const cardStyle = {
  backgroundColor: '#020617',
  borderRadius: 12,
  padding: 12,
  border: '1px solid #4b5563',
  color: '#e5e7eb',
  fontFamily: 'system-ui, sans-serif',
  marginBottom: 12,
};
