import { useState } from "react";
import { FinanceProvider } from "./context/FinanceContext";
import Header from "./Header.jsx";
import Sidebar from "./Sidebar.jsx";
import SummaryCard from "./SummaryCard.jsx";
import SpendingOverview from "./SpendingOverview.jsx";
import Expenses from "./Expenses.jsx";
import BudgetCard from "./BudgetCard.jsx";
import RecentTransactions from "./RecentTransactions.jsx";
import Addtransactionmodal from "./Addtransactionmodal.jsx";
import "./App.css";

function AppContent() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="app-layout">
      <Sidebar onAddTransaction={() => setIsModalOpen(true)} />
      <main className="main-content">
        <Header />
        <SummaryCard />

        <div className="charts-grid">
          <SpendingOverview />
          <Expenses />
        </div>

        <div className="charts-grid">
          <RecentTransactions />
          <BudgetCard />
        </div>
      </main>

      <Addtransactionmodal
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