import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts';
import { accounts } from '../../data/mockData';

function SparklineCard({ account }) {
  const data = account.sparkline.map((v, i) => ({ i, v }));

  return (
    <div className="card-sm" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '1.2rem' }}>{account.icon}</span>
          <div>
            <p style={{ margin: 0, fontWeight: 600, fontSize: '0.85rem', color: 'var(--text-primary)' }}>{account.name}</p>
          </div>
        </div>
        <div style={{
          width: '8px', height: '8px', borderRadius: '50%',
          background: account.color,
          boxShadow: `0 0 6px ${account.color}`,
        }} />
      </div>

      <p style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>
        ₹{account.balance.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </p>

      <div style={{ height: '50px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <Line
              type="monotone"
              dataKey="v"
              stroke={account.color}
              strokeWidth={2}
              dot={false}
            />
            <Tooltip
              content={({ active, payload }) =>
                active && payload?.length ? (
                  <div className="chart-tooltip">₹{payload[0].value.toLocaleString('en-IN')}</div>
                ) : null
              }
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default function AccountSparklines() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <p className="section-title">Accounts</p>
      {accounts.map(acc => <SparklineCard key={acc.id} account={acc} />)}
    </div>
  );
}
