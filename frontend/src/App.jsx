import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./components/layout/Body";
import Auth from "./components/Auth/Auth";
import Profile from "./components/profile/Profile";
import Feed from "./pages/Feed";

function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/" element={<Feed />} />
            <Route path="/auth/login" element={<Auth />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
