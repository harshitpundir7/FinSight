import { createContext, useContext, useReducer } from 'react';
import { transactions as allTransactions } from '../data/mockData';

const AppContext = createContext();

const initialState = {
  transactions: allTransactions,
  search: '',
  category: 'All',
  sortBy: 'newest',
  minAmount: '',
  maxAmount: '',
  dateFrom: '',
  dateTo: '',
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_SEARCH':    return { ...state, search: action.payload };
    case 'SET_CATEGORY':  return { ...state, category: action.payload };
    case 'SET_SORT':      return { ...state, sortBy: action.payload };
    case 'SET_MIN':       return { ...state, minAmount: action.payload };
    case 'SET_MAX':       return { ...state, maxAmount: action.payload };
    case 'SET_DATE_FROM': return { ...state, dateFrom: action.payload };
    case 'SET_DATE_TO':   return { ...state, dateTo: action.payload };
    case 'RESET_FILTERS': return { ...initialState };
    default: return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const filteredTransactions = state.transactions
    .filter(t => {
      const searchMatch = t.merchant.toLowerCase().includes(state.search.toLowerCase());
      const catMatch = state.category === 'All' || t.category === state.category;
      const minMatch = state.minAmount === '' || Math.abs(t.amount) >= parseFloat(state.minAmount);
      const maxMatch = state.maxAmount === '' || Math.abs(t.amount) <= parseFloat(state.maxAmount);
      const dateFromMatch = state.dateFrom === '' || t.date >= state.dateFrom;
      const dateToMatch = state.dateTo === '' || t.date <= state.dateTo;
      return searchMatch && catMatch && minMatch && maxMatch && dateFromMatch && dateToMatch;
    })
    .sort((a, b) => {
      if (state.sortBy === 'newest') return new Date(b.date) - new Date(a.date);
      if (state.sortBy === 'oldest') return new Date(a.date) - new Date(b.date);
      if (state.sortBy === 'highest') return Math.abs(b.amount) - Math.abs(a.amount);
      if (state.sortBy === 'lowest') return Math.abs(a.amount) - Math.abs(b.amount);
      return 0;
    });

  return (
    <AppContext.Provider value={{ state, dispatch, filteredTransactions }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
