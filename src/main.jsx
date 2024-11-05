import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from "./AuthProvider/AuthProvider.jsx";
import { Toaster } from "react-hot-toast";
import SimpleRegistrationForm from "./Authentication/SimpleRegistrationForm.jsx";
import LoginForm from "./Authentication/LoginForm.jsx";
import UserHealthTrack from "./Users/UserHealthTrack.jsx";
import DoctorsMonitor from "./Doctors/DoctorsMonitor.jsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginForm />,
  },
  {
    path: "/signup",
    element: <SimpleRegistrationForm />,
  },
  {
    path: "/my-health",
    element: <UserHealthTrack />,
  },
  {
    path: "/doctors",
    element: <DoctorsMonitor />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Toaster />
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
