import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Home } from "./pages/public/Home";
import { About } from "./pages/public/About";
import { Login } from "./pages/public/Login";
import { Signup } from "./pages/public/Signup";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { TrainerDashboard } from "./pages/trainer/TrainerDashboard";
import { MemberDashboard } from "./pages/member/MemberDashboard";
import { Footer } from "./components/Footer";

export const App = () => {
  return (
    <BrowserRouter>
      <div className="app-layout">
        <Navbar />

        <main className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />

            <Route
              path="/admin"
              element={
                <ProtectedRoute role="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/trainer"
              element={
                <ProtectedRoute role="trainer">
                  <TrainerDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/member"
              element={
                <ProtectedRoute role="member">
                  <MemberDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
};
