import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useFinance } from "./context/FinanceContext.jsx";
import "./ManageBudgetsModal.css";

function ManageBudgetsModal({ isOpen, onClose }) {
  const { budgets, updateBudget } = useFinance();
  const [draftLimits, setDraftLimits] = useState({});

  // Reset the draft values every time the modal opens — start empty so
  // typing doesn't require clearing pre-filled numbers first.
  useEffect(() => {
    if (isOpen) {
      setDraftLimits({});
    }
  }, [isOpen]);

  if (!isOpen) return null;

  function handleChange(category, value) {
    setDraftLimits((prev) => ({ ...prev, [category]: value }));
  }

  function handleSave(event) {
    event.preventDefault();
    budgets.forEach((b) => {
      const typedValue = draftLimits[b.category];
      // Only update categories the user actually typed something into;
      // leave the rest at their existing limit.
      if (typedValue !== undefined && typedValue !== "") {
        updateBudget(b.category, Number(typedValue) || 0);
      }
    });
    onClose();
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Manage Budgets</h3>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form className="modal-form" onSubmit={handleSave}>
          {budgets.map((b) => (
            <label key={b.category}>
              <span>{b.category}</span>
              <input
                type="number"
                min="0"
                value={draftLimits[b.category] ?? ""}
                onChange={(e) => handleChange(b.category, e.target.value)}
                placeholder={`Current: KSh ${b.limit.toLocaleString()}`}
              />
            </label>
          ))}

          <button type="submit" className="modal-submit-btn">
            Save Budgets
          </button>
        </form>
      </div>
    </div>
  );
}

export default ManageBudgetsModal;