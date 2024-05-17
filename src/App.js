import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Search from './component/Search';
import User from './component/User';
import './css/index.css';

const App = () => {
  return (
    <Router>
      <div className="app">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Search />} />
            <Route path="/user/:username" element={<User />} />
          </Routes>
        </AnimatePresence>
      </div>
    </Router>
  );
};

export default App;
