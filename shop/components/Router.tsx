import { Route, Routes } from 'react-router-dom';
import React from 'react-native';
import { routes } from '../constants/routes';
import Login from './pages/Login';
const Router = () => {
  return (
    <Routes>
      <Route path={routes.auth} element={<Login />}></Route>
    </Routes>
  );
};

export default Router;
