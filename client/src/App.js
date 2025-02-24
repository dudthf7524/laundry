import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BarLayout from "./Layouts/BarLayout";
import AuthLayout from "./Layouts/AuthLayout";
import './Styles/App.css';
import './Styles/Pages.css';
import './Assets/Font/Font.css';
import Login from './Pages/Login';
import Join from './Pages/Join';
import Register from './Pages/Register';
import Task from './Pages/Task';
import Schedule from './Pages/Schedule';
import Profile from './Pages/Profile';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* AuthLayout Routes */}
          <Route element={<AuthLayout />}>
            <Route path="/" element={<Login />} />
            <Route path="/join" element={<Join />} />
          </Route>

          {/* BarLayout Routes */}
          <Route element={<BarLayout />}>
            <Route path="/register" element={<Register />} />
            <Route path="/task" element={<Task />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
