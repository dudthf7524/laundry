import React, { useEffect } from 'react';
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
function App() {

  const dispatch = useDispatch();
  const location = useLocation();
  const adminPage = location.pathname.startsWith("/admin");
  useEffect(() => {
    dispatch({
      type: USER_AUTH_REQUEST,
    });
  }, []);

  return (
    <>
      {adminPage ? (
        // 마스터 페이지는 독립적인 구조로 렌더링
        <div className='App2'>
          <div className="admin_menu_bar">

            <div className='menu'>
              <a href='/admin/user/list'>직원관리</a>
            </div>
            <div className='menu'>
              <a href='/admin/process'>공정관리</a>
            </div>
            <div className='menu'>
              <a href='/admin/user'>권한관리</a>
            </div>
            <div className='menu'>
              <a href='/admin/time'>  직원별 출/퇴근 시간관리</a>
            </div>
            <div className='menu'>
              <a href='/admin/process'> 직원별 공정관리 </a>
            </div>
            <div className='menu'>
              <a href='/admin/work/address'> 근무지 등록 및 관리 </a>
            </div>
          </div>
          <Routes>
            <Route path="/admin">
              <Route path="user/list" element={<UserList />} />
              <Route path="user" element={<User />} />
              <Route path="time" element={<Time />} />
              <Route path="time/management" element={<TimeManagement />} />
              <Route path="process" element={<Process />} />
              <Route path="process/register" element={<ProcessRegister />} />
              <Route path="work/address" element={<WorkAddress />} />
            </Route>
          </Routes>
        </div>
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
        </div>
      )}
    </>
  );
}

export default App;
