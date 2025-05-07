import { useState } from 'react';
import TaskSetting from './taskSetting';
import CompanyAddress from './companyAddress';
import { useLocation } from 'react-router-dom';

const SettingsPage = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const tab = query.get("tab"); // "task" or "address"
  const [activeTab, setActiveTab] = useState(tab || "task");

  console.log(activeTab)
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">시스템 설정</h1>
        <p className="text-gray-600 mt-1">
          직원관리시스템의 설정을 관리합니다
        </p>
      </div>

      {/* Settings Tabs */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <nav className="flex border-b border-gray-200">
          <button
            className={`px-6 py-4 text-sm font-medium ${activeTab === 'task'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-600 hover:text-gray-800 hover:border-gray-300'
              }`}
            onClick={() => setActiveTab('task')}
          >
            업무 설정
          </button>
          <button
            className={`px-6 py-4 text-sm font-medium ${activeTab === 'address'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-600 hover:text-gray-800 hover:border-gray-300'
              }`}
            onClick={() => setActiveTab('address')}
          >
            근무지 설정
          </button>
        </nav>

        <div className="p-6">
          {activeTab === 'task' && (
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">업무 설정</h2>
              <TaskSetting />
            </div>
          )}
          {activeTab === 'address' && (
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">근무지 설정</h2>

              <div className="space-y-6">
                <CompanyAddress />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
