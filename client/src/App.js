import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from "react-router-dom";
import './Styles/App.css';
import './Assets/Font/Font.css';
import Login from './Pages/login';
import Join from './Pages/join';
import Attendance from './Pages/attendance';
import Task from './Pages/task';
import WorkLogs from './Pages/workLogs';
import Profile from './Pages/profile';
import { useDispatch } from 'react-redux';
import { USER_AUTH_REQUEST } from "./reducers/user";
import MainLayout from './layouts/MainLayout';
import DashboardPage from './adminPages/DashboardPage';
import AttendancePage from './adminPages/AttendancePage';
import TaskStatsPage from './adminPages/TaskStatsPage';
import EmployeesPage from './adminPages/EmployeesPage';
import SettingsPage from './adminPages/SettingsPage';
import Auth from './adminPages/auth';
import Vacation from './adminPages/vacation';
import Time from './adminPages/time';
import Taskcopy from './adminPages/task';
import WorkAddressCopy from './adminPages/companyAddress';
import BottomBar from './components/BottomBar';


// import { AuthProvider } from './adminContext/adminContext';

function App() {

  const dispatch = useDispatch();
  const location = useLocation();
  const adminPage = location.pathname.startsWith("/admin");
  useEffect(() => {
    dispatch({
      type: USER_AUTH_REQUEST,
    });
  }, []);
  
  const showBottomBar = location.pathname !== '/' && location.pathname !== '/join';

  return (
    <>
      {adminPage ? (
        <Routes>
          <Route path="/admin" element={<MainLayout />}>
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="attendance" element={<AttendancePage />} />
            <Route path="tasks" element={<TaskStatsPage />} />
            <Route path="employees" element={<EmployeesPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="auth" element={<Auth />} />
            <Route path="vacation" element={<Vacation />} />
            <Route path="time" element={<Time />} />
            <Route path="task" element={<Taskcopy />} />
            <Route path="company/address" element={<WorkAddressCopy />} />
          </Route>
        </Routes>
      ) : (
        <div className="App">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/join" element={<Join />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/task" element={<Task />} />
            <Route path="/workLogs" element={<WorkLogs />} />
            <Route path="/profile" element={<Profile />} />

          </Routes>
          {showBottomBar && <BottomBar />}
        </div>
      )}


    </>
  );
}

export default App;
