import { useDispatch, useSelector } from "react-redux";

import apiCall from "../../utils/axiosInstance";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../../store/userSlice";


const Header = () => {
  const userInfo = useSelector((store) => store.user.userInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await apiCall.post("/logout"); //API CALL ==> Logout
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(removeUser());
      navigate("/login")
    }
  };

  if (!userInfo) {
    return (
      <div className="flex justify-center text-purple-400 font-semibold text-3xl p-4">
        DevMeet
      </div>
    );
  }
  const { photoURL, firstName } = userInfo;
  return (
    <div className="navbar bg-base-200 shadow-sm p-2">
      {/* DevMeet Logo */}
      <div className="flex-1">
        <Link to="/" className="btn btn-soft text-xl">DevMeet</Link>
      </div>

      <div className="flex gap-2 items-center">
        <p className="text-fuchsia-400 font-semibold">Welcome {firstName}</p>
        {/* Avtar  */}
        <div className=" h-full dropdown dropdown-end mx-5">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar w-16"
          >
            {/* Avtar Image */}
            <div className="w-13 rounded-full border-[3px] border-green-500 p-[0.1rem] ">
              <img
                alt="Tailwind CSS Navbar component"
                src={photoURL}
                className="rounded-full"
              />
            </div>
          </div>
          {/* List Dropdown */}
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {/* Profile */}
            <li>
              <Link to="/profile" className="justify-between" >
                Profile
                <span className="badge">New</span>
              </Link>
            </li>
            {/* connections */}
            <li>
              <Link to="/connections">Your connetions</Link>
            </li>
            {/* Requests */}
            <li>
              <Link to="/requests">Requests</Link>
            </li>
            {/* Logout */}
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
