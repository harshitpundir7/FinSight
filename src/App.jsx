import { useState } from "react";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import Header from "./components/layout/Header";
import DashboardPage    from "./pages/DashboardPage";
import TransactionsPage from "./pages/TransactionsPage";
import AnalyticsPage    from "./pages/AnalyticsPage";

function AppInner() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { dark } = useTheme();

  const bg = dark ? "#0d0d1a" : "#f4f6ff";

  return (
    <div style={{ minHeight: "100vh", background: bg, color: dark ? "#e8e8ff" : "#1a1a3e", transition: "all 0.3s", fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif" }}>
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "32px 24px" }}>
        {activeTab === "dashboard"    && <DashboardPage />}
        {activeTab === "transactions" && <TransactionsPage />}
        {activeTab === "analytics"    && <AnalyticsPage />}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppInner />
    </ThemeProvider>
  );
}
