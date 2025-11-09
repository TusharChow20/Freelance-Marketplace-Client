import React, { use } from "react";
import { NavLink } from "react-router";
import { AuthContext } from "../Provider/AuthContext";
import { User } from "lucide-react";

const Navbar = () => {
  const { user, logOut } = use(AuthContext);
  console.log(user);

  const handleSignOut = () => {
    logOut()
      .then((res) => console.log("googd"))
      .catch((error) => console.log(error));
  };
  return (
    <div className="top-0 left-0 right-0 z-50">
      <div className="navbar bg-base-100/80 backdrop-blur-md shadow-sm px-1 md:px-10">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={-1}
              className="menu menu-sm dropdown-content bg-base-100/95 backdrop-blur-md rounded-box z-1 mt-3 w-52 p-2 shadow-lg"
            >
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/allJobs">All Jobs</NavLink>
              </li>
              <li>
                <NavLink to="/add-job">Add a Job</NavLink>
              </li>
              <li>
                <NavLink to="/my-accepted-tasks">My Accepted Tasks</NavLink>
              </li>
            </ul>
          </div>
          <NavLink
            to="/"
            className="btn btn-ghost text-xl font-bold bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent hover:from-indigo-700 hover:to-cyan-700"
          >
            Task Rio
          </NavLink>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/allJobs">All Jobs</NavLink>
            </li>
            <li>
              <NavLink to="/add-job">Add a Job</NavLink>
            </li>
            <li>
              <NavLink to="/my-accepted-tasks">My Accepted Tasks</NavLink>
            </li>
          </ul>
        </div>
        <div className="navbar-end gap-5">
          <label className="swap swap-rotate">
            <input type="checkbox" className="theme-controller" value="dark" />
            <svg
              className="swap-off h-8 w-8 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>
            <svg
              className="swap-on h-8 w-8 fill-current "
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
          </label>
          {user ? (
            <>
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    {user.photoURL ? (
                      <img
                        alt={user.displayName || "User"}
                        src={user.photoURL}
                      />
                    ) : (
                      <div className="bg-neutral text-neutral-content w-full h-full flex items-center justify-center">
                        <User size={24} />
                      </div>
                    )}
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                >
                  <li className="menu-title">
                    <span>{user.email || "User"}</span>
                  </li>
                </ul>
              </div>
              <NavLink
                to="/login"
                onClick={handleSignOut}
                className="px-3 py-2  font-medium transition-colors btn border-0 bg-transparent text-xl"
              >
                Sign Out
              </NavLink>
            </>
          ) : (
            <NavLink
              to="/login"
              className="px-3 py-2  font-medium transition-colors btn border-0 bg-transparent text-xl"
            >
              Login
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
