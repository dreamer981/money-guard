import { Navigate, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
// import Loader from "./components/Loader/Loader";
import PrivateRoute from "../PrivateRoute";
import RestrictedRoute from "../RestrictedRoute";
import { SyncLoader } from "react-spinners";
import "./App.css";
import { Toaster } from "react-hot-toast";

const RegistrationPage = lazy(() =>
  import("../../pages/RegistrationPage/RegistrationPage")
);
const LoginPage = lazy(() => import("../../pages/LoginPage/LoginPage"));
const DashboardPage = lazy(() =>
  import("../../pages/DashboardPage/DashboardPage")
);
const HomeTab = lazy(() => import("../../pages/HomeTab/HomeTab"));
const StatisticsTab = lazy(() =>
  import("../../pages/StatisticsTab/StatisticsTab")
);
const CurrencyTab = lazy(() => import("../../pages/CurrencyTab/CurrencyTab"));
const NotFound = lazy(() => import("../../pages/NotFound/NotFound"));

function App() {
  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            background: "#333",
            color: "#fff",
          },
        }}
      />
      <Suspense fallback={<SyncLoader color="#646cff" />}>
        <Routes>
          <Route
            path="/register"
            element={<RestrictedRoute component={<RegistrationPage />} />}
          />
          <Route
            path="/login"
            element={<RestrictedRoute component={<LoginPage />} />}
          />
          <Route
            path="/dashboard"
            element={<PrivateRoute component={<DashboardPage />} />}
          />
          <Route
            path="/home"
            element={<PrivateRoute component={<HomeTab />} />}
          />
          <Route
            path="/statistics"
            element={<PrivateRoute component={<StatisticsTab />} />}
          />
          <Route
            path="/currency"
            element={<PrivateRoute component={<CurrencyTab />} />}
          />
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
