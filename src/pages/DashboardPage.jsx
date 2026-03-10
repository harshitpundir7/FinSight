import { useState } from "react";
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useTheme } from "../context/ThemeContext";
import AccountCard from "../components/AccountCard";
import CustomTooltip from "../components/CustomTooltip";
import TxnRow from "../components/TxnRow";
import { ACCOUNTS, ALL_TXN, BALANCE_HISTORY, SPENDING_BY_CAT, CAT_COLORS } from "../data/mockData";

export default function DashboardPage() {
  const { dark } = useTheme();
  const [activeAccount, setActiveAccount] = useState(0);

  const card   = dark ? "#12122a" : "#ffffff";
  const border = dark ? "#1e1e3a" : "#e8eaf6";
  const text   = dark ? "#e8e8ff" : "#1a1a3e";
  const muted  = dark ? "#8888aa" : "#9090b0";

  const totalIn  = ALL_TXN.filter(t => t.type === "credit").reduce((s, t) => s + t.amount, 0);
  const totalOut = ALL_TXN.filter(t => t.type === "debit").reduce((s, t) => s + t.amount, 0);

  const statCards = [
    { label: "Total Income (60d)",  value: `${totalIn.toLocaleString("en-MY", { minimumFractionDigits: 0 })}`,             change: "+12.4%", up: true,  icon: "↑" },
    { label: "Total Spent (60d)",   value: `${totalOut.toLocaleString("en-MY", { minimumFractionDigits: 0 })}`,            change: "-3.2%",  up: false, icon: "↓" },
    { label: "Net Savings",         value: `${(totalIn - totalOut).toLocaleString("en-MY", { minimumFractionDigits: 0 })}`,change: "+8.1%",  up: true,  icon: "◎" },
    { label: "Transactions",        value: ALL_TXN.length,                                                                    change: "last 60 days", up: true, icon: "#" },
  ];

  const recent = [...ALL_TXN].slice(0, 8);

  return (
    <div>
      {/* Greeting */}
      <div style={{ marginBottom: 8 }}>
        <p style={{ margin: "0 0 4px", fontSize: 24, fontWeight: 800, color: text }}>Good evening, Harshit 👋</p>
        <p style={{ margin: 0, color: muted, fontSize: 14 }}>Here's your financial snapshot for today</p>
      </div>

      {/* Account Cards */}
      <div style={{ display: "flex", gap: 16, margin: "28px 0", flexWrap: "wrap" }}>
        {ACCOUNTS.map((acc, i) => (
          <AccountCard key={acc.id} account={acc} active={activeAccount === i} onClick={() => setActiveAccount(i)} />
        ))}
      </div>

      {/* Stat Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 28 }}>
        {statCards.map((s, i) => (
          <div key={i} style={{ background: card, border: `1px solid ${border}`, borderRadius: 16, padding: "20px 24px" }}>
            <p style={{ margin: "0 0 12px", fontSize: 11, fontWeight: 600, color: muted, letterSpacing: 1, textTransform: "uppercase" }}>{s.label}</p>
            <p style={{ margin: "0 0 8px", fontSize: 22, fontWeight: 800, fontFamily: "'Courier New', monospace", color: text }}>{s.value}</p>
            <span style={{
              fontSize: 11, fontWeight: 700,
              color: s.up ? "#51cf66" : "#ff6b6b",
              background: s.up ? "#51cf6622" : "#ff6b6b22",
              padding: "2px 8px", borderRadius: 6,
            }}>{s.change}</span>
          </div>
        ))}
      </div>

      {/* Balance Chart + Pie */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20, marginBottom: 20 }}>
        {/* Line chart */}
        <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 16, padding: 24 }}>
          <p style={{ margin: "0 0 20px", fontWeight: 700, fontSize: 15, color: text }}>Balance History — 30 Days</p>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={BALANCE_HISTORY}>
              <CartesianGrid strokeDasharray="3 3" stroke={border} />
              <XAxis dataKey="date" tick={{ fontSize: 10, fill: muted }} tickLine={false} interval={4} />
              <YAxis tick={{ fontSize: 10, fill: muted }} tickLine={false} axisLine={false} tickFormatter={v => `${(v / 1000).toFixed(0)}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="balance" stroke="#00d4aa" strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Donut */}
        <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 16, padding: 24 }}>
          <p style={{ margin: "0 0 20px", fontWeight: 700, fontSize: 15, color: text }}>Spending by Category</p>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={SPENDING_BY_CAT} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                {SPENDING_BY_CAT.map((entry, i) => <Cell key={i} fill={CAT_COLORS[entry.name]} />)}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
            {SPENDING_BY_CAT.map(c => (
              <span key={c.name} style={{
                fontSize: 10, fontWeight: 600, color: CAT_COLORS[c.name],
                background: `${CAT_COLORS[c.name]}22`, padding: "2px 8px", borderRadius: 6,
              }}>{c.name}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 16, overflow: "hidden" }}>
        <div style={{ padding: "18px 20px", borderBottom: `1px solid ${border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ margin: 0, fontWeight: 700, fontSize: 15, color: text }}>Recent Transactions</p>
          <span style={{ fontSize: 12, color: muted }}>Last 8 transactions</span>
        </div>
        {recent.map(txn => <TxnRow key={txn.id} txn={txn} />)}
      </div>
    </div>
  );
}
