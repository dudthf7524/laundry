import React, { useEffect, useState } from 'react';
import { Outlet, NavLink, Navigate } from 'react-router-dom';
import { Routes, Route, useLocation, Router } from "react-router-dom";
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
import Time from './adminPages/time';
import UserList from './adminPages/userList';
import TimeManagement from './adminPages/timeManagement';
import Process from './adminPages/process';
import ProcessRegister from './adminPages/processRegister';
import WorkAddress from './adminPages/workAddress';
import MainLayout from './layouts/MainLayout';
import DashboardPage from './pages copy/DashboardPage';
import AttendancePage from './pages copy/AttendancePage';
import TaskStatsPage from './pages copy/TaskStatsPage';
import EmployeesPage from './pages copy/EmployeesPage';
import SettingsPage from './pages copy/SettingsPage';
import ProtectedRoute from './components copy/ProtectedRoute';
import Header from './components copy/Header';
import { AuthProvider } from './contexts/AuthContext';
import LoginPage from './pages copy/LoginPage';
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
  const [collapsed, setCollapsed] = useState(false);
  // return (
  //   <>
  //     {adminPage ? (
  //       // 마스터 페이지는 독립적인 구조로 렌더링
  //       <div className='App2'>
  //         {/* <aside className="sidebar">
  //         <nav className="nav-menu">
  //           <NavLink to="/" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'} end>
  //             <span className="material-icons">dashboard</span>
  //             {!collapsed && <span className="nav-text">대시보드</span>}
  //           </NavLink>
  //           <NavLink to="/users" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
  //             <span className="material-icons">people</span>
  //             {!collapsed && <span className="nav-text">사용자 관리</span>}
  //           </NavLink>
  //           <NavLink to="/transactions" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
  //             <span className="material-icons">paid</span>
  //             {!collapsed && <span className="nav-text">거래 내역</span>}
  //           </NavLink>
  //           <NavLink to="/products" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
  //             <span className="material-icons">inventory_2</span>
  //             {!collapsed && <span className="nav-text">상품 관리</span>}
  //           </NavLink>
  //           <NavLink to="/settings" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
  //             <span className="material-icons">settings</span>
  //             {!collapsed && <span className="nav-text">설정</span>}
  //           </NavLink>
  //         </nav>
  //       </aside> */}
  //         {/* <div className="admin_menu_bar">

  //           <div className='menu'>
  //             <a href='/admin/user/list'>직원관리</a>
  //           </div>
  //           <div className='menu'>
  //             <a href='/admin/process'>공정관리</a>
  //           </div>
  //           <div className='menu'>
  //             <a href='/admin/user'>권한관리</a>
  //           </div>
  //           <div className='menu'>
  //             <a href='/admin/time'>  직원별 출/퇴근 시간관리</a>
  //           </div>
  //           <div className='menu'>
  //             <a href='/admin/process'> 직원별 공정관리 </a>
  //           </div>
  //           <div className='menu'>
  //             <a href='/admin/work/address'> 근무지 등록 및 관리 </a>
  //           </div>
  //         </div> */}
  //         <Header></Header>
  //         <AuthProvider>
  //         <Routes>
  //           <Route path="/admin">
  //             <Route path="user/list" element={<UserList />} />
  //             <Route path="user" element={<User />} />
  //             <Route path="time" element={<Time />} />
  //             <Route path="time/management" element={<TimeManagement />} />
  //             <Route path="process" element={<Process />} />
  //             <Route path="process/register" element={<ProcessRegister />} />
  //             <Route path="work/address" element={<WorkAddress />} />

  //             <Route path="login" element={<LoginPage />} />
  //             <Route path="dashboard" element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
  //               <Route path="attendance" element={<AttendancePage />} />
  //               <Route path="tasks" element={<TaskStatsPage />} />
  //               <Route path="employees" element={<EmployeesPage />} />
  //               <Route path="settings" element={<SettingsPage />} />
  //             </Route>

  //           </Route>
  //         </Routes>
  //         </AuthProvider>
  //       </div>
  //     ) : (

  //       <div className="App">
  //         <Routes>
  //           <Route path="/" element={<Login />} />
  //           <Route path="/join" element={<Join />} />
  //           <Route path="/attendance" element={<Attendance />} />
  //           <Route path="/task" element={<Task />} />
  //           <Route path="/workLogs" element={<WorkLogs />} />
  //           <Route path="/profile" element={<Profile />} />

  //         </Routes>
  //       </div>
  //     )}
  //   </>
  // );
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route path="/" element={<MainLayout />}>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="attendance" element={<AttendancePage />} />
          <Route path="tasks" element={<TaskStatsPage />} />
          <Route path="employees" element={<EmployeesPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
       
        
      </Routes>
    </AuthProvider>
  );
}

export default App;
