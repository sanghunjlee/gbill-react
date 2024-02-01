import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css';

import Home from './pages/home'
import Error from './pages/error'
import Trans from './pages/trans';
import TransAdd from './pages/trans/add';
import TransEdit, {loader as transEditLoader} from './pages/trans/edit';
import TransDetail, {loader as transDetailLoader} from './pages/trans/detail';
import MainLayout from './layouts/mainLayout';

const router = createBrowserRouter([
  {
    path: "gbill-react",
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "trans",
        element: <Trans />,
      },
      {
        path: "trans/add",
        element: <TransAdd />,
      },
      {
        path: "trans/detail/:transId",
        element: <TransDetail />,
        loader: transDetailLoader
      },
      {
        path: "trans/edit/:transId",
        element: <TransEdit />,
        loader: transEditLoader
      },
      {
        path: "trans/delete/:transId"
      }
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