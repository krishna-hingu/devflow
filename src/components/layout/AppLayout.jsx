import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

function AppLayout() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isDesktopSidebarOpen, setIsDesktopSidebarOpen] = useState(true);

  const closeMobileSidebar = () => {
    setIsMobileSidebarOpen(false);
  };

  const toggleDesktopSidebar = () => {
    setIsDesktopSidebarOpen((isOpen) => !isOpen);
  };

  return (
    <div className="flex min-h-dvh bg-devflow-background text-devflow-text">
      {/* Mobile backdrop closes the drawer when the user taps outside it. */}
      {isMobileSidebarOpen && (
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={closeMobileSidebar}
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
        />
      )}

      <Sidebar
        isMobileOpen={isMobileSidebarOpen}
        isDesktopOpen={isDesktopSidebarOpen}
        onClose={closeMobileSidebar}
      />

      <div className="flex min-h-dvh min-w-0 flex-1 flex-col">
        <Header
          onMobileMenuClick={() =>
            setIsMobileSidebarOpen((isOpen) => !isOpen)
          }
          isMobileSidebarOpen={isMobileSidebarOpen}
          onDesktopSidebarToggle={toggleDesktopSidebar}
          isDesktopSidebarOpen={isDesktopSidebarOpen}
        />

        <main className="min-h-[calc(100dvh-3.5rem)] w-full min-w-0 flex-1 bg-devflow-background px-3 py-3 sm:px-4 sm:py-4 lg:p-4 xl:p-5">
          <div className="mx-auto w-full max-w-screen-xl min-w-0">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
