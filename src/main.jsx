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
import UserLayout from "./Users/UserLayout.jsx";
import HeathRecords from "./Users/HeathRecords.jsx";

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
    path: "/user",
    element: <UserLayout />,
    children: [
      {
        path: "my-health", // Changed to relative path
        element: <UserHealthTrack />,
      },
      {
        path: "records", // Changed to relative path
        element: <HeathRecords />,
      },
    ],
  },
  {
    path: "/doctors",
    element: <DoctorsMonitor />,
  },
]);

const registerServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')
        .then(registration => {
          console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch(error => {
          console.error('Service Worker registration failed:', error);
        });
    });
  }
};

registerServiceWorker();

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
