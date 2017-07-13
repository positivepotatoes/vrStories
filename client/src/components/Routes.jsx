import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import Login from './components/Login.jsx';
import Home from './components/Home.jsx';

const routes = [
  { path: '/home',
    component: Home
  },
  {
    path: '/login',
    component: Login
  }
];