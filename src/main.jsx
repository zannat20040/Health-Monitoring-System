import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import { SimpleRegistrationForm } from "./SimpleRegistrationForm.jsx";
import UserHealthTrack from "./UserHealthTrack.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SimpleRegistrationForm />,
  },
  {
    path: "/my-health",
    element: <UserHealthTrack />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
