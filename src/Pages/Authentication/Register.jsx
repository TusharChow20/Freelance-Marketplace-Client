import { use, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { NavLink, useNavigate } from "react-router";
import { AuthContext } from "../../Provider/AuthContext";
import { EyeClosedIcon, EyeIcon } from "lucide-react";
import { updateProfile } from "firebase/auth";

const Register = () => {
  const navigate = useNavigate();
  const { createUser, setUser } = use(AuthContext);
  const [eyeClosed, setEyeClosed] = useState(true);
  const { googleLogin } = use(AuthContext);

  // Controlled form state + validation
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleGoogleLogin = () => {
    googleLogin()
      .then(() => {
        setTimeout(() => {
          toast.success(
            `Google registration successful! Redirecting..........`,
            {
              duration: 2000,
              position: "top-right",
              style: {
                background: "#10b981",
                color: "#fff",
              },
              icon: "🎉",
            }
          );
        }, 100);
        setTimeout(() => {
          navigate("/");
        }, 2200);
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
  const validatePassword = (pass) => {
    const hasUpperCase = /[A-Z]/.test(pass);
    const hasLowerCase = /[a-z]/.test(pass);
    const hasNumber = /[0-9]/.test(pass);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(pass);
    const isLongEnough = pass.length >= 6;

    if (!isLongEnough) {
      return "Password must be at least 6 characters long";
    }
    if (!hasUpperCase) {
      return "Password must include at least one uppercase letter";
    }
    if (!hasLowerCase) {
      return "Password must include at least one lowercase letter";
    }
    if (!hasSpecialChar) {
      return "Password must include at least one special character";
    }
    if (!hasNumber) {
      return "Password must include at least one number";
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // client-side validation
    const errs = {};
    if (!name) errs.name = "Name is required";
    if (!email) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errs.email = "Enter a valid email";
    if (!photoURL) errs.photoURL = "Photo URL is required";
    const passErr = validatePassword(password);
    if (passErr) errs.password = passErr;

    setFieldErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setIsSubmitting(true);
    try {
      const res = await createUser(email, password);
      toast.success("Registration successful! Redirecting to home...", {
        duration: 3000,
        position: "top-right",
        style: { background: "#10b981", color: "#fff" },
        icon: "✅",
      });

      await updateProfile(res.user, { displayName: name, photoURL });
      setUser({ user: res.user, displayName: name, photoURL, email });
      navigate("/");
    } catch (error) {
      let errorMessage = "Registration failed. Please try again.";
      if (error.code === "auth/email-already-in-use")
        errorMessage = "This email is already registered";
      else if (error.code === "auth/invalid-email")
        errorMessage = "Invalid email address";
      else if (error.code === "auth/weak-password")
        errorMessage = "Password is too weak";

      toast.error(errorMessage, {
        duration: 4000,
        position: "top-right",
        style: { background: "#ef4444", color: "#fff" },
        icon: "❌",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-8">
      {/* React Hot Toast Container */}
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

      <div className="p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center ">Register</h2>

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setFieldErrors((p) => ({ ...p, name: undefined }));
              }}
              aria-invalid={fieldErrors.name ? "true" : "false"}
              aria-describedby="name-error"
              className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter your name"
            />
            {fieldErrors.name && (
              <p
                id="name-error"
                role="alert"
                className="text-sm text-red-600 mt-1"
              >
                {fieldErrors.name}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setFieldErrors((p) => ({ ...p, email: undefined }));
              }}
              aria-invalid={fieldErrors.email ? "true" : "false"}
              aria-describedby="email-error"
              className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
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
            <label className="block text-gray-300 text-sm font-bold mb-2">
              Photo URL
            </label>
            <input
              type="url"
              name="photoURL"
              value={photoURL}
              onChange={(e) => {
                setPhotoURL(e.target.value);
                setFieldErrors((p) => ({ ...p, photoURL: undefined }));
              }}
              aria-invalid={fieldErrors.photoURL ? "true" : "false"}
              aria-describedby="photo-error"
              className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter photo URL"
            />
            {fieldErrors.photoURL && (
              <p
                id="photo-error"
                role="alert"
                className="text-sm text-red-600 mt-1"
              >
                {fieldErrors.photoURL}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={eyeClosed ? "password" : "text"}
                name="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setFieldErrors((p) => ({ ...p, password: undefined }));
                }}
                aria-invalid={fieldErrors.password ? "true" : "false"}
                aria-describedby="password-error"
                className="w-full px-3 py-2 border border-gray-300 pr-10 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setEyeClosed(!eyeClosed)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {eyeClosed ? (
                  <EyeClosedIcon size={20} />
                ) : (
                  <EyeIcon size={20} />
                )}
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              Must include uppercase, lowercase, special character, and be at
              least 6 characters
            </p>
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
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2 bg- rounded  transition duration-200 mb-4 bg-gray-100 text-black cursor-pointer shadow-sm ${
              isSubmitting ? "opacity-70 loading" : ""
            }`}
          >
            {isSubmitting ? "Registering..." : "Register"}
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
          SignUp with Google
        </button>

        <div className="mt-6 text-center">
          <p className="text-gray-700 text-sm">
            Already have an account?{" "}
            <NavLink
              to="/login"
              className="text-blue-500 hover:underline font-semibold"
            >
              Login
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
