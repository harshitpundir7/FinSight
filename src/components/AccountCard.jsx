import AnimatedNumber from "./AnimatedNumber";
import { useTheme } from "../context/ThemeContext";

export default function AccountCard({ account, active, onClick }) {
  const { dark } = useTheme();

  return (
    <div
      onClick={onClick}
      style={{
        background: active ? account.color : dark ? "#1a1a2e" : "#f8f9ff",
        border: `2px solid ${active ? account.color : dark ? "#2a2a4a" : "#e8eaf6"}`,
        borderRadius: 16,
        padding: "20px 24px",
        cursor: "pointer",
        transition: "all 0.3s ease",
        flex: "1 1 200px",
        minWidth: 180,
        boxShadow: active ? `0 8px 32px ${account.color}44` : "none",
      }}
    >
      <p style={{
        fontSize: 12, fontWeight: 600, letterSpacing: 1,
        color: active ? "rgba(255,255,255,0.7)" : dark ? "#8888aa" : "#9090b0",
        margin: "0 0 8px", textTransform: "uppercase",
      }}>
        {account.name}
      </p>
      <p style={{
        fontSize: 22, fontWeight: 800,
        color: active ? "#fff" : dark ? "#e8e8ff" : "#1a1a3e",
        margin: "0 0 4px", fontFamily: "'Courier New', monospace",
      }}>
        {active
          ? <AnimatedNumber value={account.balance} prefix="" />
          : `${account.balance.toLocaleString("en-MY", { minimumFractionDigits: 2 })}`
        }
      </p>
      <p style={{
        fontSize: 11,
        color: active ? "rgba(255,255,255,0.5)" : dark ? "#6666aa" : "#b0b0cc",
        margin: 0,
      }}>
        {account.number}
      </p>
    </div>
  );
}
