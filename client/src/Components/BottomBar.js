import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../Styles/Components.css';
import { ReactComponent as Icon1 } from '../Assets/Images/grid-plus.svg';
import { ReactComponent as Icon2 } from '../Assets/Images/briefcase.svg';
import { ReactComponent as Icon3 } from '../Assets/Images/calendar-month.svg';
import { ReactComponent as Icon4 } from '../Assets/Images/user.svg';

const BottomBar = () => {
    const location = useLocation(); // 현재 경로 가져오기

    // 해당 경로가 현재 활성화된 경로인지 확인하는 함수
    const isActive = (path) => location.pathname === path;

    return (
        <div className="bottom-bar">
            <Link 
                to="/register" 
                className={`bottom-button ${isActive('/register') ? 'active' : ''}`}
            >
                <Icon1 className={`menu-icon ${isActive('/register') ? 'active-icon' : ''}`} />
                등록
            </Link>
            <Link 
                to="/task" 
                className={`bottom-button ${isActive('/task') ? 'active' : ''}`}
            >
                <Icon2 className={`menu-icon ${isActive('/task') ? 'active-icon' : ''}`} />
                업무
            </Link>
            <Link 
                to="/schedule" 
                className={`bottom-button ${isActive('/schedule') ? 'active' : ''}`}
            >
                <Icon3 className={`menu-icon ${isActive('/schedule') ? 'active-icon' : ''}`} />
                스케줄
            </Link>
            <Link 
                to="/profile" 
                className={`bottom-button ${isActive('/profile') ? 'active' : ''}`}
            >
                <Icon4 className={`menu-icon ${isActive('/profile') ? 'active-icon' : ''}`} />
                내 정보
            </Link>
        </div>
    );
};

export default BottomBar;