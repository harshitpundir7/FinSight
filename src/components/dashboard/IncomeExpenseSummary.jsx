import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import { thisMonthIncome, thisMonthExpense } from '../../data/mockData';

export default function IncomeExpenseSummary() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
      {/* Income */}
      <div className="gradient-income" style={{
        borderRadius: '1rem',
        padding: '1.25rem',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: '-20px', right: '-20px',
          width: '100px', height: '100px', borderRadius: '50%',
          background: 'rgba(255,255,255,0.1)',
        }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <div style={{
            width: '28px', height: '28px', borderRadius: '50%',
            background: 'rgba(255,255,255,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <ArrowDownLeft size={14} color="white" />
          </div>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Income</span>
        </div>
        <p style={{ margin: 0, fontSize: '1.5rem', fontWeight: 800, color: 'white' }}>
          ₹{thisMonthIncome.toLocaleString('en-IN')}
        </p>
        <p style={{ margin: '0.25rem 0 0', fontSize: '0.72rem', color: 'rgba(255,255,255,0.7)' }}>This month</p>
      </div>

      {/* Expense */}
      <div className="gradient-expense" style={{
        borderRadius: '1rem',
        padding: '1.25rem',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: '-20px', right: '-20px',
          width: '100px', height: '100px', borderRadius: '50%',
          background: 'rgba(255,255,255,0.1)',
        }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <div style={{
            width: '28px', height: '28px', borderRadius: '50%',
            background: 'rgba(255,255,255,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <ArrowUpRight size={14} color="white" />
          </div>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Expenses</span>
        </div>
        <p style={{ margin: 0, fontSize: '1.5rem', fontWeight: 800, color: 'white' }}>
          ₹{thisMonthExpense.toLocaleString('en-IN')}
        </p>
        <p style={{ margin: '0.25rem 0 0', fontSize: '0.72rem', color: 'rgba(255,255,255,0.7)' }}>This month</p>
      </div>
    </div>
  );
}
