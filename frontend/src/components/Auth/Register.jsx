import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addUser } from "../../store/userSlice";
import apiCall from "../../utils/axiosInstance";

const Register = () => {
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!firstName || !emailId || !password) {
      setError("First Name, Email, and Password fields are required.");
      return;
    }

    setError("");
    setLoading(true);
    try {
      const res = await apiCall.post("/signup", {
        firstName,
        lastName,
        age: age ? Number(age) : undefined,
        gender: gender || undefined,
        emailId,
        password,
      });
      dispatch(addUser(res.data.user));
      navigate("/");
    } catch (error) {
      setError(
        error.response?.data?.error ||
        "Registration details are invalid. Please check fields.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[90vh] w-full items-center justify-center p-4 sm:p-6">
      <div className="card bg-base-200 border border-base-300 w-full max-w-xl shadow-2xl rounded-2xl transition-all duration-300 hover:shadow-primary/5">
        <div className="card-body p-6 sm:p-8">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-serif font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent inline-block">
              Create an Account
            </h2>
            <p className="text-sm text-base-content/60 mt-1.5 font-medium">
              Join the developer cluster in your area
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            {/* Grid layout splitting name blocks cleanly across responsive breakpoints */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* First Name Container */}
              <div className="form-control">
                <label htmlFor="firstName" className="label pt-0 pb-1.5 px-1">
                  <span className="label-text font-semibold text-base-content/70 text-xs uppercase tracking-wider">
                    First Name *
                  </span>
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  autoComplete="given-name"
                  spellCheck={false}
                  placeholder="John"
                  className="input input-bordered w-full h-12 bg-base-100/50 rounded-xl focus:bg-base-100 focus:border-primary transition-all font-medium"
                  value={firstName}
                  onChange={(e) => setFirstname(e.target.value)}
                  disabled={loading}
                />
              </div>

              {/* Last Name Container */}
              <div className="form-control">
                <label htmlFor="lastName" className="label pt-0 pb-1.5 px-1">
                  <span className="label-text font-semibold text-base-content/70 text-xs uppercase tracking-wider">
                    Last Name
                  </span>
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  autoComplete="family-name"
                  spellCheck={false}
                  placeholder="Doe"
                  className="input input-bordered w-full h-12 bg-base-100/50 rounded-xl focus:bg-base-100 focus:border-primary transition-all font-medium"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>

            {/* Email Input Field Block */}
            <div className="form-control">
              <label htmlFor="email" className="label pt-0 pb-1.5 px-1">
                <span className="label-text font-semibold text-base-content/70 text-xs uppercase tracking-wider">
                  Email Address *
                </span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                spellCheck={false}
                placeholder="john.doe@example.com…"
                className="input input-bordered w-full h-12 bg-base-100/50 rounded-xl focus:bg-base-100 focus:border-primary transition-all font-medium"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                disabled={loading}
              />
            </div>

            {/* Password input Field Block */}
            <div className="form-control">
              <label htmlFor="password" className="label pt-0 pb-1.5 px-1">
                <span className="label-text font-semibold text-base-content/70 text-xs uppercase tracking-wider">
                  Password *
                </span>
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                placeholder="At least 8 strong characters…"
                className="input input-bordered w-full h-12 bg-base-100/50 rounded-xl focus:bg-base-100 focus:border-primary transition-all font-medium"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>

            {/* Split layout pairing age fields and gender selection row parameters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
              {/* Age Numeric Controller Container */}
              <div className="form-control">
                <label htmlFor="age" className="label pt-0 pb-1.5 px-1">
                  <span className="label-text font-semibold text-base-content/70 text-xs uppercase tracking-wider">
                    Age (18 - 55)
                  </span>
                </label>
                <input
                  id="age"
                  name="age"
                  type="number"
                  placeholder="24"
                  min="18"
                  max="55"
                  className="input input-bordered w-full h-12 bg-base-100/50 rounded-xl focus:bg-base-100 focus:border-primary transition-all font-medium"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  disabled={loading}
                />
              </div>

              {/* Gender Radio Inline Picker Buttons Container */}
              <div className="form-control h-12 justify-center bg-base-100/30 border border-base-300 rounded-xl px-4">
                <div className="flex justify-around gap-2">
                  <label htmlFor="gender-male" className="flex items-center gap-2 cursor-pointer text-sm font-semibold text-base-content/80">
                    <input
                      id="gender-male"
                      type="radio"
                      name="gender"
                      className="radio radio-primary radio-sm"
                      value="male"
                      checked={gender === "male"}
                      onChange={(e) => setGender(e.target.value)}
                      disabled={loading}
                    />
                    Male
                  </label>

                  <label htmlFor="gender-female" className="flex items-center gap-2 cursor-pointer text-sm font-semibold text-base-content/80">
                    <input
                      id="gender-female"
                      type="radio"
                      name="gender"
                      className="radio radio-secondary radio-sm"
                      value="female"
                      checked={gender === "female"}
                      onChange={(e) => setGender(e.target.value)}
                      disabled={loading}
                    />
                    Female
                  </label>
                </div>
              </div>
            </div>

            {/* Error messaging block context */}
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

            {/* Interactive action submission button triggers */}
            <div className="form-control pt-4">
              <button
                type="submit"
                className="btn btn-primary w-full h-12 rounded-xl text-base font-bold tracking-wide shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-200"
                disabled={loading}
              >
                {loading ? (
                  <span className="loading loading-spinner" aria-hidden="true"></span>
                ) : (
                  "Create Account"
                )}
              </button>
            </div>
          </form>

          {/* Login Pathway Redirect links text container block */}
          <div className="text-center mt-6 pt-5 border-t border-base-300/50 text-sm font-medium text-base-content/60">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary hover:text-primary-focus font-bold transition-colors ml-1 underline underline-offset-4"
            >
              Log in here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
