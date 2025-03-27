import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { employees } from '../data/mockData';

const LoginPage = () => {
  const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // If already authenticated, redirect to dashboard
  if (isAuthenticated) {
    navigate('/dashboard');
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedEmployeeId) {
      setErrorMessage('직원을 선택해주세요.');
      return;
    }

    const success = login(selectedEmployeeId);

    if (success) {
      console.log('Login successful, redirecting to dashboard');
      navigate('/admin');
    } else {
      setErrorMessage('로그인에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">
          직원관리시스템 로그인
        </h1>

        {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="employee" className="block text-gray-700 text-sm font-medium mb-2">
              직원 선택
            </label>
            <select
              id="employee"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
              value={selectedEmployeeId}
              onChange={(e) => setSelectedEmployeeId(e.target.value)}
            >
              <option value="">직원을 선택하세요</option>
              {employees.map((employee) => (
                <option key={employee.id} value={employee.id}>
                  {employee.name} ({employee.nickname}) - {employee.role}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              placeholder="(데모 버전에서는 아무 비밀번호나 입력하세요)"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
            />
            <p className="text-xs text-gray-500 mt-1">
              * 데모 버전에서는 비밀번호 검증을 하지 않습니다.
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded font-medium hover:bg-blue-700 transition duration-200"
          >
            로그인
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
