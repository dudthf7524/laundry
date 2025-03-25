import React, { useEffect } from 'react';
import BottomBar from '../components/BottomBar';

const Profile = () => {
    return (
        <>
            <div className="box register">
                <p>출근 횟수</p>
                <p>지각 횟수</p>
                <p>결근 횟수</p>
            </div>
            <BottomBar />
        </>
    );
};

export default Profile;
