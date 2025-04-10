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
import { useDispatch, useSelector } from 'react-redux';
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
import Chart from './adminPages/chart';
import ChartLate from './adminPages/chartLate';
import BottomBar from './components/BottomBar';
import Notice from './adminPages/notice';
import LoginSuccess from './Pages/loginSuccess';
import ChangeId from './Pages/changeId';
import ChangePassword from './Pages/changePassword';
import NotFound from './Pages/notFound'; // 추가


function App() {

  const dispatch = useDispatch();
  const location = useLocation();
  const adminPage = location.pathname.startsWith("/admin");
  useEffect(() => {
    dispatch({
      type: USER_AUTH_REQUEST,
    });
  }, []);
  
  const showBottomBar =
    location.pathname !== '/' &&
    location.pathname !== '/join' &&
    location.pathname !== '/login/sucess' &&
    location.pathname !== '/change/id' &&
    location.pathname !== '/change/password';

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
            <Route path="chart" element={<Chart />} />
            <Route path="chart/late" element={<ChartLate />} />
            <Route path="notice" element={<Notice />} />
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
            <Route path="/login/sucess" element={<LoginSuccess />} />
            <Route path="/change/id" element={<ChangeId />} />
            <Route path="/change/password" element={<ChangePassword />} />
            <Route path="*" element={<NotFound  />} /> {/* ⭐ 이 줄 추가 */}
          </Routes>
          {showBottomBar && <BottomBar />}
        </div>
      )}


    </>
  );
}

export default App;
