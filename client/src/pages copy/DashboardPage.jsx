import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import StatisticsChart from '../components copy/StatisticsChart';
import { attendanceRecords, taskRecords } from '../data/mockData';
import { getCurrentDate } from '../utils/dateUtils';

const DashboardPage = () => {
  const { currentUser } = useAuth();
  const [todayStats, setTodayStats] = useState({
    totalEmployees: 0,
    workingNow: 0,
    completedTasks: 0,
  });

  // Calculate today's date
  const today = getCurrentDate();

  useEffect(() => {
    // Count employees working today
    const totalWorking = attendanceRecords.filter(
      record => record.date === today && record.status === '근무중'
    ).length;

    // Count total employees with records today
    const totalToday = new Set(
      attendanceRecords.filter(record => record.date === today).map(r => r.employeeId)
    ).size;

    // Count completed tasks today
    const tasksToday = taskRecords.filter(record => record.date === today).length;

    setTodayStats({
      totalEmployees: totalToday,
      workingNow: totalWorking,
      completedTasks: tasksToday,
    });
  }, [today]);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          {currentUser ? `안녕하세요, ${currentUser.name}님!` : '대시보드'}
        </h1>
        <p className="text-gray-600 mt-1">
          {today} 기준 근태 및 업무 통계 현황입니다.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-full">
              <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <h2 className="text-gray-600 text-sm font-medium">금일 전체 근로자</h2>
              <p className="text-2xl font-bold text-gray-900">{todayStats.totalEmployees}명</p>
            </div>
          </div>
          <div className="mt-3">
            <Link to="/attendance" className="text-blue-600 hover:text-blue-800 text-sm">
              근태 관리 바로가기 →
            </Link>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-full">
              <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <h2 className="text-gray-600 text-sm font-medium">현재 근무중</h2>
              <p className="text-2xl font-bold text-gray-900">{todayStats.workingNow}명</p>
            </div>
          </div>
          <div className="mt-3">
            <Link to="/attendance" className="text-green-600 hover:text-green-800 text-sm">
              근태 상세 보기 →
            </Link>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="bg-purple-100 p-3 rounded-full">
              <svg className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div className="ml-4">
              <h2 className="text-gray-600 text-sm font-medium">금일 완료된 업무</h2>
              <p className="text-2xl font-bold text-gray-900">{todayStats.completedTasks}건</p>
            </div>
          </div>
          <div className="mt-3">
            <Link to="/tasks" className="text-purple-600 hover:text-purple-800 text-sm">
              업무 통계 바로가기 →
            </Link>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6">
        <StatisticsChart
          attendanceData={attendanceRecords.slice(0, 20)}
          type="attendance"
          timeFrame="daily"
        />

        <StatisticsChart
          taskData={taskRecords.slice(0, 20)}
          type="task"
          timeFrame="daily"
        />
      </div>
    </div>
  );
};

export default DashboardPage;
