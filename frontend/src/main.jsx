import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import store from './store.js';
import { Provider } from 'react-redux';

import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import HomeScreen from './screens/HomeScreen.jsx';
import LoginScreen from './screens/LoginScreen.jsx';
import AdminLoginScreen from "./screens/AdminLoginScreen.jsx";
import  RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from "./screens/ProfileScreen.jsx";
import UserDashBoard from "./screens/UserDashBoard.jsx";


import PrivateRoute from "./Components/PrivateRoute.jsx";
import AdminPrivateRoute from "./Components/AdminPrivateRoute.jsx";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="/admin" element={<AdminLoginScreen />} />
      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<ProfileScreen />} />
      </Route>
      <Route path="" element={<AdminPrivateRoute />}>
        <Route path="/admin/dashboard" element={<UserDashBoard />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
