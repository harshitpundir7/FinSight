import { useState, useEffect } from "react";

export default function AnimatedNumber({ value, prefix = "", decimals = 2 }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const duration = 1200;
    const step = 16;
    const increment = value / (duration / step);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        clearInterval(timer);
        setDisplay(value);
      } else {
        setDisplay(current);
      }
    }, step);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <span>
      {prefix}
      {display.toLocaleString("en-MY", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
    </span>
  );
}
