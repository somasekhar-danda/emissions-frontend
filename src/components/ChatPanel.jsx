import React, { useState } from 'react';
import TableRenderer from './TableRenderer';
import ChartRenderer from './ChartRenderer';
import QuickReplies from './QuickReplies';
import { api } from '../api/api';

// helper: extract year + sector from text
function extractQuickReplies(text) {
  const yearMatch = text.match(/\b\d{4}\b/);
  const sectorMatch = text.match(/industry|transport|energy|agriculture/i);

  const year = yearMatch ? yearMatch[0] : null;
  const sector = sectorMatch ? sectorMatch[0] : null;

  const options = [];
  if (year) {
    options.push(`Show Transport in ${year}`);
    options.push(`Show Industry in ${year}`);
  }
  if (sector) {
    options.push(`Show ${sector} trend`);
  }
  return options;
}

function ChatPanel({ onYearChange, onSectorChange }) {
  const [messages, setMessages] = useState([
    {
      from: 'bot',
      text: 'Hi! Ask me about emissions by sector or global trends.',
      source: 'system',
      type: 'text',
    },
  ]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);

  const handleQuickReply = async (option) => {
    const yearMatch = option.match(/\b\d{4}\b/);
    const sectorMatch = option.match(/Show ([A-Za-z &]+)/i);

    if (yearMatch && onYearChange) onYearChange(Number(yearMatch[0]));
    if (sectorMatch && onSectorChange) onSectorChange(sectorMatch[1].trim());

    setInput(option);
    await handleSend({ preventDefault: () => {} }, option);
  };

  const handleSend = async (e, overrideInput) => {
    if (e) e.preventDefault();
    const trimmed = (overrideInput ?? input).trim();
    if (!trimmed) return;

    const userMsg = { from: 'user', text: trimmed, type: 'text' };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setSending(true);

    try {
      const res = await api.chat(trimmed);

      // generate quick replies from both user input and answer
      const options =
        extractQuickReplies(res.answer || '') || extractQuickReplies(trimmed);

      const botMsg = {
        from: 'bot',
        text: res.answer || 'No answer available.',
        source: res.source,
        link: res.link,
        type: options.length ? 'quickReplies' : 'text',
        data: res.data,
        options,
        isError: res.answer?.toLowerCase().includes('could not fetch'),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error('Chat error', err);
      setMessages((prev) => [
        ...prev,
        {
          from: 'bot',
          text: 'Sorry, something went wrong while processing your question.',
          source: 'error',
          type: 'text',
          isError: true,
        },
      ]);
    } finally {
      setSending(false);
    }
  };

  const renderMessage = (msg) => {
    switch (msg.type) {
      case 'table':
        return <TableRenderer data={msg.data} />;
      case 'chart':
        return (
          <div>
            <p style={styles.text}>{msg.text}</p>
            <ChartRenderer data={msg.data} />
          </div>
        );
      case 'quickReplies':
        return (
          <div>
            <p
              style={{
                ...styles.text,
                color: msg.isError ? '#f87171' : styles.text.color,
              }}
            >
              {msg.text}
            </p>
            <QuickReplies options={msg.options} onClick={handleQuickReply} />
          </div>
        );
      default:
        return (
          <p
            style={{
              ...styles.text,
              color: msg.isError ? '#f87171' : styles.text.color,
            }}
          >
            {msg.text}
          </p>
        );
    }
  };

  return (
    <div style={styles.card}>
      <h3 style={styles.title}>Emissions Assistant</h3>
      <p style={styles.subtitle}>
        I use both the dashboard dataset and internet sources to answer your
        questions.
      </p>

      <div style={styles.messages}>
        {messages.map((m, idx) => (
          <div
            key={idx}
            style={{
              ...styles.msgRow,
              justifyContent: m.from === 'user' ? 'flex-end' : 'flex-start',
            }}
          >
            <div
              style={{
                ...styles.bubble,
                ...(m.from === 'user' ? styles.bubbleUser : styles.bubbleBot),
              }}
            >
              {renderMessage(m)}
              {m.link && (
                <a
                  href={m.link}
                  target="_blank"
                  rel="noreferrer"
                  style={styles.link}
                >
                  View source
                </a>
              )}
              {m.source && m.source !== 'system' && (
                <div style={styles.tag}>
                  {m.source === 'local-data'
                    ? 'Dataset'
                    : m.source === 'internet'
                    ? 'Internet'
                    : m.source}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSend} style={styles.inputRow}>
        <input
          style={styles.input}
          placeholder="Ask a question about emissions..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={sending}
        />
        <button type="submit" style={styles.btn} disabled={sending}>
          {sending ? '...' : 'Send'}
        </button>
      </form>
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
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  title: { margin: 0, fontSize: 14, fontWeight: 500 },
  subtitle: { margin: '4px 0 8px', fontSize: 11, color: '#9ca3af' },
  messages: {
    flex: 1,
    backgroundColor: '#020617',
    borderRadius: 8,
    padding: 8,
    border: '1px solid #111827',
    overflowY: 'auto',
    marginBottom: 8,
    maxHeight: 420,
  },
  msgRow: { display: 'flex', marginBottom: 6 },
  bubble: { maxWidth: '80%', padding: '6px 8px', borderRadius: 10, fontSize: 12 },
  bubbleUser: {
    backgroundColor: '#2563eb',
    color: '#ffffff',
    borderBottomRightRadius: 2,
  },
  bubbleBot: {
    backgroundColor: '#020617',
    border: '1px solid #4b5563',
    borderBottomLeftRadius: 2,
  },
  text: { fontSize: 13, color: '#e5e7eb' },
  link: {
    display: 'inline-block',
    marginTop: 4,
    fontSize: 11,
    color: '#60a5fa',
  },
  tag: {
    marginTop: 4,
    fontSize: 10,
    backgroundColor: '#1e293b',
    padding: '2px 6px',
    borderRadius: 999,
    display: 'inline-block',
  },
  inputRow: { display: 'flex', gap: 6, marginTop: 4 },
  input: {
    flex: 1,
    padding: '6px 8px',
    borderRadius: 8,
    border: '1px solid #4b5563',
    backgroundColor: '#020617',
    color: '#e5e7eb',
    fontSize: 12,
  },
  btn: {
    padding: '6px 10px',
    borderRadius: 999,
    border: 'none',
    backgroundColor: '#3b82f6',
    color: '#ffffff',
    fontSize: 12,
    cursor: 'pointer',
  },
};

export default ChatPanel;