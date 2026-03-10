import { Link } from 'react-router-dom';
import { transactions } from '../../data/mockData';
import { ArrowRight } from 'lucide-react';

const categoryColors = {
  Food: 'tag-food', Travel: 'tag-travel', Bills: 'tag-bills',
  Shopping: 'tag-shopping', Health: 'tag-health', Income: 'tag-income',
  Entertainment: 'tag-entertainment', Other: 'tag-other',
};

export default function RecentTransactions() {
  const recent = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 6);

  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>Recent Transactions</h3>
        <Link to="/transactions" style={{
          display: 'flex', alignItems: 'center', gap: '0.3rem',
          fontSize: '0.78rem', color: 'var(--accent)', textDecoration: 'none', fontWeight: 500,
        }}>
          View All <ArrowRight size={13} />
        </Link>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {recent.map(t => (
          <div key={t.id} style={{
            display: 'flex', alignItems: 'center', gap: '0.75rem',
            padding: '0.6rem 0.5rem',
            borderRadius: '0.5rem',
            transition: 'background 0.15s',
          }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-primary)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <div style={{
              width: '36px', height: '36px', borderRadius: '50%',
              background: 'var(--bg-primary)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1rem', flexShrink: 0,
            }}>
              {t.type === 'income' ? '💵' : '💳'}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ margin: 0, fontWeight: 600, fontSize: '0.85rem', color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {t.merchant}
              </p>
              <p style={{ margin: 0, fontSize: '0.72rem', color: 'var(--text-muted)' }}>{t.date}</p>
            </div>
            <span className={`tag ${categoryColors[t.category] || 'tag-other'}`}>{t.category}</span>
            <span style={{
              fontWeight: 700, fontSize: '0.9rem',
              color: t.type === 'income' ? '#10b981' : 'var(--text-primary)',
              marginLeft: '0.25rem', flexShrink: 0,
            }}>
              {t.type === 'income' ? '+' : '-'}₹{Math.abs(t.amount).toLocaleString('en-IN')}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
