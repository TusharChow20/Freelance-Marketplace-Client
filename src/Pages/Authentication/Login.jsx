import React, { use, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../../Provider/AuthContext";
import { NavLink, useLocation, useNavigate } from "react-router";
const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  // Controlled form state for inline validation
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { googleLogin, logIn } = use(AuthContext);

  const validate = () => {
    const errs = {};
    if (!email) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errs.email = "Enter a valid email";
    if (!password) errs.password = "Password is required";
    else if (password.length < 6)
      errs.password = "Password must be at least 6 characters";

    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const submitForm = async () => {
    if (!validate()) return false;
    setIsSubmitting(true);
    setError("");
    try {
      await logIn(email, password);
      toast.success("Login successful! Redirecting...", {
        duration: 1000,
        position: "top-right",
        style: { background: "#10b981", color: "#fff" },
        icon: "✅",
      });
      setTimeout(() => {
        navigate(`${location.state ? location.state : "/"}`);
      }, 1200);
      return true;
    } catch (err) {
      // Map common firebase errors
      let errorMessage = "Login failed. Please try again.";
      if (err?.code === "auth/user-not-found")
        errorMessage = "No account found with this email";
      else if (err?.code === "auth/wrong-password")
        errorMessage = "Incorrect password";
      else if (err?.code === "auth/invalid-email")
        errorMessage = "Invalid email address";
      else if (err?.code === "auth/invalid-credential")
        errorMessage = "Invalid email or password";
      else if (err?.code === "auth/too-many-requests")
        errorMessage = "Too many failed attempts. Please try again later";

      toast.error(errorMessage, {
        duration: 4000,
        position: "top-right",
        style: { background: "#ef4444", color: "#fff" },
        icon: "❌",
      });
      setError(errorMessage);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitForm();
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then(() => {
        toast.success(
          `Google login successful! Redirecting to ${location.state || "Home"}`,
          {
            duration: 3000,
            position: "top-right",
            style: {
              background: "#10b981",
              color: "#fff",
            },
            icon: "🎉",
          }
        );
        setTimeout(() => {
          navigate(`${location.state ? location.state : "/"}`);
        }, 1600);
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

  const handleDemo = async () => {
    // Demo credentials (change if you have a seeded demo user)
    const demoEmail = "demo@taskrio.com";
    const demoPass = "Demo123!";
    setEmail(demoEmail);
    setPassword(demoPass);
    // auto submit
    await submitForm();
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

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-4">
            <label className="block  text-sm font-bold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setFieldErrors((prev) => ({ ...prev, email: undefined }));
              }}
              aria-invalid={fieldErrors.email ? "true" : "false"}
              aria-describedby="email-error"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter your email"
            />
            {fieldErrors.email && (
              <p
                id="email-error"
                role="alert"
                className="text-sm text-red-600 mt-1"
              >
                {fieldErrors.email}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block  text-sm font-bold mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setFieldErrors((prev) => ({ ...prev, password: undefined }));
              }}
              aria-invalid={fieldErrors.password ? "true" : "false"}
              aria-describedby="password-error"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter your password"
            />
            {fieldErrors.password && (
              <p
                id="password-error"
                role="alert"
                className="text-sm text-red-600 mt-1"
              >
                {fieldErrors.password}
              </p>
            )}
          </div>

          <div className="mb-4 text-right">
            <h1 className="text-sm text-blue-500 hover:underline">
              Forgot Password?
            </h1>
          </div>

          <div className="flex gap-3 mb-4">
            <button
              type="button"
              onClick={handleDemo}
              className="btn btn-ghost btn-sm"
            >
              Use Demo Account
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200 ${
                isSubmitting ? "loading opacity-75" : ""
              }`}
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </div>
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
          <p className="text-gray-700 text-sm">
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
