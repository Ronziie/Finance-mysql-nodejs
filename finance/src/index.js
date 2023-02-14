import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './Login';
import App from './App';
import Loggedin from './Loggedin';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';



ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/Loggedin" element={<Loggedin />} /> 
      <Route path="/App" element={<App />} />
      <Route path="/Register" element={<Login />} />
      <Route index element={<Login />} />    
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);
