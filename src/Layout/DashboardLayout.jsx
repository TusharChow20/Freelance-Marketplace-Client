import React, { useEffect, useRef } from "react";
import { NavLink, Outlet, useLocation } from "react-router";
import {
  User,
  Home,
  FileText,
  CheckCircle,
  Settings,
  Menu,
} from "lucide-react";

const DashboardLayout = () => {
  const location = useLocation();
  const drawerRef = useRef(null);
  const touchStartX = useRef(0);

  /* ================= AUTO CLOSE ON ROUTE CHANGE ================= */
  useEffect(() => {
    const drawer = document.getElementById("dashboard-drawer");
    if (drawer && window.innerWidth < 1024) {
      drawer.checked = false;
    }
  }, [location.pathname]);

  /* ================= SWIPE TO CLOSE (MOBILE) ================= */
  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    if (touchEndX - touchStartX.current > 80) {
      const drawer = document.getElementById("dashboard-drawer");
      if (drawer) drawer.checked = false;
    }
  };

  const navLinkClass = ({ isActive }) =>
    `
    flex items-center gap-3 px-4 py-2 rounded-lg
    text-base-content
    hover:bg-base-300
    transition-all
    ${
      isActive
        ? "bg-base-300 font-semibold relative before:absolute before:-left-2 before:top-3 before:h-8 before:w-1 before:rounded-tr-md before:rounded-br-md before:bg-primary"
        : ""
    }
  `;

  return (
    <div className="drawer lg:drawer-open">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* ================= MAIN CONTENT ================= */}
      <div className="drawer-content min-h-screen bg-base-100 text-base-content">
        {/* Navbar */}
        <nav className="navbar bg-base-200 px-4 shadow-sm">
          <div className="flex items-center w-full justify-between">
            <div className="flex items-center">
              <label
                htmlFor="dashboard-drawer"
                className="btn btn-square btn-ghost lg:hidden mr-2"
              >
                <Menu className="w-5 h-5" />
              </label>
              <span className="font-semibold hidden lg:block">Dashboard</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="avatar placeholder hidden sm:flex">
                <div className="bg-primary text-primary-content rounded-full w-8 h-8 flex items-center justify-center">
                  <User className="w-4 h-4" />
                </div>
              </div>
              <button className="btn btn-ghost btn-sm hidden sm:inline">
                Profile
              </button>
            </div>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-4 py-6">
          <Outlet />
        </div>
      </div>

      {/* ================= SIDEBAR ================= */}
      <div className="drawer-side bg-base-200">
        <label
          htmlFor="dashboard-drawer"
          className="drawer-overlay lg:hidden bg-black/50 backdrop-blur-sm"
        ></label>

        <aside
          ref={drawerRef}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          className="
            w-64 min-h-full
            bg-base-200
            text-base-content
            p-4
            shadow-xl
            transition-transform
          "
        >
          {/* User */}
          <div className="flex items-center gap-3 mb-6">
            <div className="avatar placeholder">
              <div className="bg-primary text-primary-content rounded-full w-12 h-12 flex items-center justify-center">
                <User />
              </div>
            </div>
            <div>
              <div className="font-semibold">Your Dashboard</div>
              <div className="text-sm opacity-70">
                Manage your jobs & profile
              </div>
            </div>
          </div>

          {/* Menu */}
          <ul className="menu p-0 gap-1">
            <li>
              <NavLink to="/dashboard" className={navLinkClass}>
                <Home className="w-5 h-5" />
                Home
              </NavLink>
            </li>

            <li>
              <NavLink to="/dashboard/my-jobs" className={navLinkClass}>
                <FileText className="w-5 h-5" />
                My Added Jobs
              </NavLink>
            </li>

            <li>
              <NavLink to="/dashboard/accepted" className={navLinkClass}>
                <CheckCircle className="w-5 h-5" />
                Accepted Jobs
              </NavLink>
            </li>

            <li>
              <NavLink to="/dashboard/profile" className={navLinkClass}>
                <Settings className="w-5 h-5" />
                Profile
              </NavLink>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default DashboardLayout;
