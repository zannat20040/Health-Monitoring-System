import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SimpleRegistrationForm } from "./SimpleRegistrationForm.jsx";
import UserHealthTrack from "./UserHealthTrack.jsx";
import { LoginForm } from "./LoginForm.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from "./AuthProvider/AuthProvider.jsx";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <SimpleRegistrationForm />,
  },
  {
    path: "/signin",
    element: <LoginForm />,
  },
  {
    path: "/my-health",
    element: <UserHealthTrack />,
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
