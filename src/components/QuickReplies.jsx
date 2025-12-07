function QuickReplies({ options, onClick }) {
  return (
    <div style={styles.quickReplies}>
      {options.map(opt => (
        <button key={opt} style={styles.chip} onClick={() => onClick(opt)}>
          {opt}
        </button>
      ))}
    </div>
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

export default QuickReplies;