# FinSight

![FinSight Dashboard](./public/overview.png)

**Live Demo**: [finsight.harshitpundir.tech](https://finsight.harshitpundir.tech)

FinSight is a modern, responsive personal finance dashboard built with React. It provides users with a comprehensive overview of their financial health through interactive charts, transaction tracking, and account management, featuring a sleek dual-theme (Dark/Light) UI.

## Features

- **Comprehensive Dashboard**: View an at-a-glance summary of total net worth across multiple accounts, alongside recent income, spending, and net savings.
- **Interactive Analytics**:
  - **Balance History:** A 30-day interactive area/line chart tracking net worth over time.
  - **Income vs Expenses:** A 6-month grouped bar chart comparing cash flow.
  - **Spending Breakdown:** A detailed donut chart and visual progress bars categorizing expenses (Food, Travel, Bills, etc.).
- **Transaction Management**: 
  - View a feed of all recent transactions with color-coded category badges.
  - Robust filtering system: Filter by category, transaction type (income/expense), search by merchant name, and sort by date or amount.
- **Dark/Light Mode**: Full theme support with a stylish toggle, persisting user preference via `localStorage`.

## Tech Stack

- **Framework**: [React](https://react.dev/) (Bootstrapped with [Vite](https://vitejs.dev/))
- **Data Visualization**: [Recharts](https://recharts.org/) for responsive, customizable SVG charts.
- **Icons & UI**: Emoji-based category icons combined with dynamic CSS-in-JS styling for a clean, modern aesthetic.
- **State Management**: React Context (`ThemeContext`) and standard Hooks (`useState`, `useEffect`).

## Project Structure

The project was refactored from a single-file prototype into a modular React architecture:

```
src/
├── components/          # Reusable UI components
│   ├── layout/          # Header, navigation, and theme toggle
│   ├── AccountCard.jsx  # Individual account balance cards
│   ├── AnimatedNumber.jsx # Number counter animation hook/component
│   ├── CustomTooltip.jsx  # Shared tooltip styling for Recharts
│   └── TxnRow.jsx       # List items for the transaction feed
├── context/
│   └── ThemeContext.jsx # Global dark/light mode state provider
├── data/
│   └── mockData.js      # Procedural generation of realistic dummy financial data
├── pages/               # Main application views
│   ├── AnalyticsPage.jsx
│   ├── DashboardPage.jsx
│   └── TransactionsPage.jsx
├── App.jsx              # Root component routing between tabs
└── main.jsx             # React entry point
```

## Running Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/harshitpundir7/FinSight.git
   cd FinSight
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Navigate to `http://localhost:5173`

## License

This project is open-source and available under the MIT License.
