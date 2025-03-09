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
import FixedTime from './adminPages/fixedTime';
import Work from './adminPages/work';
import WorkType from './adminPages/workType';




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
              <a href='/admin/user'>권한관리</a>
            </div>
            <div className='menu'>
              <a href='/admin/time'>  직원별 출/퇴근 시간관리</a>
            </div>
            <div className='menu'>
              <a href='#'>  근무 형태 관리</a>
            </div>
            <div className='menu'>
              <a href='#'>  직원별 근무 형태 관리</a>
            </div>
          </div>
          <Routes>
            <Route path="/admin">
              <Route path="user" element={<User />} />
              <Route path="time" element={<FixedTime />} />
              <Route path="work" element={<Work />} />
              <Route path="work/type" element={<WorkType />} />
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
