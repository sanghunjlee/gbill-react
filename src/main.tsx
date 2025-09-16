import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from '@src/common/store';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@src/index.css';

import MainLayout from '@layouts/mainLayout';
import Error from '@pages/error';
import HomePage from '@pages/home';

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
    ]
  },
])

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);