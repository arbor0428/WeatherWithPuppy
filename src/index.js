import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Notfound from './pages/NotFound';
import Home from './pages/Home';
import SearchWeather from './pages/SearchWeather/SearchWeather';
import SearchResult from './pages/SearchResult/SearchResult';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Notfound />,
    children: [
      {index: true, element: <Home />},
      {
        path: '/SearchWeather', 
        element: <SearchWeather />
      },
      {
        path: '/SearchWeather/:cityName', 
        element: <SearchResult />
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
