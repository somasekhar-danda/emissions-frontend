function TableRenderer({ data }) {
  return (
    <table style={styles.table}>
      <thead>
        <tr>
          {data.headers.map(h => <th key={h}>{h}</th>)}
        </tr>
      </thead>
      <tbody>
        {data.rows.map((row, i) => (
          <tr key={i}>
            {row.map((cell, j) => <td key={j}>{cell}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  );
}



const styles = {
  text: { fontSize: 13, color: '#e5e7eb' },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: 12,
    color: '#e5e7eb',
  },
  quickReplies: { display: 'flex', gap: 8, marginTop: 6 },
  chip: {
    backgroundColor: '#1e293b',
    border: '1px solid #4b5563',
    borderRadius: 16,
    padding: '4px 10px',
    fontSize: 12,
    color: '#e5e7eb',
    cursor: 'pointer',
  },
};
export default TableRenderer;