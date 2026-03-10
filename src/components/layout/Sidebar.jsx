import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ArrowLeftRight, BarChart3, TrendingUp } from 'lucide-react';

const links = [
  { to: '/',              label: 'Dashboard',    icon: LayoutDashboard },
  { to: '/transactions',  label: 'Transactions', icon: ArrowLeftRight  },
  { to: '/analytics',     label: 'Analytics',    icon: BarChart3       },
];

export default function Sidebar() {
  return (
    <aside style={{
      width: '220px',
      minHeight: '100vh',
      background: 'var(--bg-sidebar)',
      borderRight: '1px solid rgba(255,255,255,0.05)',
      display: 'flex',
      flexDirection: 'column',
      padding: '1.5rem 1rem',
      position: 'fixed',
      left: 0,
      top: 0,
      bottom: 0,
      zIndex: 50,
    }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', padding: '0 0.25rem' }}>
        <div style={{
          width: '36px', height: '36px',
          borderRadius: '0.6rem',
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <TrendingUp size={20} color="white" />
        </div>
        <span style={{ fontWeight: 800, fontSize: '1.1rem', color: '#f1f5f9', letterSpacing: '-0.02em' }}>
          fin<span style={{ color: '#818cf8' }}>Sight</span>
        </span>
      </div>

      {/* Nav */}
      <p className="section-title" style={{ padding: '0 0.5rem' }}>MENU</p>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Bottom badge */}
      <div style={{ marginTop: 'auto', padding: '0.75rem', borderRadius: '0.75rem', background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)' }}>
        <p style={{ fontSize: '0.7rem', color: '#818cf8', fontWeight: 600, margin: 0 }}>CURRENT PERIOD</p>
        <p style={{ fontSize: '0.85rem', color: '#94a3b8', margin: '0.25rem 0 0' }}>March 2025</p>
      </div>
    </aside>
  );
}
