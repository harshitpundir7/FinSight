import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import { useTheme } from "../context/ThemeContext";
import CustomTooltip from "../components/CustomTooltip";
import { BALANCE_HISTORY, MONTHLY_DATA, SPENDING_BY_CAT, CAT_COLORS, CAT_ICONS } from "../data/mockData";

export default function AnalyticsPage() {
  const { dark } = useTheme();

  const card   = dark ? "#12122a" : "#ffffff";
  const border = dark ? "#1e1e3a" : "#e8eaf6";
  const text   = dark ? "#e8e8ff" : "#1a1a3e";
  const muted  = dark ? "#8888aa" : "#9090b0";

  // Sort spending for bar chart display (descending)
  const sortedSpending = [...SPENDING_BY_CAT].sort((a, b) => b.value - a.value);
  const maxSpend = sortedSpending[0]?.value || 1;

  return (
    <div>
      <p style={{ margin: "0 0 24px", fontSize: 24, fontWeight: 800, color: text }}>Analytics & Insights</p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>

        {/* Income vs Expenses Bar Chart */}
        <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 16, padding: 24 }}>
          <p style={{ margin: "0 0 20px", fontWeight: 700, fontSize: 15, color: text }}>
            Income vs Expenses — 6 Months
          </p>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={MONTHLY_DATA} barCategoryGap="30%">
              <CartesianGrid strokeDasharray="3 3" stroke={border} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: muted }} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: muted }} tickLine={false} axisLine={false} tickFormatter={v => `${(v / 1000).toFixed(1)}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: 12, color: muted }} />
              <Bar dataKey="income"   fill="#00d4aa" radius={[6, 6, 0, 0]} name="Income"   />
              <Bar dataKey="expenses" fill="#ff6b6b" radius={[6, 6, 0, 0]} name="Expenses" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Spending Breakdown Pie + Progress bars */}
        <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 16, padding: 24 }}>
          <p style={{ margin: "0 0 20px", fontWeight: 700, fontSize: 15, color: text }}>
            Spending Breakdown
          </p>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={SPENDING_BY_CAT}
                cx="50%" cy="50%"
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
                label={({ name, percent }) =>
                  percent > 0.08 ? `${name} ${(percent * 100).toFixed(0)}%` : ""
                }
                labelLine={false}
              >
                {SPENDING_BY_CAT.map((e, i) => <Cell key={i} fill={CAT_COLORS[e.name]} />)}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>

          {/* Progress bar legend */}
          <div style={{ marginTop: 16 }}>
            {sortedSpending.map(c => (
              <div key={c.name} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: CAT_COLORS[c.name], flexShrink: 0 }} />
                <span style={{ fontSize: 13, flex: 1, color: text }}>{CAT_ICONS[c.name]} {c.name}</span>
                <div style={{ flex: 2, background: dark ? "#1e1e3a" : "#f0f2ff", borderRadius: 4, height: 6, overflow: "hidden" }}>
                  <div style={{ width: `${(c.value / maxSpend) * 100}%`, background: CAT_COLORS[c.name], height: "100%", borderRadius: 4 }} />
                </div>
                <span style={{ fontSize: 13, fontWeight: 700, fontFamily: "monospace", width: 80, textAlign: "right", color: text }}>
                  {c.value.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Full-width Balance Trend */}
        <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 16, padding: 24, gridColumn: "1 / -1" }}>
          <p style={{ margin: "0 0 20px", fontWeight: 700, fontSize: 15, color: text }}>
            Balance Trend — 30 Days (Full View)
          </p>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={BALANCE_HISTORY}>
              <defs>
                <linearGradient id="balGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#00d4aa" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#00d4aa" stopOpacity={0}   />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={border} />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: muted }} tickLine={false} interval={3} />
              <YAxis tick={{ fontSize: 11, fill: muted }} tickLine={false} axisLine={false} tickFormatter={v => `${(v / 1000).toFixed(0)}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="balance" stroke="#00d4aa" strokeWidth={3} dot={false} activeDot={{ r: 5, fill: "#00d4aa" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
