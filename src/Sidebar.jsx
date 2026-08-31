import { useState } from "react";
import { Menu, X } from "lucide-react";
import ProfilePic from "./assets/profile.jpg";

export default function Sidebar({ onAddTransaction }) {
  const [isOpen, setIsOpen] = useState(false);

  function closeDrawer() {
    setIsOpen(false);
  }

  return (
    <>
      <button
        className="hamburger-btn"
        onClick={() => setIsOpen(true)}
        aria-label="Open menu"
      >
        <Menu size={22} />
      </button>

      {isOpen && <div className="sidebar-overlay" onClick={closeDrawer} />}

      <div className={`nav-bar ${isOpen ? "nav-bar-open" : ""}`}>
        <button
          className="sidebar-close-btn"
          onClick={closeDrawer}
          aria-label="Close menu"
        >
          <X size={20} />
        </button>

        <div className="logo">
          <h1>FinTrack</h1>
          <p>Take control of your money</p>
        </div>

        <ul>
          <li>Dashboard</li>
          <li>Transactions</li>
          <li>Analytics</li>
          <li>Budgets</li>
          <li>Categories</li>
          <li>Goals</li>
          <li>Reports</li>
          <li>Settings</li>
        </ul>

        <div className="promo">
          <h2>Track. Plan. Achieve.</h2>
          <p>Stay on top of your finances and reach your goals faster.</p>
          <div className="button">
            <button
              onClick={() => {
                onAddTransaction();
                closeDrawer();
              }}
            >
              Add Transaction
            </button>
          </div>
        </div>

        <div className="profile">
          <div className="profilePic">
            <img src={ProfilePic} alt="Victor" />
          </div>
          <p> Arsene Victor</p>
          <p>victorarsene483@email.com</p>
        </div>
      </div>
    </>
  );
}