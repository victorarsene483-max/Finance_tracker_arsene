import { PieChart as PieChartIcon } from "lucide-react";
import { PieChart, Pie, Cell } from "recharts";
import { useFinance } from "./context/FinanceContext.jsx";
import "./Expenses.css";

function Expenses() {
  const { budgets } = useFinance();

  const totalBudget = budgets.reduce((sum, b) => sum + b.limit, 0);

  const expenseData = budgets
    .filter((b) => b.limit > 0)
    .map((b) => ({
      category: b.category,
      amount: b.limit,
      percent: totalBudget ? Math.round((b.limit / totalBudget) * 100) : 0,
      color: b.color,
    }));

  return (
    <div className="expenses-by-category">
      <div className="expenses-header">
        <h3>Budget Allocation by Category</h3>
      </div>

      <div className="expenses-body">
        <div className="expenses-chart">
          {expenseData.length > 0 ? (
            <PieChart width={160} height={160}>
              <Pie
                data={expenseData}
                dataKey="percent"
                nameKey="category"
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={75}
                paddingAngle={2}
              >
                {expenseData.map((entry) => (
                  <Cell key={entry.category} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          ) : (
            <p className="no-expenses">No budgets set</p>
          )}

          <div className="chart-center-label">
            <PieChartIcon size={14} className="chart-center-icon" />
            <p className="chart-total-value">
              KSh {totalBudget.toLocaleString()}
            </p>
            <p className="chart-total-label">Total</p>
          </div>
        </div>

        <ul className="expenses-legend">
          {expenseData.map(({ category, percent, amount, color }) => (
            <li key={category}>
              <span className="legend-dot" style={{ backgroundColor: color }} />
              <span className="legend-name">{category}</span>
              <span className="legend-percent">{percent}%</span>
              <span className="legend-amount">KSh {amount.toLocaleString()}</span>
            </li>
          ))}
        </ul>
      </div>

      <button className="view-report-btn">View full report</button>
    </div>
  );
}

export default Expenses;