import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css';
import reportWebVitals from './reportWebVitals';

import App from './App';
import Home, { loader as homeLoader } from './pages/Home'
import Error from './pages/Error'
import TransAdd from './pages/TransAdd';
import Trans, { loader as transLoader }from './pages/Trans';

const router = createBrowserRouter([
  {
    path: "/gbill-react",
    element: <App />,
    errorElement: <Error />,
    children: [
      { index: true, 
        element: <Home />,
        loader: homeLoader
      },
      {
        path: "trans",
        element: <Trans />,
        loader: transLoader
      },
      {
        path: "trans/add",
        element: <TransAdd />,
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
