import { useTheme } from "../../context/ThemeContext";

const NAV_ITEMS = [
  { id: "dashboard",    icon: "⬡", label: "Overview"      },
  { id: "transactions", icon: "⇄", label: "Transactions"   },
  { id: "analytics",   icon: "◈", label: "Analytics"      },
];

export default function Header({ activeTab, setActiveTab }) {
  const { dark, toggleDark } = useTheme();

  const card   = dark ? "#12122a" : "#ffffff";
  const border = dark ? "#1e1e3a" : "#e8eaf6";
  const muted  = dark ? "#8888aa" : "#9090b0";
  const text   = dark ? "#e8e8ff" : "#1a1a3e";

  return (
    <div style={{
      background: card,
      borderBottom: `1px solid ${border}`,
      padding: "0 32px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      height: 64,
      position: "sticky",
      top: 0,
      zIndex: 100,
    }}>

      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10,
          background: "linear-gradient(135deg, #00d4aa, #6c63ff)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontWeight: 900, color: "#fff", fontSize: 16,
        }}>
          R
        </div>
        <div>
          <p style={{ margin: 0, fontWeight: 800, fontSize: 15, letterSpacing: 0.5, color: text }}>FinSight</p>
          <p style={{ margin: 0, fontSize: 10, color: muted }}>FinTech Dashboard</p>
        </div>
      </div>

      {/* Nav tabs */}
      <nav style={{ display: "flex", gap: 4 }}>
        {NAV_ITEMS.map(n => (
          <button
            key={n.id}
            id={`nav-${n.id}`}
            onClick={() => setActiveTab(n.id)}
            style={{
              background:  activeTab === n.id ? "#00d4aa22" : "transparent",
              border:      activeTab === n.id ? "1px solid #00d4aa44" : "1px solid transparent",
              color:       activeTab === n.id ? "#00d4aa" : muted,
              borderRadius: 10,
              padding: "6px 16px",
              cursor: "pointer",
              fontSize: 13,
              fontWeight: activeTab === n.id ? 700 : 500,
              transition: "all 0.2s",
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontFamily: "inherit",
            }}
          >
            <span style={{ fontSize: 16 }}>{n.icon}</span>
            {n.label}
          </button>
        ))}
      </nav>

      {/* Right: toggle + avatar */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {/* Toggle switch */}
        <button
          id="theme-toggle"
          onClick={toggleDark}
          title={dark ? "Switch to Light" : "Switch to Dark"}
          style={{
            background: dark ? "#1e1e3a" : "#e8eaf6",
            border: "none",
            borderRadius: 20,
            width: 52,
            height: 28,
            cursor: "pointer",
            position: "relative",
            transition: "all 0.3s",
          }}
        >
          <div style={{
            position: "absolute",
            top: 4,
            left: dark ? 26 : 4,
            width: 20,
            height: 20,
            borderRadius: "50%",
            background: dark ? "#00d4aa" : "#6c63ff",
            transition: "all 0.3s",
          }} />
        </button>

        {/* Avatar */}
        <div style={{
          width: 36, height: 36, borderRadius: 10,
          background: "linear-gradient(135deg, #6c63ff, #00d4aa)",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "#fff", fontWeight: 700, fontSize: 14,
        }}>
          SA
        </div>
      </div>
    </div>
  );
}
