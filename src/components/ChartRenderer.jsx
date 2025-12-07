import React from 'react';
import { Line } from 'react-chartjs-2'; // or Bar, Pie depending on your needs
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

function ChartRenderer({ data }) {
  // data should be in format { labels: [...], datasets: [...] }
  if (!data) return <p>No chart data available.</p>;

  return (
    <div style={{ maxWidth: '100%', backgroundColor: '#020617', padding: 8, borderRadius: 8 }}>
      <Line data={data} options={{ responsive: true, plugins: { legend: { labels: { color: '#e5e7eb' } } } }} />
    </div>
  );
}

export default ChartRenderer;
