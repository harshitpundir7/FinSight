import { PiggyBank, ShoppingBag, Zap } from 'lucide-react';
import { totalSaved, thisMonthExpense, biggestTransaction } from '../../data/mockData';

const stats = [
  {
    label: 'Total Saved',
    value: `₹${totalSaved.toLocaleString('en-IN')}`,
    icon: PiggyBank,
    color: '#10b981',
    bg: 'rgba(16,185,129,0.1)',
    sub: 'Savings account',
  },
  {
    label: 'Total Spent',
    value: `₹${thisMonthExpense.toLocaleString('en-IN')}`,
    icon: ShoppingBag,
    color: '#ef4444',
    bg: 'rgba(239,68,68,0.1)',
    sub: 'This month',
  },
  {
    label: 'Biggest Txn',
    value: `₹${biggestTransaction.amount.toLocaleString('en-IN')}`,
    icon: Zap,
    color: '#f59e0b',
    bg: 'rgba(245,158,11,0.1)',
    sub: biggestTransaction.merchant,
  },
];

export default function QuickStats() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <p className="section-title">Quick Stats</p>
      {stats.map((s) => (
        <div key={s.label} className="card-sm" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            width: '42px', height: '42px', borderRadius: '0.65rem',
            background: s.bg,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <s.icon size={19} color={s.color} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ margin: 0, fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 500 }}>{s.label}</p>
            <p style={{ margin: '0.15rem 0 0', fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>{s.value}</p>
          </div>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{s.sub}</span>
        </div>
      ))}
    </div>
  );
}
