import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BarLayout from "./Layouts/BarLayout";
import AuthLayout from "./Layouts/AuthLayout";
import './Styles/App.css';
import './Assets/Font/Font.css';
import Login from './Pages/login';
import Join from './Pages/join';
import Attendance from './Pages/attendance';
import Task from './Pages/task';
import WorkLogs from './Pages/workLogs';
import Profile from './Pages/profile';
import User from './adminPages/user';
import { useDispatch } from 'react-redux';
import { USER_AUTH_REQUEST } from "./reducers/user";
import FixedTime from './adminPages/fixedTime';


function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: USER_AUTH_REQUEST,
    });
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/join" element={<Join />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/task" element={<Task />} />
            <Route path="/workLogs" element={<WorkLogs />} />
            <Route path="/profile" element={<Profile />} />
          <Route path="/admin/user" element={<User />} />
          <Route path="/admin/time" element={<FixedTime />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
