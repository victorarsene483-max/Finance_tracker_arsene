import { Wallet, TrendingUp, TrendingDown, PieChart } from "lucide-react";
import { useFinance } from "./context/FinanceContext.jsx";
function formatCurrency(amount) {
  return `KSh ${Math.round(amount).toLocaleString()}`;
}

function SummaryCard() {
  const { totalBalance, totalIncome, totalExpenses, goals } = useFinance();
  const { estimatedBalance, savingsGoal, monthlyExpenseLimit } = goals;

  const isOverExpenseLimit = monthlyExpenseLimit > 0 && totalExpenses > monthlyExpenseLimit;
  const savingsProgress = savingsGoal > 0 ? Math.min(100, Math.round((totalBalance / savingsGoal) * 100)) : 0;

  const summaryData = [
    {
      label: "Total Balance",
      value: formatCurrency(totalBalance),
      change:
        estimatedBalance > 0
          ? `${formatCurrency(totalBalance - estimatedBalance)} vs estimate`
          : "No estimate set",
      trend: totalBalance >= estimatedBalance ? "up" : "down",
      icon: Wallet,
      variant: "balance",
    },
    {
      label: "Total Income",
      value: formatCurrency(totalIncome),
      change: "This month",
      trend: "up",
      icon: TrendingUp,
      variant: "income",
    },
    {
      label: "Total Expenses",
      value: formatCurrency(totalExpenses),
      change: isOverExpenseLimit
        ? `Over limit of ${formatCurrency(monthlyExpenseLimit)}`
        : monthlyExpenseLimit > 0
        ? `${formatCurrency(monthlyExpenseLimit - totalExpenses)} left`
        : "No limit set",
      trend: isOverExpenseLimit ? "down" : "up",
      icon: TrendingDown,
      variant: "expenses",
    },
    {
      label: "Savings Goal",
      value: savingsGoal > 0 ? `${savingsProgress}%` : formatCurrency(totalBalance),
      change: savingsGoal > 0 ? `of ${formatCurrency(savingsGoal)} goal` : "No goal set",
      trend: savingsProgress >= 100 ? "up" : "up",
      icon: PieChart,
      variant: "savings",
    },
  ];

  return (
    <div className="summary-cards">
      {summaryData.map(({ label, value, change, trend, icon: Icon, variant }) => (
        <div className="summary-card" key={label}>
          <span className={`card-icon ${variant}-icon`}>
            <Icon size={20} />
          </span>

          <div className="card-body">
            <p className="card-label">{label}</p>
            <p className="card-value">{value}</p>
            <p className={`card-change ${trend}`}>
              {trend === "up" ? "↑" : "↓"} {change}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SummaryCard;