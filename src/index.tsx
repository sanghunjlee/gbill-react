import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css';
import reportWebVitals from './reportWebVitals';

import App from './pages/App';
import Home from './pages/home'
import Error from './pages/error'
import Trans from './pages/trans';
import TransAdd from './pages/trans/add';
import TransEdit, {loader as transEditLoader} from './pages/trans/edit';

const router = createBrowserRouter([
  {
    path: "/gbill-react",
    element: <App />,
    errorElement: <Error />,
    children: [
      { index: true, 
        element: <Home />,
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
