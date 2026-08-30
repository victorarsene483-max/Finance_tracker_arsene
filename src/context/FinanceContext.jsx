import { createContext, useContext, useState, useEffect, useMemo } from "react";

const FinanceContext = createContext();

const defaultTransactions = [
  { id: 1, title: "Freelance Work", description: "Website project", amount: 8000, type: "income", category: "Income", date: "2025-05-26" },
  { id: 2, title: "Online Course", description: "Udemy", amount: 1500, type: "expense", category: "Education", date: "2025-05-26" },
  { id: 3, title: "Groceries", description: "Quickmart", amount: 1250, type: "expense", category: "Food & Drinks", date: "2025-05-25" },
  { id: 4, title: "Bus Fare", description: "Matatu", amount: 200, type: "expense", category: "Transport", date: "2025-05-24" },
  { id: 5, title: "Netflix", description: "Monthly subscription", amount: 1200, type: "expense", category: "Entertainment", date: "2025-05-23" },
  { id: 6, title: "Salary", description: "Monthly pay", amount: 65000, type: "income", category: "Income", date: "2025-05-01" },
  { id: 7, title: "Electricity", description: "KPLC", amount: 2500, type: "expense", category: "Bills & Utilities", date: "2025-05-20" },
  { id: 8, title: "Dinner", description: "Restaurant", amount: 3200, type: "expense", category: "Food & Drinks", date: "2025-05-18" },
];

const defaultBudgets = [
  { category: "Food & Drinks", limit: 10000, color: "#10b981", icon: "UtensilsCrossed" },
  { category: "Transport", limit: 5000, color: "#6366f1", icon: "Bus" },
  { category: "Shopping", limit: 3000, color: "#f59e0b", icon: "ShoppingBag" },
  { category: "Entertainment", limit: 2000, color: "#ec4899", icon: "Star" },
  { category: "Bills & Utilities", limit: 2500, color: "#0ea5e9", icon: "Receipt" },
  { category: "Others", limit: 3000, color: "#8b5cf6", icon: "MoreHorizontal" },
];

export const FinanceProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("fintrack_transactions");
    return saved ? JSON.parse(saved) : defaultTransactions;
  });

  const [budgets, setBudgets] = useState(() => {
    const saved = localStorage.getItem("fintrack_budgets");
    return saved ? JSON.parse(saved) : defaultBudgets;
  });

  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("fintrack_darkmode") === "true");
  const [currentMonth, setCurrentMonth] = useState(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
  });

  const [goals, setGoals] = useState(() => {
    const saved = localStorage.getItem("fintrack_goals");
    return saved
      ? JSON.parse(saved)
      : { estimatedBalance: 0, savingsGoal: 0, monthlyExpenseLimit: 0 };
  });

  useEffect(() => { localStorage.setItem("fintrack_goals", JSON.stringify(goals)); }, [goals]);

  function updateGoals(newGoals) {
    setGoals((prev) => ({ ...prev, ...newGoals }));
  }

  useEffect(() => { localStorage.setItem("fintrack_transactions", JSON.stringify(transactions)); }, [transactions]);
  useEffect(() => { localStorage.setItem("fintrack_budgets", JSON.stringify(budgets)); }, [budgets]);
  useEffect(() => {
    localStorage.setItem("fintrack_darkmode", darkMode);
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);

  const addTransaction = (tx) => {
    const newTx = { ...tx, id: Date.now() };
    setTransactions((prev) => [newTx, ...prev]);
  };

  const deleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const updateBudget = (category, limit) => {
    setBudgets((prev) => prev.map((b) => b.category === category ? { ...b, limit } : b));
  };

  const filteredTransactions = useMemo(() =>
    transactions.filter((t) => t.date.startsWith(currentMonth)),
  [transactions, currentMonth]);

  const totalIncome = filteredTransactions.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0);
  const totalExpenses = filteredTransactions.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0);
  const totalBalance = totalIncome - totalExpenses;

  const expensesByCategory = useMemo(() => {
    const data = {};
    filteredTransactions.filter((t) => t.type === "expense").forEach((t) => {
      data[t.category] = (data[t.category] || 0) + t.amount;
    });
    return Object.entries(data).map(([name, value]) => ({ name, value }));
  }, [filteredTransactions]);

  const spendingData = useMemo(() => {
    const [year, month] = currentMonth.split("-");
    const daysInMonth = new Date(Number(year), Number(month), 0).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => {
      const day = i + 1;
      const dateStr = `${currentMonth}-${String(day).padStart(2, "0")}`;
      const amount = filteredTransactions
        .filter((t) => t.type === "expense" && t.date === dateStr)
        .reduce((s, t) => s + t.amount, 0);
      return { day: `${day}`, amount };
    });
  }, [filteredTransactions, currentMonth]);

  const budgetProgress = budgets.map((b) => {
    const spent = filteredTransactions
      .filter((t) => t.type === "expense" && t.category === b.category)
      .reduce((s, t) => s + t.amount, 0);
    return { ...b, spent, percent: Math.min(100, Math.round((spent / b.limit) * 100)) };
  });

  return (
    <FinanceContext.Provider value={{
      transactions, budgets, darkMode, currentMonth, goals,
      totalIncome, totalExpenses, totalBalance, savings: totalBalance,
      expensesByCategory, spendingData, filteredTransactions, budgetProgress,
      addTransaction, deleteTransaction, updateBudget, updateGoals,
      setDarkMode, setCurrentMonth,
    }}>
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => useContext(FinanceContext);