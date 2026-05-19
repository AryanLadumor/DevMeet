import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { addUser, removeUser } from "../../store/userSlice";
import apiCall from "../../utils/axiosInstance";
import Footer from "./Footer";
import Header from "./Header";

const Body = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await apiCall.get("/profile/view");
        dispatch(addUser(res.data.user));
      } catch (error) {
        dispatch(removeUser());
        console.log(error);
      }
    };

    fetchUser();
  }, [dispatch]);

  return (
    /* flex flex-col: Establishes a vertical flex flow.
      min-h-screen: Ensures the container spans at least 100% of the viewport height.
      bg-base-100: Maintains a consistent global background color.
    */
    <div className="flex flex-col min-h-screen bg-base-100 transition-colors duration-300">
      {/* Global Sticky Header */}
      <Header />

      {/* Main content hub. 
        flex-1: Forces this element to grow and fill all available vertical space, 
        automatically pinning the footer to the bottom of the viewport.
      */}
      <main className="flex-1 w-full app-container py-6 sm:py-8 flex flex-col justify-center">
        <Outlet />
      </main>

      {/* Global Auto-pinning Footer */}
      <Footer />
    </div>
  );
};

export default Body;
