// const API_BASE_URL =
//   (typeof import.meta !== 'undefined' &&
//     import.meta.env &&
//     import.meta.env.VITE_API_BASE_URL) ||
//   process.env.REACT_APP_API_BASE_URL ||
//   'http://localhost:8080';

const API_BASE_URL = 'https://emissions-backend-production.up.railway.app';

// Generic fetch helper
async function request(path, options = {}) {
  const headers = options.headers ? { ...options.headers } : {};

  // JSON body header
  if (options.body && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }

  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || res.statusText);
  }

  if (res.status === 204) return null;
  return res.json();
}

export const api = {
  // ---- Emissions Endpoints ----

  getYears() {
    return request('/api/emissions/years');
  },

  getSectors() {
    return request('/api/emissions/sectors');
  },

  getSummary(year) {
    return request(`/api/emissions/summary?year=${year}`);
  },

  getTrend(sector) {
    return request(`/api/emissions/trend?sector=${encodeURIComponent(sector)}`);
  },

  getSectorSummary(year, sector) {
    return request(
      `/api/emissions/sectorSummary?year=${year}&sector=${encodeURIComponent(sector)}`
    );
  },

  compareSectors(year, sectorA, sectorB) {
    return request(
      `/api/emissions/compare?year=${year}&sectorA=${encodeURIComponent(
        sectorA
      )}&sectorB=${encodeURIComponent(sectorB)}`
    );
  },

  getTrendSummary(sector) {
    return request(
      `/api/emissions/trendSummary?sector=${encodeURIComponent(sector)}`
    );
  },

  // ---- Chat ----
  chat(message) {
    return request('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ message }),
    });
  },
};