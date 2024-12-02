import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../app/contexts/AuthContext";
import Dashboard from "@/app/pages/Dashboard";
import Login from "../app/components/Login";
import Register from "../app/components/Register";
import SettingsLayout from "@/app/settings/SettingsLayout";
import Security from "@/app/settings/Security";
import Profile from "@/app/settings/Profile";
import { DashboardPage } from "@/app/pages/DashboardPage";
import SearchPage from "@/app/pages/SearchPage";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        element={
          <PrivateRoute>
            <Outlet />
          </PrivateRoute>
        }
      >
        <Route
          path="/"
          element={<Dashboard />}
        >
          <Route index element={<DashboardPage />} />
          <Route path="pesquisa" element={<SearchPage />} />
          <Route path="settings" element={<SettingsLayout />}>
            <Route index element={<Profile />} />
            <Route path="security" element={<Security />} />
            <Route path="notifications" element={<div>Notifications</div>} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};
