import React, { useState } from "react";
import apiCall from "../../utils/axiosInstance";
const Login = () => {

    const [emailId , setEmailId] = useState("nami@gmail.com");
    const [password,setPassword] = useState("Nami1234#");

    const handleClick = async()=>{
        try {
            const res = apiCall.post("/login" , {emailId , password})
            console.log(res);
        } catch (error) {
            console.error(error)
        }

    }



  return (
    <div className="card card-border bg-base-300 w-xl flex justify-center items-center w-3x p-2 m-4">
      <div className="card-body">
        <h2 className="card-title flex justify-center text-purple-400 text-xl">Login</h2>
        {/* Email Field */}
        <label className="input validator w-sm m-3 p-1">
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
          <input type="email" placeholder="Email" required className="input input-primary" value={emailId} onChange={(e)=>setEmailId(e.target.value)} />
        </label>
        <div className="validator-hint hidden">Enter valid email address</div>
      

            {/* Password Field */}
        <label className="input validator w-sm m-3 p-1">
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
            onChange={(e)=>setPassword(e.target.value)}
          />
        </label>

        <p className="validator-hint hidden">
          Must be more than 8 characters, including
          <br />
          One Letter <br />
          One Special Symbol<br />
          One number 
        </p>

        <div className="card-actions flex justify-center mt-5">
          <button className="btn btn-primary " onClick={handleClick}>Login</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
