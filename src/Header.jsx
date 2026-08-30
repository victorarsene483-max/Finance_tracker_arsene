import { Bell, Moon, Sun, ChevronDown } from "lucide-react";
import { useFinance } from "./context/FinanceContext.jsx";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 18) return "Good Afternoon";
  return "Good Evening";
}

function Header() {
  const { darkMode, setDarkMode, currentMonth, setCurrentMonth } = useFinance();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  const [year, month] = currentMonth.split("-");
  const displayMonth = `${monthNames[Number(month) - 1]} ${year}`;

  return (
    <div className="Header">
      <div className="greeting-block">
        <h1 className="greeting">{getGreeting()}, Arsene 👋</h1>
        <p>Here's what's happening with your finances today.</p>
      </div>

      <div className="header-actions">
        <label className="date-select" style={{ position: "relative", cursor: "pointer" }}>
          <input
            type="month"
            value={currentMonth}
            onChange={(e) => setCurrentMonth(e.target.value)}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              opacity: 0,
              cursor: "pointer",
            }}
          />
          {displayMonth}
          <ChevronDown size={16} />
        </label>

        <button className="icon-button">
          <Bell size={18} />
          <span className="badge">3</span>
        </button>

        <button
          className="icon-button"
          onClick={() => setDarkMode(!darkMode)}
          title="Toggle dark mode"
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </div>
  );
}

export default Header;