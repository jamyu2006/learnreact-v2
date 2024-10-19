import React, { Children, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

import Root, {loader as rootLoader, action as rootAction} from "./routes/root";
import ErrorPage from "./error-page";
import Contact, {loader as contactLoader,} from "./routes/contact";

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        path: "contacts/:contactID",
        element: <Contact />,
        loader: contactLoader,
      },
    ],
  },
]);

import App from "./App";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
);