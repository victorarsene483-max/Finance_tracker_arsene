import { useState } from "react";
import { FinanceProvider } from "./context/FinanceContext";
import Header from "./Header.jsx";
import Sidebar from "./Sidebar.jsx";
import SummaryCard from "./SummaryCard.jsx";
import SpendingOverview from "./SpendingOverview.jsx";
import Expenses from "./Expenses.jsx";
import BudgetCard from "./BudgetCard.jsx";
import RecentTransactions from "./RecentTransactions.jsx";
import AddTransactionModal from "./AddTransactionModal.jsx";
import "./App.css";

function AppContent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeView, setActiveView] = useState("Dashboard");

  return (
    <div className="app-layout">
      <Sidebar
        onAddTransaction={() => setIsModalOpen(true)}
        activeView={activeView}
        onNavigate={setActiveView}
      />
      <main className="main-content">
        <Header />

        {activeView === "Dashboard" && (
          <>
            <SummaryCard />
            <div className="charts-grid">
              <SpendingOverview />
              <Expenses />
            </div>
            <div className="charts-grid">
              <RecentTransactions />
              <BudgetCard />
            </div>
          </>
        )}

        {activeView === "Transactions" && (
          <div className="single-view">
            <RecentTransactions limit={50} />
          </div>
        )}

        {activeView === "Analytics" && (
          <div className="single-view">
            <SpendingOverview />
          </div>
        )}

        {activeView === "Budgets" && (
          <div className="single-view">
            <BudgetCard />
          </div>
        )}

        {activeView === "Categories" && (
          <div className="single-view">
            <Expenses />
          </div>
        )}

        {["Goals", "Reports", "Settings"].includes(activeView) && (
          <div className="single-view coming-soon">
            <p>{activeView} coming soon.</p>
          </div>
        )}
      </main>

      <AddTransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <FinanceProvider>
      <AppContent />
    </FinanceProvider>
  );
}