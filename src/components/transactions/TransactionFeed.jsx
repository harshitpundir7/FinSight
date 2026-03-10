import { useApp } from '../../context/AppContext';
import { Inbox } from 'lucide-react';

const categoryColors = {
  Food: 'tag-food', Travel: 'tag-travel', Bills: 'tag-bills',
  Shopping: 'tag-shopping', Health: 'tag-health', Income: 'tag-income',
  Entertainment: 'tag-entertainment', Other: 'tag-other',
};

const categoryEmoji = {
  Food: '🍔', Travel: '✈️', Bills: '📄', Shopping: '🛍️',
  Health: '🏥', Income: '💵', Entertainment: '🎬', Other: '📦',
};

export default function TransactionFeed() {
  const { filteredTransactions } = useApp();

  if (filteredTransactions.length === 0) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
        <Inbox size={40} color="var(--text-muted)" style={{ margin: '0 auto 1rem' }} />
        <p style={{ color: 'var(--text-muted)', margin: 0 }}>No transactions match your filters.</p>
      </div>
    );
  }

  return (
    <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
      {/* Header */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr 1fr 1fr',
        gap: '1rem',
        padding: '0.75rem 1.25rem',
        background: 'var(--bg-primary)',
        borderBottom: '1px solid var(--border)',
        fontSize: '0.72rem',
        fontWeight: 600,
        color: 'var(--text-muted)',
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
      }}>
        <span>Merchant</span>
        <span>Category</span>
        <span>Date</span>
        <span style={{ textAlign: 'right' }}>Amount</span>
      </div>

      {/* Rows */}
      <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
        {filteredTransactions.map((t, idx) => (
          <div
            key={t.id}
            style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr 1fr 1fr',
              gap: '1rem',
              padding: '0.85rem 1.25rem',
              alignItems: 'center',
              borderBottom: idx < filteredTransactions.length - 1 ? '1px solid var(--border)' : 'none',
              transition: 'background 0.15s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-primary)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            {/* Merchant */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                width: '36px', height: '36px', borderRadius: '50%',
                background: 'var(--bg-primary)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.1rem', flexShrink: 0,
              }}>
                {categoryEmoji[t.category] || '📦'}
              </div>
              <div>
                <p style={{ margin: 0, fontWeight: 600, fontSize: '0.875rem', color: 'var(--text-primary)' }}>{t.merchant}</p>
                <p style={{ margin: 0, fontSize: '0.7rem', color: 'var(--text-muted)' }}>{t.type}</p>
              </div>
            </div>

            {/* Category */}
            <span className={`tag ${categoryColors[t.category] || 'tag-other'}`}>
              {t.category}
            </span>

            {/* Date */}
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{t.date}</span>

            {/* Amount */}
            <span style={{
              textAlign: 'right',
              fontWeight: 700,
              fontSize: '0.9rem',
              color: t.type === 'income' ? '#10b981' : 'var(--expense)',
            }}>
              {t.type === 'income' ? '+' : '-'}₹{Math.abs(t.amount).toLocaleString('en-IN')}
            </span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{
        padding: '0.75rem 1.25rem',
        borderTop: '1px solid var(--border)',
        background: 'var(--bg-primary)',
        fontSize: '0.78rem',
        color: 'var(--text-muted)',
      }}>
        Showing {filteredTransactions.length} transaction{filteredTransactions.length !== 1 ? 's' : ''}
      </div>
    </div>
  );
}
