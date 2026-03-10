import { useEffect, useRef, useState } from 'react';
import { Wallet, TrendingUp } from 'lucide-react';
import { totalBalance } from '../../data/mockData';

function useCountUp(target, duration = 1800) {
  const [current, setCurrent] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    const start = performance.now();
    const step = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 4);
      setCurrent(target * ease);
      if (progress < 1) rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration]);

  return current;
}

export default function AccountBalanceCard() {
  const animatedBalance = useCountUp(totalBalance);

  return (
    <div className="gradient-balance" style={{
      borderRadius: '1.25rem',
      padding: '2rem',
      position: 'relative',
      overflow: 'hidden',
      minHeight: '180px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    }}>
      {/* Decorative bubbles */}
      <div style={{
        position: 'absolute', top: '-40px', right: '-40px',
        width: '200px', height: '200px',
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.07)',
      }} />
      <div style={{
        position: 'absolute', bottom: '-60px', right: '80px',
        width: '160px', height: '160px',
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.05)',
      }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative' }}>
        <div>
          <p style={{ margin: 0, fontSize: '0.75rem', fontWeight: 600, color: 'rgba(255,255,255,0.7)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Total Net Worth
          </p>
          <h2 id="balance-counter" style={{ margin: '0.5rem 0 0', fontSize: '2.75rem', fontWeight: 800, color: 'white', letterSpacing: '-0.03em', lineHeight: 1 }}>
            ₹{animatedBalance.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </h2>
          <p style={{ margin: '0.5rem 0 0', fontSize: '0.8rem', color: 'rgba(255,255,255,0.65)' }}>
            Across 3 accounts
          </p>
        </div>

        <div style={{
          width: '48px', height: '48px',
          borderRadius: '0.75rem',
          background: 'rgba(255,255,255,0.15)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Wallet size={24} color="white" />
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', position: 'relative' }}>
        <TrendingUp size={14} color="rgba(255,255,255,0.85)" />
        <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.85)', fontWeight: 500 }}>
          +12.4% vs last month
        </span>
      </div>
    </div>
  );
}
