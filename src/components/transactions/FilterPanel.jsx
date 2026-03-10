import { Search, SlidersHorizontal, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { categories } from '../../data/mockData';

const allCats = ['All', ...categories.map(c => c.name)];

export default function FilterPanel() {
  const { state, dispatch } = useApp();

  return (
    <div className="card" style={{ marginBottom: '1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
        <SlidersHorizontal size={16} color="var(--accent)" />
        <h3 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>Filters</h3>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'flex-end' }}>
        {/* Search */}
        <div style={{ flex: '1 1 200px', position: 'relative' }}>
          <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            id="search-input"
            className="input-field"
            style={{ width: '100%', paddingLeft: '2rem' }}
            placeholder="Search merchant..."
            value={state.search}
            onChange={e => dispatch({ type: 'SET_SEARCH', payload: e.target.value })}
          />
        </div>

        {/* Category */}
        <div style={{ flex: '0 0 auto' }}>
          <label style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 500, marginBottom: '0.3rem' }}>Category</label>
          <select
            id="category-select"
            className="input-field"
            value={state.category}
            onChange={e => dispatch({ type: 'SET_CATEGORY', payload: e.target.value })}
          >
            {allCats.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>

        {/* Sort */}
        <div style={{ flex: '0 0 auto' }}>
          <label style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 500, marginBottom: '0.3rem' }}>Sort By</label>
          <select
            id="sort-select"
            className="input-field"
            value={state.sortBy}
            onChange={e => dispatch({ type: 'SET_SORT', payload: e.target.value })}
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="highest">Highest Amount</option>
            <option value="lowest">Lowest Amount</option>
          </select>
        </div>

        {/* Date From */}
        <div style={{ flex: '0 0 auto' }}>
          <label style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 500, marginBottom: '0.3rem' }}>From</label>
          <input
            type="date"
            className="input-field"
            value={state.dateFrom}
            onChange={e => dispatch({ type: 'SET_DATE_FROM', payload: e.target.value })}
          />
        </div>

        {/* Date To */}
        <div style={{ flex: '0 0 auto' }}>
          <label style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 500, marginBottom: '0.3rem' }}>To</label>
          <input
            type="date"
            className="input-field"
            value={state.dateTo}
            onChange={e => dispatch({ type: 'SET_DATE_TO', payload: e.target.value })}
          />
        </div>

        {/* Min / Max Amount */}
        <div style={{ flex: '0 0 auto' }}>
          <label style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 500, marginBottom: '0.3rem' }}>Min ₹</label>
          <input
            type="number"
            className="input-field"
            style={{ width: '90px' }}
            placeholder="0"
            value={state.minAmount}
            onChange={e => dispatch({ type: 'SET_MIN', payload: e.target.value })}
          />
        </div>
        <div style={{ flex: '0 0 auto' }}>
          <label style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 500, marginBottom: '0.3rem' }}>Max ₹</label>
          <input
            type="number"
            className="input-field"
            style={{ width: '90px' }}
            placeholder="∞"
            value={state.maxAmount}
            onChange={e => dispatch({ type: 'SET_MAX', payload: e.target.value })}
          />
        </div>

        {/* Reset */}
        <button
          id="reset-filters"
          onClick={() => dispatch({ type: 'RESET_FILTERS' })}
          style={{
            display: 'flex', alignItems: 'center', gap: '0.3rem',
            padding: '0.5rem 0.75rem', borderRadius: '0.5rem',
            border: '1px solid var(--border)', background: 'var(--bg-primary)',
            color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.8rem',
          }}
        >
          <X size={13} /> Reset
        </button>
      </div>
    </div>
  );
}
