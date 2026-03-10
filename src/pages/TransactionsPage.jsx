import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import TxnRow from "../components/TxnRow";
import { ALL_TXN, CATEGORIES } from "../data/mockData";

export default function TransactionsPage() {
  const { dark } = useTheme();
  const [search,     setSearch]     = useState("");
  const [filterCat,  setFilterCat]  = useState("All");
  const [filterType, setFilterType] = useState("All");
  const [sortBy,     setSortBy]     = useState("date");

  const card   = dark ? "#12122a" : "#ffffff";
  const border = dark ? "#1e1e3a" : "#e8eaf6";
  const text   = dark ? "#e8e8ff" : "#1a1a3e";
  const muted  = dark ? "#8888aa" : "#9090b0";
  const inputBg = dark ? "#0d0d1a" : "#f4f6ff";

  const filtered = ALL_TXN
    .filter(t =>
      t.merchant.toLowerCase().includes(search.toLowerCase()) ||
      t.category.toLowerCase().includes(search.toLowerCase())
    )
    .filter(t => filterCat  === "All" || t.category === filterCat)
    .filter(t => filterType === "All" || t.type     === filterType)
    .sort((a, b) => {
      if (sortBy === "date")     return new Date(b.date) - new Date(a.date);
      if (sortBy === "amount")   return b.amount - a.amount;
      return a.merchant.localeCompare(b.merchant);
    });

  const selectStyle = {
    background: inputBg,
    border: `1px solid ${border}`,
    borderRadius: 10,
    padding: "10px 14px",
    color: text,
    fontSize: 13,
    cursor: "pointer",
    fontFamily: "inherit",
    outline: "none",
  };

  return (
    <div>
      <p style={{ margin: "0 0 24px", fontSize: 24, fontWeight: 800, color: text }}>Transaction Feed</p>

      {/* Filters */}
      <div style={{
        background: card, border: `1px solid ${border}`, borderRadius: 16,
        padding: 20, marginBottom: 20,
        display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center",
      }}>
        {/* Search */}
        <input
          id="search-input"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="🔍 Search merchant or category..."
          style={{
            flex: "1 1 260px",
            background: inputBg,
            border: `1px solid ${border}`,
            borderRadius: 10,
            padding: "10px 16px",
            color: text,
            fontSize: 13,
            outline: "none",
            fontFamily: "inherit",
          }}
        />

        {/* Category */}
        <select id="filter-category" value={filterCat} onChange={e => setFilterCat(e.target.value)} style={selectStyle}>
          <option value="All">All Categories</option>
          {CATEGORIES.map(c => <option key={c}>{c}</option>)}
        </select>

        {/* Type */}
        <select id="filter-type" value={filterType} onChange={e => setFilterType(e.target.value)} style={selectStyle}>
          <option value="All">All Types</option>
          <option value="credit">Income</option>
          <option value="debit">Expense</option>
        </select>

        {/* Sort */}
        <select id="sort-select" value={sortBy} onChange={e => setSortBy(e.target.value)} style={selectStyle}>
          <option value="date">Sort: Newest</option>
          <option value="amount">Sort: Amount ↓</option>
          <option value="merchant">Sort: Merchant A–Z</option>
        </select>

        {/* Count */}
        <span style={{ fontSize: 12, color: muted, marginLeft: "auto" }}>
          {filtered.length} transactions
        </span>
      </div>

      {/* Feed */}
      <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 16, overflow: "hidden" }}>
        {filtered.length === 0 ? (
          <p style={{ textAlign: "center", padding: 48, color: muted }}>
            No transactions match your filters.
          </p>
        ) : (
          filtered.map(txn => <TxnRow key={txn.id} txn={txn} />)
        )}
      </div>
    </div>
  );
}
