import {
  Utensils,
  Car,
  Laptop,
  BookOpen,
  ShoppingCart,
  Receipt,
  Star,
  ShoppingBag,
  Bus,
  MoreHorizontal,
  Wallet,
} from "lucide-react";
import { useFinance } from "./context/FinanceContext.jsx";
import "./RecentTransactions.css";

const CATEGORY_ICONS = {
  "Food & Drinks": Utensils,
  "Transport": Car,
  "Shopping": ShoppingBag,
  "Entertainment": Star,
  "Bills & Utilities": Receipt,
  "Education": BookOpen,
  "Income": Laptop,
  "Others": MoreHorizontal,
};

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function RecentTransactions({ limit = 5 }) {
  const { transactions } = useFinance();

  const sorted = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, limit);

  return (
    <div className="recent-transactions">
      <div className="transactions-header">
        <h5>Recent Transactions</h5>
        <button className="view-all-btn">View All</button>
      </div>

      <ul className="transactions-list">
        {sorted.length === 0 && (
          <li className="transaction-empty">No transactions yet</li>
        )}

        {sorted.map((tx) => {
          const Icon = CATEGORY_ICONS[tx.category] || Wallet;
          const isIncome = tx.type === "income";

          return (
            <li key={tx.id} className="transaction-item">
              <span className="transaction-icon">
                <Icon size={18} />
              </span>

              <div className="transaction-info">
                <p className="transaction-description">{tx.title}</p>
                <p className="transaction-subtitle">{tx.description}</p>
              </div>

              <span className="transaction-category">{tx.category}</span>

              <span className={`transaction-amount ${isIncome ? "income" : "expense"}`}>
                {isIncome ? "+" : "-"} KSh {tx.amount.toLocaleString()}
              </span>

              <span className="transaction-date">{formatDate(tx.date)}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default RecentTransactions;