import { Outlet } from 'react-router-dom';

import Sidebar from '../common/Sidebar/Sidebar';

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

      <main className="min-h-screen pl-[296px]">
        <Outlet />
      </main>
    </div>
  );
}