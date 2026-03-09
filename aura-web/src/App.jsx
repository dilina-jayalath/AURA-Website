import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import LandingLayout from "./layouts/LandingLayout";
import DeveloperLayout from "./layouts/DevLayout";
import ClientLayout from "./layouts/ClientLayout";

import LandingPage from "./routes/public/LandingPage";
import ComingSoon from "./routes/public/ComingSoon";
import Pricing from "./routes/public/Pricing";
import DocsLayout from "./routes/docs/DocsLayout";
import DocsContent from "./routes/docs/DocsContent";
import ContactUs from "./routes/public/ContactUs";

import LoginPage from "./routes/auth/LoginPage";
import RegisterPage from "./routes/auth/RegisterPage";

import ClientDashboard from "./routes/client/ClientDashboard";

import DevDashboard from "./routes/developer/DevDashboard";

import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ComingSoon />} />

          {/* Landing / marketing / docs */}
          <Route element={<LandingLayout />}>
            <Route path="/home" element={<LandingPage />} />
            <Route path="/pricing" element={<Pricing />} />

            <Route path="/docs" element={<DocsLayout />}>
              <Route index element={<DocsContent />} />
              <Route path="*" element={<DocsContent />} />
            </Route>

            <Route path="/contact-us" element={<ContactUs />} />
          </Route>

          {/* Auth pages (no dashboard chrome) */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Developer area */}
          <Route
            path="/dev"
            element={
              <ProtectedRoute allowedRoles={["developer"]}>
                <DeveloperLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<DevDashboard />} />
          </Route>

          {/* Client area */}
          <Route
            path="/client"
            element={
              <ProtectedRoute allowedRoles={["client"]}>
                <ClientLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<ClientDashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
