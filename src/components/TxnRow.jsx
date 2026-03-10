import { useTheme } from "../context/ThemeContext";
import { CAT_COLORS, CAT_ICONS } from "../data/mockData";

export default function TxnRow({ txn }) {
  const { dark } = useTheme();
  const isCredit = txn.type === "credit";

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: "14px 20px",
        borderBottom: `1px solid ${dark ? "#1e1e3a" : "#f0f2ff"}`,
        transition: "background 0.15s",
        cursor: "default",
      }}
      onMouseEnter={e => (e.currentTarget.style.background = dark ? "#1a1a35" : "#f8f9ff")}
      onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
    >
      {/* Icon */}
      <div style={{
        width: 40, height: 40, borderRadius: 12,
        background: `${CAT_COLORS[txn.category]}22`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 18, flexShrink: 0,
      }}>
        {CAT_ICONS[txn.category]}
      </div>

      {/* Info */}
      <div style={{ flex: 1, marginLeft: 14 }}>
        <p style={{ margin: 0, fontWeight: 700, fontSize: 14, color: dark ? "#e8e8ff" : "#1a1a3e" }}>
          {txn.merchant}
        </p>
        <p style={{ margin: 0, fontSize: 11, color: dark ? "#6666aa" : "#9090b0" }}>
          {txn.date} · {txn.account}
        </p>
      </div>

      {/* Category + Amount */}
      <div style={{ textAlign: "right" }}>
        <span style={{
          display: "inline-block", padding: "2px 8px", borderRadius: 6, fontSize: 10, fontWeight: 700,
          background: `${CAT_COLORS[txn.category]}22`, color: CAT_COLORS[txn.category], marginBottom: 4,
        }}>
          {txn.category}
        </span>
        <p style={{
          margin: 0, fontWeight: 800, fontSize: 15,
          color: isCredit ? "#51cf66" : dark ? "#ff8888" : "#e53935",
          fontFamily: "'Courier New', monospace",
        }}>
          {isCredit ? "+" : "−"}{txn.amount.toLocaleString("en-MY", { minimumFractionDigits: 2 })}
        </p>
      </div>
    </div>
  );
}
