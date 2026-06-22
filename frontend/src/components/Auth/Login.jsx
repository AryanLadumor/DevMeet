import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addUser } from "../../store/userSlice";
import apiCall from "../../utils/axiosInstance";

const Login = () => {
  const [emailId, setEmailId] = useState("nami@gmail.com");
  const [password, setPassword] = useState("Nami1234");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    if (!emailId || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setError("");
    setLoading(true);
    try {
      const res = await apiCall.post("/login", { emailId, password });
      dispatch(addUser(res.data.user));
      navigate("/");
    } catch (error) {
      setError(
        error.response?.data?.error ||
        "Invalid email or password. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[85vh] w-full items-center justify-center p-4 sm:p-6">
      <div className="card bg-base-200 border border-base-300 w-full max-w-md shadow-2xl rounded-2xl transition-all duration-300 hover:shadow-primary/5">
        <div className="card-body p-6 sm:p-8">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-serif font-black bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent inline-block">
              Welcome Back
            </h2>
            <p className="text-sm text-base-content/60 mt-1.5 font-medium">
              Log in to see who is coding nearby
            </p>
          </div>

          <form onSubmit={handleClick} className="space-y-5">
            {/* Email Field Container */}
            <div className="form-control">
              <label htmlFor="email" className="label pt-0 pb-1.5 px-1">
                <span className="label-text font-semibold text-base-content/70 text-xs uppercase tracking-wider">
                  Email Address
                </span>
              </label>
              <div className="relative flex items-center">
                <svg
                  className="absolute left-4 h-5 w-5 opacity-40 text-base-content pointer-events-none"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </svg>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  spellCheck={false}
                  placeholder="name@example.com…"
                  className="input input-bordered w-full pl-12 h-12 bg-base-100/50 rounded-xl focus:bg-base-100 focus:border-primary transition-all font-medium"
                  value={emailId}
                  onChange={(e) => setEmailId(e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password Field Container */}
            <div className="form-control">
              <label htmlFor="password" className="label pt-0 pb-1.5 px-1">
                <span className="label-text font-semibold text-base-content/70 text-xs uppercase tracking-wider">
                  Password
                </span>
              </label>
              <div className="relative flex items-center">
                <svg
                  className="absolute left-4 h-5 w-5 opacity-40 text-base-content pointer-events-none"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                  <circle
                    cx="16.5"
                    cy="7.5"
                    r=".5"
                    fill="currentColor"
                  ></circle>
                </svg>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="input input-bordered w-full pl-12 h-12 bg-base-100/50 rounded-xl focus:bg-base-100 focus:border-primary transition-all font-medium"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>

            {/* Contextual Error Layout Alert */}
            {error && (
              <div className="alert alert-error bg-error/10 border-error/20 text-error text-sm rounded-xl py-2.5 px-4 flex items-start gap-2 animate-fadeIn" role="alert">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-5 w-5 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="font-medium leading-relaxed">{error}</span>
              </div>
            )}

            {/* Submit Control Action Button */}
            <div className="form-control pt-2">
              <button
                type="submit"
                className="btn btn-primary w-full h-12 rounded-xl text-base font-bold tracking-wide shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-200"
                disabled={loading}
              >
                {loading ? (
                  <span className="loading loading-spinner" aria-hidden="true"></span>
                ) : (
                  "Sign In"
                )}
              </button>
            </div>
          </form>

          {/* Registration Redirect Pathway links */}
          <div className="text-center mt-6 pt-5 border-t border-base-300/50 text-sm font-medium text-base-content/60">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-primary hover:text-primary-focus font-bold transition-colors ml-1 underline underline-offset-4"
            >
              Register here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
