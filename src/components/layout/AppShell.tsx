import { Outlet } from 'react-router';
import TopNav from './TopNav';
import AskAi from '@/components/realty/AskAi';

export default function AppShell() {
  return (
    <div className="flex flex-col min-h-screen">
      <TopNav />
      <main className="flex-1 pb-20">
        <Outlet />
      </main>
      <AskAi />
    </div>
  );
}
