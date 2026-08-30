import { useState } from "react";
import {
  ChevronDown,
  Utensils,
  Bus,
  ShoppingBag,
  Receipt,
  Star,
  MoreHorizontal,
} from "lucide-react";
import { useFinance } from "./context/FinanceContext.jsx";
import Managebudgetsmodal from "./Managebudgetsmodal.jsx";
import "./BudgetCard.css";

const iconMap = {
  UtensilsCrossed: Utensils,
  Bus,
  ShoppingBag,
  Star,
  Receipt,
  MoreHorizontal,
};

function BudgetCard() {
  const { budgetProgress } = useFinance();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="budget-card">
      <div className="budget-header">
        <h4>Budget Overview</h4>
        <button className="range-select">
          This Month
          <ChevronDown size={16} />
        </button>
      </div>

      <ul className="budget-list">
        {budgetProgress.map(({ category, spent, limit, percent, icon }) => {
          const Icon = iconMap[icon] || MoreHorizontal;

          return (
            <li key={category} className="budget-item">
              <span className="budget-icon">
                <Icon size={16} />
              </span>

              <div className="budget-details">
                <div className="budget-row">
                  <p className="budget-category">{category}</p>
                  <p className="budget-amounts">
                    KSh {spent.toLocaleString()} / KSh {limit.toLocaleString()}
                  </p>
                </div>

                <div className="budget-progress-track">
                  <div
                    className="budget-progress-fill"
                    style={{ width: `${Math.min(percent, 100)}%` }}
                  />
                </div>

                <p className="budget-percent">{percent}%</p>
              </div>
            </li>
          );
        })}
      </ul>

      <button className="manage-budgets-btn" onClick={() => setIsModalOpen(true)}>
        Manage Budgets
      </button>

      <Managebudgetsmodal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

export default BudgetCard;