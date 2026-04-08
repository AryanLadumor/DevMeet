import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./components/layout/Body";
import Feed from "./components/feed/Feed";
import Login from "./components/Auth/Login";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route path="/" element={<Body />}>

            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Feed />
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />

          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
