import { createContext, useContext, useState, useEffect } from "react";

const ThemeCtx = createContext();
export const useTheme = () => useContext(ThemeCtx);

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem("finsight-theme");
    return saved ? saved === "dark" : true;
  });

  useEffect(() => {
    localStorage.setItem("finsight-theme", dark ? "dark" : "light");
  }, [dark]);

  const toggleDark = () => setDark(d => !d);

  return (
    <ThemeCtx.Provider value={{ dark, toggleDark }}>
      {children}
    </ThemeCtx.Provider>
  );
}
