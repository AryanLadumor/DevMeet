import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./components/layout/Body";
import Feed from "./components/feed/Feed";
import Login from "./components/Auth/Login";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import ProfilePage from "./pages/ProfilePage";
import ConnectionsPage from "./pages/ConnectionsPage";
import RequestsPage from "./pages/RequestsPage";
import Register from "./components/Auth/Register";
import Chat from "./components/chat/Chat";
import Premium from "./components/premium/Premium";

import AboutPage from "./pages/AboutPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsPage from "./pages/TermsPage";
import SupportPage from "./pages/SupportPage";

function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/register" element={<Register />} />
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

            <Route
              path="/connections"
              element={
                <ProtectedRoute>
                  <ConnectionsPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/requests"
              element={
                <ProtectedRoute>
                  <RequestsPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/chat/:targetUserId"
              element={
                <ProtectedRoute>
                  <Chat />
                </ProtectedRoute>
              }
            />

            <Route
              path="/premium"
              element={
                <ProtectedRoute>
                  <Premium />
                </ProtectedRoute>
              }
            />

            <Route path="/about" element={<AboutPage />} />
            <Route path="/privacy" element={<PrivacyPolicyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/support" element={<SupportPage />} />

            
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
