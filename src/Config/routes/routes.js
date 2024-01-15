import { Routes, Route } from 'react-router-dom';
import Public from './publicRoute';
import Private from './privateRoute';
import Dashboard from '../../Components/Dashboard';
import UserSettings from '../../Components/UserSettings';
import Login from '../../Components/Login';
import React from 'react';

function RouteList() {
  const isAuthenticated =true // handle auth token methode here

  return (
    <Routes>
      <Route path="/login" element={<Public Component={Login}/>} />
      <Route path="/user" element={<Private Component={Dashboard} isAuthenticated={isAuthenticated} />} />
      <Route path="/user-settings" element={<Private Component={UserSettings} isAuthenticated={isAuthenticated} />} />
    </Routes>
  );
}

export default RouteList;