import React, { use, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../../Provider/AuthContext";
import { NavLink } from "react-router";
const Login = () => {
  const [error, setError] = useState("");
  const { googleLogin } = use(AuthContext);
  const handleGoogleLogin = () => {
    googleLogin()
      .then((res) => {
        toast.success(`Google login successful! Redirecting to home ${res}`, {
          duration: 3000,
          position: "top-right",
          style: {
            background: "#10b981",
            color: "#fff",
          },
          icon: "🎉",
        });
      })
      .catch((error) => {
        toast.error(error.message, {
          duration: 3000,
          position: "top-right",
          style: {
            background: "#ef4444",
            color: "#fff",
          },
          icon: "❌",
        });
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    const email = e.target.email.value;
    const password = e.target.password.value;

    // Simulate login logic
    if (email === "user@example.com" && password === "password123") {
      // Success - navigate to home
      toast.success("Login successful! Redirecting to home...", {
        duration: 3000,
        position: "top-right",
        style: {
          background: "#10b981",
          color: "#fff",
        },
        icon: "✅",
      });
      // setTimeout(() => window.location.href = "/home", 1500);
    } else {
      toast.error("Invalid email or password", {
        duration: 3000,
        position: "top-right",
        style: {
          background: "#ef4444",
          color: "#fff",
        },
        icon: "❌",
      });
    }
  };

  return (
    <div className=" min-h-screen py-10 flex items-center justify-center ">
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: "500",
          },
        }}
      />
      <div className=" p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block  text-sm font-bold mb-2">Email</label>
            <input
              type="email"
              name="email"
              // value={email}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-4">
            <label className="block  text-sm font-bold mb-2">Password</label>
            <input
              type="password"
              name="password"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter your password"
            />
          </div>

          <div className="mb-4 text-right">
            <h1 className="text-sm text-blue-500 hover:underline">
              Forgot Password?
            </h1>
          </div>

          <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200 mb-4">
            Login
          </button>
        </form>

        {/* Google */}
        <button
          onClick={handleGoogleLogin}
          className="w-full btn bg-white text-black border border-gray-300 py-2 rounded hover:bg-gray-50 transition duration-200 flex items-center justify-center gap-2"
        >
          <svg
            aria-label="Google logo"
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <g>
              <path d="m0 0H512V512H0" fill="#fff"></path>
              <path
                fill="#34a853"
                d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
              ></path>
              <path
                fill="#4285f4"
                d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
              ></path>
              <path
                fill="#fbbc02"
                d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
              ></path>
              <path
                fill="#ea4335"
                d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
              ></path>
            </g>
          </svg>
          Login with Google
        </button>

        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Don't have an account?{" "}
            <NavLink
              to="/register"
              className="text-blue-500 hover:underline font-semibold"
            >
              Register
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
