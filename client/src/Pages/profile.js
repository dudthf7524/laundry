<<<<<<< HEAD
import React, { useEffect } from 'react';
import BottomBar from '../Components/BottomBar';

const Profile = () => {
    return (
        <>
            <div className="box register">
                <p>출근 횟수</p>
                <p>지각 횟수</p>
                <p>결근 횟수</p>
=======
import React, { useState } from 'react';
import BottomBar from '../components/BottomBar';

import UserAttendance from './userAttendance';
import UserTask from './userTask';

const Profile = () => {
    const [activeTab, setActiveTab] = useState('attendance');
    return (
        <>
            <div className="bg-white rounded-lg shadow overflow-hidden w-4/5 h-full">
                <nav className="flex border-b border-gray-200 w-full">
                    <button
                        className={`px-6 py-4 text-sm font-medium ${activeTab === 'attendance'
                            ? 'border-b-2 border-blue-500 text-blue-600 w-full'
                            : 'text-gray-600 hover:text-gray-800 hover:border-gray-300 w-full'
                            }`}
                        onClick={() => setActiveTab('attendance')}
                    >
                        출근/퇴근
                    </button>
                    <button
                        className={`px-6 py-4 text-sm font-medium ${activeTab === 'task'
                            ? 'border-b-2 border-blue-500 text-blue-600 w-full'
                            : 'text-gray-600 hover:text-gray-800 hover:border-gray-300 w-full'
                            }`}
                        onClick={() => setActiveTab('task')}
                    >
                        업무
                    </button>
                </nav>

                {/* Task Settings Tab */}
                {activeTab === 'attendance' && (
                    <UserAttendance />

                )}

                {activeTab === 'task' && (
                     <UserTask />
                )}
>>>>>>> cys
            </div>
            <BottomBar />
        </>
    );
};

export default Profile;
