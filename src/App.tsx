import React from 'react';
import { HashRouter, Routes, Route,  } from 'react-router-dom';
import Swap from './pages/swap';
import Home from './pages/home';
import './App.css';


function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home/:token0/:token1" element={<Home />} />
        <Route path="/swap" element={<Swap />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
