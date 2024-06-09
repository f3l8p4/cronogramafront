import logo from './logo.svg';
import './App.css';
import { useForm } from 'react-hook-form';
import React, { useState } from 'react';
import Login from './pages/Login';
import { BrowserRouter as Router } from 'react-router-dom';
import Routers from './Routes/Routes';
function App() {
  return (
    <div className="App">
    <Router>
      <Routers/>
    </Router>
    </div>
  );
}

export default App;
