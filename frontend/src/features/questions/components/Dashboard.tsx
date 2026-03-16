import { type ReactNode } from 'react';
import AppNavbar from '../../../shared/components/Navbar';
import '../pages/QuestionPage.css'; 

interface DashboardProps {
  children: ReactNode;
}

export default function Dashboard({ children }: DashboardProps) {
  return (
    <div className="flex flex-col h-screen bg-gray-50 w-full overflow-hidden">
      <AppNavbar />
      <main className="flex-1 p-8 overflow-y-auto w-full mx-auto">
        {children}
      </main>
    </div>
  );
}
