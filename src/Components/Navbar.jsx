import React from "react";
import { NavLink } from "react-router";

const Navbar = () => {
  return (
    <div className=" top-0 left-0 right-0 z-50">
      <div className="navbar bg-white/80 backdrop-blur-md shadow-sm">
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
              className="menu menu-sm dropdown-content bg-white/95 backdrop-blur-md rounded-box z-1 mt-3 w-52 p-2 shadow-lg"
            >
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/all-jobs">All Jobs</NavLink>
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
            className="btn btn-ghost text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
          >
            JobPortal
          </NavLink>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/all-jobs">All Jobs</NavLink>
            </li>
            <li>
              <NavLink to="/add-job">Add a Job</NavLink>
            </li>
            <li>
              <NavLink to="/my-accepted-tasks">My Accepted Tasks</NavLink>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <NavLink
            to="/login"
            className="btn bg-gradient-to-r from-blue-600 to-purple-600 text-white border-none hover:from-blue-700 hover:to-purple-700"
          >
            Login
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
