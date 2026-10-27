import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { LoginPage } from './components/auth/LoginPage';
import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import { OverviewTab } from './components/overview/OverviewTab';
import { SalesDivisionTab } from './components/divisions/SalesDivisionTab';
import { MarketingDivisionTab } from './components/divisions/MarketingDivisionTab';
import { UfukCendekiaTab } from './components/divisions/UfukCendekiaTab';
import { PersonalWorkspaceTab } from './components/personal/PersonalWorkspaceTab';
import { OrderManagementTab } from './components/orders/OrderManagementTab';
import { BudgetManagementTab } from './components/budget/BudgetManagementTab';
import { SettingsTab } from './components/settings/SettingsTab';
import { NewTaskModal } from './components/modals/NewTaskModal';
import { CalendarEventModal } from './components/modals/CalendarEventModal';

const MainAppContent: React.FC = () => {
  const { currentUser, activeTab, selectedDivisionSubTab } = useApp();

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);

  // If user is not logged in, render Login Page (with Google Workspace Kolibrinest login & guest order request)
  if (!currentUser) {
    return <LoginPage />;
  }

  // Render content according to active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <OverviewTab
            onOpenNewTaskModal={() => setIsNewTaskModalOpen(true)}
            onOpenCalendarModal={() => setIsCalendarModalOpen(true)}
          />
        );

      case 'divisions':
        if (selectedDivisionSubTab === 'sales') {
          return (
            <SalesDivisionTab
              onOpenCalendarModal={() => setIsCalendarModalOpen(true)}
            />
          );
        }
        if (selectedDivisionSubTab === 'marketing') {
          return (
            <MarketingDivisionTab
              onOpenCalendarModal={() => setIsCalendarModalOpen(true)}
            />
          );
        }
        if (selectedDivisionSubTab === 'ufuk_cendekia') {
          return (
            <UfukCendekiaTab
              onOpenCalendarModal={() => setIsCalendarModalOpen(true)}
            />
          );
        }
        return (
          <SalesDivisionTab
            onOpenCalendarModal={() => setIsCalendarModalOpen(true)}
          />
        );

      case 'personal':
        return (
          <PersonalWorkspaceTab
            onOpenNewTaskModal={() => setIsNewTaskModalOpen(true)}
          />
        );

      case 'orders':
        return <OrderManagementTab />;

      case 'budget':
        return <BudgetManagementTab />;

      case 'settings':
        return <SettingsTab />;

      default:
        return (
          <OverviewTab
            onOpenNewTaskModal={() => setIsNewTaskModalOpen(true)}
            onOpenCalendarModal={() => setIsCalendarModalOpen(true)}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-row transition-colors">
      {/* Sidebar */}
      <Sidebar
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        {/* Top Header */}
        <Header
          onOpenNewTaskModal={() => setIsNewTaskModalOpen(true)}
          onOpenCalendarModal={() => setIsCalendarModalOpen(true)}
          onToggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          mobileSidebarOpen={mobileSidebarOpen}
        />

        {/* Viewport content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {renderTabContent()}
        </main>
      </div>

      {/* Global Modals */}
      <NewTaskModal
        isOpen={isNewTaskModalOpen}
        onClose={() => setIsNewTaskModalOpen(false)}
      />
      <CalendarEventModal
        isOpen={isCalendarModalOpen}
        onClose={() => setIsCalendarModalOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
