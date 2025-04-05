import React, { useState } from 'react';
import UserAttendance from './userAttendance';
import UserTask from './userTask';
import MyPage from './myPage';

const Profile = () => {
    const [activeTab, setActiveTab] = useState('attendance');


    return (
        <div className="w-full h-full flex flex-col justify-center items-center overflow-y-auto bg-white">
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
                <button
                    className={`px-6 py-4 text-sm font-medium ${activeTab === 'my'
                        ? 'border-b-2 border-blue-500 text-blue-600 w-full'
                        : 'text-gray-600 hover:text-gray-800 hover:border-gray-300 w-full'
                        }`}
                    onClick={() => setActiveTab('my')}
                >
                    MY PAGE
                </button>
            </nav>

            {/* Task Settings Tab */}
            {activeTab === 'attendance' && (
                <UserAttendance />
            )}

            {activeTab === 'task' && (
                <UserTask />
            )}

            {activeTab === 'my' && (
                <MyPage />
            )}
        </div>

    );
};

export default Profile;
