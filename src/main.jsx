import React, { Children, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

import Root, {loader as rootLoader, action as rootAction} from "./routes/root";
import ErrorPage from "./error-page";
import Contact, {loader as contactLoader, action as contactAction} from "./routes/contact";

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import EditContact, {action as editAction} from "./routes/edit";
import {action as destroyAction} from "./routes/destroy"

import Index from "./routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    loader: rootLoader,
    action: rootAction,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {index: true, element: <Index />},
          {
            path: "contacts/:contactID",
            element: <Contact />,
            loader: contactLoader,
            action: contactAction,
          },
          {
            path: "contacts/:contactId/edit",
            element: <EditContact />,
            loader: contactLoader,
            action: editAction,
          },
          {
            path: "contacts/:contactId/destroy",
            action: destroyAction,
            //errorElement: <div>Oops! There was an error.</div>,
          },
        ],
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