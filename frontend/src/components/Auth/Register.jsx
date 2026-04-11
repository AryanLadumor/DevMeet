import { useState } from "react";
import apiCall from "../../utils/axiosInstance";
import { useDispatch } from "react-redux";
import { addUser } from "../../store/userSlice";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = async () => {
    setError("");
    try {
      const res = await apiCall.post("/signup", {
        firstName,
        lastName,
        age,
        gender,
        emailId,
        password,
      });
      dispatch(addUser(res.data.user));
      navigate("/");
    } catch (error) {
        console.dir(error)
      setError(error.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="flex h-screen w-screen top-0 items-center justify-center">
      <div className="card card-border bg-base-300 w-xl flex justify-center items-center  ">
        <div className="card-body">
          <h2 className="card-title flex justify-center text-purple-400 text-xl">
            Register
          </h2>
          {/* FirstName */}
          <label className="input validator w-sm m-2">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </g>
            </svg>
            <input
              type="text"
              required
              placeholder="Firstname"
              pattern="[A-Za-z][A-Za-z0-9\-]*"
              minLength="3"
              maxLength="30"
              title="Only letters, numbers or dash"
              value={firstName}
              onChange={(e) => setFirstname(e.target.value)}
            />
          </label>
          <p className="validator-hint hidden">
            Must be 3 to 30 characters containing only letters, numbers or dash
          </p>
          {/* Lastname */}
          <label className="input validator w-sm m-2">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </g>
            </svg>
            <input
              type="text"
              required
              placeholder="Lastname"
              pattern="[A-Za-z][A-Za-z0-9\-]*"
              minLength="3"
              maxLength="30"
              title="Only letters, numbers or dash"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </label>
          <div className="validator-hint hidden">
            Must be 3 to 15 characters containing only letters, numbers or dash
          </div>

          {/* Email Field */}
          <label className="input validator w-sm m-2">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </g>
            </svg>
            <input
              type="email"
              placeholder="Email"
              required
              className="input input-primary"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
            />
          </label>
          <div className="validator-hint hidden">Enter valid email address</div>

          {/* Password Field */}
          <label className="input validator w-sm m-2">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
              </g>
            </svg>
            <input
              type="password"
              required
              placeholder="Password"
              minLength="8"
              pattern="(?=.*\d)(?=.*[A-Za-z])(?=.*[A-Za-z]).{8,}"
              title="Must be more than 8 characters, including number, and at least 1 letter"
              className="input input-primary"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <p className="validator-hint hidden">
            Must be more than 8 characters, including
            <br />
            One Letter <br />
            One Special Symbol
            <br />
            One number
          </p>

          {/* Age */}
          <div className="input validator w-sm m-2">
            <input
              type="number"
              className="input validator"
              placeholder="Age  17-55"
              min="17"
              max="55"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>

          {/* Gender */}
          <div className=" flex ">
            <label className="p-2">
              <input
                type="radio"
                name="gender"
                className="radio radio-secondary"
                value="male"
                checked={gender === "male"}
                onChange={(e) => setGender(e.target.value)}
              />
              &nbsp;Male
            </label>

            <label className="p-2">
              <input
                type="radio"
                name="gender"
                className="radio radio-primary"
                value="female"
                checked={gender === "female"}
                onChange={(e) => setGender(e.target.value)}
              />
              &nbsp;Female
            </label>
          </div>

          {/*  message */}
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          <div className="card-actions flex justify-center mt-5">
            <button className="btn btn-primary " onClick={handleClick}>
              Register
            </button>
          </div>
          <div className="font-semibold flex justify-center text-md">
            Already have an account . <Link to="/Login"> Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
