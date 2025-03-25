import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Auth from './auth';
const SettingsPage = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('general');
  const [showAccessDenied, setShowAccessDenied] = useState(false);

  // Check if user has access to settings
  const hasAccess = currentUser && currentUser.permission === 'master';

  // If user doesn't have access, show access denied message
  // if (!hasAccess) {
  //   return (
  //     <div className="min-h-screen flex flex-col items-center justify-center">
  //       <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative max-w-md">
  //         <h2 className="font-bold text-xl mb-2">접근 권한 없음</h2>
  //         <p className="mb-4">설정 페이지는 관리자(마스터) 권한을 가진 사용자만 접근할 수 있습니다.</p>
  //         <button
  //           onClick={() => navigate('/dashboard')}
  //           className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
  //         >
  //           대시보드로 돌아가기
  //         </button>
  //       </div>
  //     </div>
  //   );
  // }

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
            className={`px-6 py-4 text-sm font-medium ${activeTab === 'general'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-600 hover:text-gray-800 hover:border-gray-300'
              }`}
            onClick={() => setActiveTab('general')}
          >
            일반 설정
          </button>
          <button
            className={`px-6 py-4 text-sm font-medium ${activeTab === 'attendance'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-600 hover:text-gray-800 hover:border-gray-300'
              }`}
            onClick={() => setActiveTab('attendance')}
          >
            근태관리 설정
          </button>
          <button
            className={`px-6 py-4 text-sm font-medium ${activeTab === 'task'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-600 hover:text-gray-800 hover:border-gray-300'
              }`}
            onClick={() => setActiveTab('task')}
          >
            업무통계 설정
          </button>
          <button
            className={`px-6 py-4 text-sm font-medium ${activeTab === 'permissions'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-600 hover:text-gray-800 hover:border-gray-300'
              }`}
            onClick={() => setActiveTab('permissions')}
          >
            권한 설정
          </button>
        </nav>

        <div className="p-6">
          {/* General Settings Tab */}
          {activeTab === 'general' && (
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">일반 설정</h2>

              <div className="space-y-6">
                <div>
                  <label htmlFor="company-name" className="block text-sm font-medium text-gray-700 mb-1">
                    회사명
                  </label>
                  <input
                    type="text"
                    id="company-name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    defaultValue="직원관리시스템"
                  />
                </div>

                <div>
                  <label htmlFor="timezone" className="block text-sm font-medium text-gray-700 mb-1">
                    시간대
                  </label>
                  <select
                    id="timezone"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    defaultValue="Asia/Seoul"
                  >
                    <option value="Asia/Seoul">한국 표준시 (UTC+9)</option>
                    <option value="UTC">협정 세계시 (UTC)</option>
                    <option value="America/New_York">동부 표준시 (UTC-5)</option>
                    <option value="Europe/London">그리니치 표준시 (UTC+0)</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">
                    언어
                  </label>
                  <select
                    id="language"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    defaultValue="ko"
                  >
                    <option value="ko">한국어</option>
                    <option value="en">영어</option>
                    <option value="ja">일본어</option>
                    <option value="zh">중국어</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Attendance Settings Tab */}
          {activeTab === 'attendance' && (
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">근태관리 설정</h2>

              <div className="space-y-6">
                <div>
                  <label htmlFor="work-hours" className="block text-sm font-medium text-gray-700 mb-1">
                    기본 근무 시간
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="start-time" className="block text-xs text-gray-500 mb-1">
                        시작 시간
                      </label>
                      <input
                        type="time"
                        id="start-time"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                        defaultValue="09:00"
                      />
                    </div>
                    <div>
                      <label htmlFor="end-time" className="block text-xs text-gray-500 mb-1">
                        종료 시간
                      </label>
                      <input
                        type="time"
                        id="end-time"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                        defaultValue="18:00"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="overtime-threshold" className="block text-sm font-medium text-gray-700 mb-1">
                    연장근무 시간 기준 (시간)
                  </label>
                  <input
                    type="number"
                    id="overtime-threshold"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    defaultValue="8"
                    min="0"
                    max="24"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="auto-calculate"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    defaultChecked
                  />
                  <label htmlFor="auto-calculate" className="ml-2 block text-sm text-gray-700">
                    근무 시간 자동 계산
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Task Settings Tab */}
          {activeTab === 'task' && (
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">업무통계 설정</h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    업무 유형 관리
                  </label>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        type="text"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                        defaultValue="다림질"
                        readOnly
                      />
                      <button className="ml-2 text-gray-400 hover:text-gray-600">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      <button className="ml-1 text-gray-400 hover:text-gray-600">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button className="ml-1 text-red-400 hover:text-red-600">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="text"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                        placeholder="새 업무 유형"
                      />
                      <button className="ml-2 bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="efficiency-threshold" className="block text-sm font-medium text-gray-700 mb-1">
                    효율성 기준 (항목/시간)
                  </label>
                  <input
                    type="number"
                    id="efficiency-threshold"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    defaultValue="10"
                    min="1"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Permissions Settings Tab */}
          {activeTab === 'permissions' && (
            <div>

           
              <h2 className="text-lg font-medium text-gray-900 mb-4">권한 설정</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-md font-medium text-gray-800 mb-2">권한 수준</h3>
                  <div className="bg-gray-50 p-4 rounded-md space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">마스터</h4>
                      <p className="text-sm text-gray-500">본인 및 근무자들 (직원들) 모두의 모든 데이터를 확인할 수 있고 수정도 할 수 있음 (전체 관리자)</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">서브마스터</h4>
                      <p className="text-sm text-gray-500">본인 및 근무자들(직원들) 모두의 모든 데이터를 확인 할 수 있음 (수정은 안됨)</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">매니저</h4>
                      <p className="text-sm text-gray-500">본인 및 직급이 '알바'인 사람들의 모든 데이터를 확인 할 수 있음(수정안 안됨) (볼수없는 항목은 총근무시간합, 연장근무시간)</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">직원</h4>
                      <p className="text-sm text-gray-500">본인의 데이터를 확인할 수 있음 (수정은 안됨) (볼수없는 항목은 총근무시간합, 연장근무시간)</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-md font-medium text-gray-800 mb-2">보이지 않는 필드 설정</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="hide-total-work-hours"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        defaultChecked
                      />
                      <label htmlFor="hide-total-work-hours" className="ml-2 block text-sm text-gray-700">
                        매니저/직원에게 총근무시간합 숨기기
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="hide-overtime"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        defaultChecked
                      />
                      <label htmlFor="hide-overtime" className="ml-2 block text-sm text-gray-700">
                        매니저/직원에게 연장근무시간 숨기기
                      </label>
                    </div>
                  </div>
                </div>
                <Auth />
              </div>
            </div>
          )}

          <div className="mt-8 flex justify-end">
            <button
              type="button"
              className="mr-3 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              취소
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700"
            >
              설정 저장
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
