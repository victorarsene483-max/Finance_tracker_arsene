import { useState } from "react";
import { X, Plus, Trash2 } from "lucide-react";
import { useFinance } from "./context/FinanceContext.jsx";
import "./AddTransactionModal.css";

const CATEGORIES = [
  "Food & Drinks",
  "Transport",
  "Shopping",
  "Entertainment",
  "Bills & Utilities",
  "Education",
  "Income",
  "Others",
];

function emptyRow() {
  return { title: "", amount: "", category: "Food & Drinks", type: "expense" };
}

function AddTransactionModal({ isOpen, onClose }) {
  const { addTransaction } = useFinance();
  const [rows, setRows] = useState([emptyRow()]);
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));

  if (!isOpen) return null;

  function updateRow(index, field, value) {
    setRows((prev) =>
      prev.map((row, i) => (i === index ? { ...row, [field]: value } : row))
    );
  }

  function addRow() {
    setRows((prev) => [...prev, emptyRow()]);
  }

  function removeRow(index) {
    setRows((prev) => prev.filter((_, i) => i !== index));
  }

  function handleSave(e) {
    e.preventDefault();

    const validRows = rows.filter(
      (r) => r.title.trim() !== "" && Number(r.amount) > 0
    );

    validRows.forEach((row) => {
      addTransaction({
        title: row.title.trim(),
        description: row.category,
        amount: Number(row.amount),
        type: row.type,
        category: row.category,
        date,
      });
    });

    setRows([emptyRow()]);
    onClose();
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Add Transactions</h3>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form className="modal-form" onSubmit={handleSave}>
          <label className="date-field">
            <span>Date</span>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </label>

          <div className="transaction-rows">
            {rows.map((row, index) => (
              <div className="transaction-row" key={index}>
                <input
                  type="text"
                  placeholder="e.g. Groceries"
                  value={row.title}
                  onChange={(e) => updateRow(index, "title", e.target.value)}
                />
                <input
                  type="number"
                  min="0"
                  placeholder="Amount"
                  value={row.amount}
                  onChange={(e) => updateRow(index, "amount", e.target.value)}
                />
                <select
                  value={row.category}
                  onChange={(e) => updateRow(index, "category", e.target.value)}
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <select
                  value={row.type}
                  onChange={(e) => updateRow(index, "type", e.target.value)}
                >
                  <option value="expense">Expense</option>
                  <option value="income">Income</option>
                </select>
                {rows.length > 1 && (
                  <button
                    type="button"
                    className="remove-row-btn"
                    onClick={() => removeRow(index)}
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>

          <button type="button" className="add-row-btn" onClick={addRow}>
            <Plus size={16} /> Add another item
          </button>

          <button type="submit" className="modal-submit-btn">
            Save Transactions
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddTransactionModal;