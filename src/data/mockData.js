// ── Constants ─────────────────────────────────────────────────────────────────
export const ACCOUNTS = [
  { id: 1, name: "Main Checking", number: "•••• 4821", balance: 12480.5,  color: "#00d4aa" },
  { id: 2, name: "Savings",       number: "•••• 9034", balance: 38750.0,  color: "#6c63ff" },
  { id: 3, name: "Investment",    number: "•••• 1192", balance: 95320.75, color: "#ff6b6b" },
];

export const CATEGORIES = ["Food", "Travel", "Bills", "Shopping", "Health", "Transfer", "Salary"];

export const CAT_COLORS = {
  Food:     "#00d4aa",
  Travel:   "#6c63ff",
  Bills:    "#ff6b6b",
  Shopping: "#ffd93d",
  Health:   "#4ecdc4",
  Transfer: "#a8a8b3",
  Salary:   "#51cf66",
};

export const CAT_ICONS = {
  Food:     "🍜",
  Travel:   "✈️",
  Bills:    "⚡",
  Shopping: "🛍️",
  Health:   "💊",
  Transfer: "↔️",
  Salary:   "💰",
};

const MERCHANTS = {
  Food:     ["Grab Food", "McDonald's", "Jaya Grocer", "Old Town Kopitiam", "Lotus's"],
  Travel:   ["AirAsia", "Grab", "MyCar", "Rapid KL", "Touch 'n Go"],
  Bills:    ["TNB", "Unifi", "Maxis", "Astro", "SYABAS"],
  Shopping: ["Shopee", "Lazada", "AEON", "Parkson", "H&M"],
  Health:   ["Caring Pharmacy", "Watson's", "KPJ Hospital", "Pantai Clinic"],
  Transfer: ["DuitNow", "IBG Transfer", "FPX"],
  Salary:   ["RM Applications Sdn Bhd"],
};

// ── Data generators ───────────────────────────────────────────────────────────
export function generateTransactions(count = 60) {
  const txns = [];
  let runningBalance = 12480.5;
  for (let i = 0; i < count; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const cat     = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
    const isIncome = cat === "Salary" || (cat === "Transfer" && Math.random() > 0.7);
    const amount  = isIncome
      ? parseFloat((Math.random() * 3000 + 2000).toFixed(2))
      : parseFloat((Math.random() * 500 + 5).toFixed(2));
    const merchant = MERCHANTS[cat][Math.floor(Math.random() * MERCHANTS[cat].length)];
    runningBalance += isIncome ? amount : -amount;
    txns.push({
      id:       i + 1,
      date:     date.toISOString().split("T")[0],
      merchant,
      category: cat,
      amount,
      type:     isIncome ? "credit" : "debit",
      balance:  parseFloat(runningBalance.toFixed(2)),
      account:  ACCOUNTS[Math.floor(Math.random() * ACCOUNTS.length)].name,
    });
  }
  return txns;
}

export function generateBalanceHistory() {
  const data = [];
  let bal = 10200;
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    bal += (Math.random() - 0.4) * 800;
    data.push({
      date:    d.toLocaleDateString("en-MY", { month: "short", day: "numeric" }),
      balance: Math.round(bal),
    });
  }
  return data;
}

export function generateMonthlyData() {
  const months = ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb"];
  return months.map(m => ({
    month:    m,
    income:   Math.round(3500 + Math.random() * 2000),
    expenses: Math.round(1800 + Math.random() * 1500),
  }));
}

export function generateSpendingByCategory() {
  return ["Food", "Travel", "Bills", "Shopping", "Health"].map(c => ({
    name:  c,
    value: Math.round(200 + Math.random() * 1200),
  }));
}

// ── Pre-generated (stable across renders) ────────────────────────────────────
export const ALL_TXN            = generateTransactions(60);
export const BALANCE_HISTORY    = generateBalanceHistory();
export const MONTHLY_DATA       = generateMonthlyData();
export const SPENDING_BY_CAT    = generateSpendingByCategory();
