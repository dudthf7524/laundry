import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BarLayout from "./Layouts/BarLayout";
import AuthLayout from "./Layouts/AuthLayout";
import './Styles/App.css';
import './Styles/Pages.css';
import './Assets/Font/Font.css';
import Login from './Pages/login';
import Join from './Pages/join';
import Attendance from './Pages/attendance';
import Task from './Pages/task';
import WorkLogs from './Pages/workLogs';
import Profile from './Pages/profile';

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
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/task" element={<Task />} />
            <Route path="/workLogs" element={<WorkLogs />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
