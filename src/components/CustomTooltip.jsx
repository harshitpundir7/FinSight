import { useTheme } from "../context/ThemeContext";

export default function CustomTooltip({ active, payload, label }) {
  const { dark } = useTheme();

  const card   = dark ? "#12122a" : "#ffffff";
  const border = dark ? "#1e1e3a" : "#e8eaf6";
  const muted  = dark ? "#8888aa" : "#9090b0";

  if (!active || !payload?.length) return null;

  return (
    <div style={{
      background: card,
      border: `1px solid ${border}`,
      borderRadius: 10,
      padding: "10px 16px",
    }}>
      <p style={{ margin: "0 0 6px", fontSize: 12, color: muted }}>{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ margin: 0, fontSize: 13, fontWeight: 700, color: p.color }}>
          {p.name}: {p.value.toLocaleString()}
        </p>
      ))}
    </div>
  );
}
