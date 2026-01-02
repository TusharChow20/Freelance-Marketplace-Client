import React from "react";
import { NavLink, Outlet } from "react-router";
import { User } from "lucide-react";

const SidebarLink = ({ to, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-base-200 ${
        isActive ? "bg-base-200 font-semibold" : ""
      }`
    }
  >
    {children}
  </NavLink>
);

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-base-100">
      <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">
        <aside className="bg-white/5 rounded-lg p-4 sticky top-6 self-start">
          <div className="flex items-center gap-3 mb-6">
            <div className="avatar placeholder">
              <div className="bg-primary text-primary-content rounded-full w-12 h-12 flex items-center justify-center">
                <User />
              </div>
            </div>
            <div>
              <div className="font-semibold">Your Dashboard</div>
              <div className="text-sm text-gray-400">
                Manage your jobs & profile
              </div>
            </div>
          </div>

          <nav className="space-y-2">
            <SidebarLink to="/dashboard">Home</SidebarLink>
            <SidebarLink to="/dashboard/my-jobs">My Added Jobs</SidebarLink>
            <SidebarLink to="/dashboard/accepted">Accepted Jobs</SidebarLink>
            <SidebarLink to="/dashboard/profile">Profile</SidebarLink>
          </nav>
        </aside>

        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
