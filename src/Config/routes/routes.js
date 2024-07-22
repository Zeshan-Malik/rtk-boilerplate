import React from 'react';
import Public from './publicRoute';
import Private from './privateRoute';
import Login from '../../Components/Auth/Login/Login';
import Signup from '../../Components/Auth/Signup/Signup';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../../Components/Dashboard';
import UserSettings from '../../Components/UserSettings';
import TopBarLayOut from '../../Components/TopbarLayout.js';
import ProductsList from '../../Components/Products/index.js';
function RouteList() {
  const isAuthenticated =true // handle auth token methode here

  return (
    <Routes>
      <Route path="/login" element={<Public Component={Login}/>} />
      <Route path="/signup" element={<Public Component={Signup}/>} />
      <Route path="/dashboard" element={<Private Component={Dashboard} isAuthenticated={isAuthenticated} />} />
      <Route path="/products-listing" element={<Private Component={ProductsList} isAuthenticated={isAuthenticated} />} />
      <Route path="/user-settings" element={<Private Component={UserSettings} isAuthenticated={isAuthenticated} />} />
    </Routes>
  );
}

export default RouteList;