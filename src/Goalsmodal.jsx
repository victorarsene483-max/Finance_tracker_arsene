import { useState } from "react";
import { X } from "lucide-react";
import { useFinance } from "./context/FinanceContext.jsx";
import "./Goalsmodal.css";

function GoalsModal({ isOpen, onClose }) {
  const { goals, updateGoals } = useFinance();
  const [draft, setDraft] = useState({});

  if (!isOpen) return null;

  function handleChange(field, value) {
    setDraft((prev) => ({ ...prev, [field]: value }));
  }

  function handleSave(event) {
    event.preventDefault();
    const updates = {};

    if (draft.estimatedBalance !== undefined && draft.estimatedBalance !== "") {
      updates.estimatedBalance = Number(draft.estimatedBalance) || 0;
    }
    if (draft.savingsGoal !== undefined && draft.savingsGoal !== "") {
      updates.savingsGoal = Number(draft.savingsGoal) || 0;
    }
    if (draft.monthlyExpenseLimit !== undefined && draft.monthlyExpenseLimit !== "") {
      updates.monthlyExpenseLimit = Number(draft.monthlyExpenseLimit) || 0;
    }

    updateGoals(updates);
    setDraft({});
    onClose();
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Set Your Goals</h3>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form className="modal-form" onSubmit={handleSave}>
          <label>
            <span>Estimated Balance</span>
            <input
              type="number"
              min="0"
              value={draft.estimatedBalance ?? ""}
              onChange={(e) => handleChange("estimatedBalance", e.target.value)}
              placeholder={`Current: KSh ${goals.estimatedBalance.toLocaleString()}`}
            />
          </label>

          <label>
            <span>Savings Goal</span>
            <input
              type="number"
              min="0"
              value={draft.savingsGoal ?? ""}
              onChange={(e) => handleChange("savingsGoal", e.target.value)}
              placeholder={`Current: KSh ${goals.savingsGoal.toLocaleString()}`}
            />
          </label>

          <label>
            <span>Monthly Expense Limit</span>
            <input
              type="number"
              min="0"
              value={draft.monthlyExpenseLimit ?? ""}
              onChange={(e) => handleChange("monthlyExpenseLimit", e.target.value)}
              placeholder={`Current: KSh ${goals.monthlyExpenseLimit.toLocaleString()}`}
            />
          </label>

          <button type="submit" className="modal-submit-btn">
            Save Goals
          </button>
        </form>
      </div>
    </div>
  );
}

export default GoalsModal;