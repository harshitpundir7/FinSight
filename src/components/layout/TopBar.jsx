import { useLocation } from 'react-router-dom';
import { Sun, Moon, Bell } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const pageNames = {
  '/':             'Dashboard',
  '/transactions': 'Transactions',
  '/analytics':    'Analytics',
};

export default function TopBar() {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const title = pageNames[location.pathname] || 'finSight';

  return (
    <header style={{
      background: 'var(--bg-card)',
      borderBottom: '1px solid var(--border)',
      padding: '0.875rem 1.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 40,
    }}>
      <div>
        <h1 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>
          {title}
        </h1>
        <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          March 2025 · Personal Finance
        </p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        {/* Notification bell */}
        <button style={{
          width: '38px', height: '38px',
          borderRadius: '50%',
          border: '1px solid var(--border)',
          background: 'var(--bg-primary)',
          cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'var(--text-secondary)',
          position: 'relative',
        }}>
          <Bell size={17} />
          <span style={{
            position: 'absolute', top: '7px', right: '7px',
            width: '7px', height: '7px',
            background: '#ef4444', borderRadius: '50%',
            border: '1.5px solid var(--bg-card)',
          }} />
        </button>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          id="theme-toggle"
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          style={{
            width: '38px', height: '38px',
            borderRadius: '50%',
            border: '1px solid var(--border)',
            background: 'var(--bg-primary)',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--text-secondary)',
          }}>
          {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
        </button>

        {/* Avatar */}
        <div style={{
          width: '38px', height: '38px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'white', fontWeight: 700, fontSize: '0.8rem',
          cursor: 'pointer',
        }}>
          H
        </div>
      </div>
    </header>
  );
}
