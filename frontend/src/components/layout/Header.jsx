import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { removeUser } from "../../store/userSlice";
import apiCall from "../../utils/axiosInstance";

const Header = () => {
  const userInfo = useSelector((store) => store.user.userInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await apiCall.post("/logout");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      dispatch(removeUser());
      navigate("/login");
    }
  };

  // Helper function to check if a navigation tab is actively selected
  const isActive = (path) => location.pathname === path;

  // Unauthenticated Minimal Navbar View Header
  if (!userInfo) {
    return (
      <header className="navbar bg-base-100 border-b border-base-200 sticky top-0 z-50 justify-center h-16 transition-all duration-300">
        <span className="font-serif font-black text-2xl tracking-tight bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent animate-subtle-pulse">
          DevMeet
        </span>
      </header>
    );
  }

  const { photoURL, firstName } = userInfo;

  return (
    <header className="navbar bg-base-100/80 backdrop-blur-md border-b border-base-200 sticky top-0 z-50 px-4 sm:px-6 lg:px-8 h-16 transition-all duration-300">
      {/* Brand Logo Wrapper */}
      <div className="flex-1">
        <Link
          to="/"
          className="font-serif font-black text-2xl tracking-tight bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent hover:opacity-80 transition-opacity"
        >
          DevMeet
        </Link>
      </div>

      {/* Main Profile Control Actions Section */}
      <div className="flex gap-4 items-center">
        {/* Desktop Context Tab Navigation Links (Hidden on small mobile screens) */}
        <nav className="hidden md:flex items-center gap-1 mr-2">
          <Link
            to="/"
            className={`btn btn-ghost btn-sm rounded-lg font-medium tracking-wide ${
              isActive("/")
                ? "bg-primary/10 text-primary hover:bg-primary/20"
                : "text-base-content/70 hover:text-base-content"
            }`}
          >
            Feed
          </Link>
          <Link
            to="/connections"
            className={`btn btn-ghost btn-sm rounded-lg font-medium tracking-wide ${
              isActive("/connections")
                ? "bg-primary/10 text-primary hover:bg-primary/20"
                : "text-base-content/70 hover:text-base-content"
            }`}
          >
            Connections
          </Link>
          <Link
            to="/requests"
            className={`btn btn-ghost btn-sm rounded-lg font-medium tracking-wide ${
              isActive("/requests")
                ? "bg-primary/10 text-primary hover:bg-primary/20"
                : "text-base-content/70 hover:text-base-content"
            }`}
          >
            Requests
          </Link>
        </nav>

        {/* User Context Welcome Signature Message */}
        <span className="hidden sm:inline text-sm font-medium text-base-content/80">
          Welcome,{" "}
          <span className="text-secondary font-semibold">{firstName}</span>
        </span>

        {/* Optimized Touch-Target Profile Avatar Dropdown Menu Container */}
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar ring ring-base-200 hover:ring-primary/40 focus:ring-primary/60 transition-all duration-300 w-11 h-11"
          >
            <div className="w-10 rounded-full">
              <img
                alt={`${firstName}'s profile`}
                src={photoURL || "https://example.com/default-avatar.png"}
                loading="lazy"
              />
            </div>
          </div>

          <ul
            tabIndex={0}
            className="menu menu-md dropdown-content bg-base-100 rounded-xl mt-3 w-56 p-2 shadow-xl border border-base-200 focus:outline-none origin-top-right transition-all"
          >
            {/* Mobile Header Link Context (Shows active route contextual indicators for phone displays) */}
            <li className="md:hidden border-b border-base-200/60 pb-1.5 mb-1.5 px-3 py-2">
              <span className="text-xs font-bold uppercase tracking-wider text-base-content/40 p-0 block">
                Navigation
              </span>
              <div className="flex flex-col gap-1 mt-1 p-0">
                <Link
                  to="/"
                  className={`w-full text-left p-2 rounded-lg ${isActive("/") ? "bg-primary/10 text-primary font-semibold" : ""}`}
                >
                  Feed
                </Link>
                <Link
                  to="/connections"
                  className={`w-full text-left p-2 rounded-lg ${isActive("/connections") ? "bg-primary/10 text-primary font-semibold" : ""}`}
                >
                  Connections
                </Link>
                <Link
                  to="/requests"
                  className={`w-full text-left p-2 rounded-lg ${isActive("/requests") ? "bg-primary/10 text-primary font-semibold" : ""}`}
                >
                  Requests
                </Link>
              </div>
            </li>

            <li className="md:block">
              <span className="text-xs font-bold uppercase tracking-wider text-base-content/40 px-3 py-1 md:block hidden">
                Account
              </span>
              <Link
                to="/profile"
                className={`flex justify-between items-center ${isActive("/profile") ? "bg-primary/10 text-primary font-semibold" : ""}`}
              >
                My Profile
                <span className="badge badge-sm badge-secondary font-bold tracking-wide scale-90">
                  New
                </span>
              </Link>
            </li>

            <li className="md:block">
              <Link
                to="/premium"
                className={`flex justify-between items-center ${isActive("/profile") ? "bg-primary/10 text-primary font-semibold" : ""}`}
              >
                Premium
              </Link>
            </li>

            <li className="mt-1 pt-1 border-t border-base-200/60">
              <button
                onClick={handleLogout}
                className="text-error hover:bg-error/10 font-medium active:bg-error/20"
              >
                Log Out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
