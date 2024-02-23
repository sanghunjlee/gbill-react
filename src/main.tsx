import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css';

import HomePage from './pages/home'
import Error from './pages/error'
import Trans from './pages/trans';
import TransAdd from './pages/trans/add';
import TransEdit, {loader as transEditLoader} from './pages/trans/edit';
import TransDetail, {loader as transDetailLoader} from './pages/trans/detail';
import MainLayout from './layouts/mainLayout';
import TransLayout from './layouts/transLayout';

const router = createBrowserRouter([
  {
    path: "gbill-react",
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: "trans",
        element: <TransLayout />,
        children: [
          {
            index: true,
            element: <Trans />,
          },
          {
            path: "add",
            element: <TransAdd />,
          },
          {
            path: "detail/:transId",
            element: <TransDetail />,
            loader: transDetailLoader
          },
          {
            path: "edit/:transId",
            element: <TransEdit />,
            loader: transEditLoader
          },
          {
            path: "delete/:transId"
          }
        ]
      },
    ]
  },
])

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);