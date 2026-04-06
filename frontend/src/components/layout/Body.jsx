import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import apiCall from "../../utils/axiosInstance";
import { useDispatch } from "react-redux";
import { addUser , removeUser} from "../../store/userSlice";
import { useEffect } from "react";

const Body = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await apiCall.get("/profile/view");
        console.log(res.data)
        dispatch(addUser(res.data.user));
      } catch (error) {
        dispatch(removeUser())
        console.log(error);
      }
    };

    fetchUser();
  }, [dispatch]);

  return (
    <div className="flex flex-col items-center ">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
