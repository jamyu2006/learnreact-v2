import React, { Children, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

import Root, {loader as rootLoader, action as rootAction} from "./routes/root";
import ErrorPage from "./error-page";
import Contact, {loader as contactLoader, action as contactAction} from "./routes/contact";

import EditContact, {action as editAction} from "./routes/edit";
import {action as destroyAction} from "./routes/destroy"

import Index from "./routes";

import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<Root />}
      loader={rootLoader}
      action={rootAction}
      errorElement={<ErrorPage />}
    >
      <Route errorElement={<ErrorPage />}>
        <Route index element={<Index />} />
        <Route
          path="contacts/:contactId"
          element={<Contact />}
          loader={contactLoader}
          action={contactAction}
        />
        <Route
          path="contacts/:contactId/edit"
          element={<EditContact />}
          loader={contactLoader}
          action={editAction}
        />
        <Route
          path="contacts/:contactId/destroy"
          action={destroyAction}
        />
      </Route>
    </Route>
  )
);

import App from "./App";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
);