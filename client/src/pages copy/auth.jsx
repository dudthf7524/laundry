import { useEffect, useState } from 'react';
import { employees, permissionLevels } from '../data/mockData';
import { USER_LIST_REQUEST } from '../reducers/user';
import { AUTH_LIST_REQUEST } from "../reducers/auth";
import { useDispatch, useSelector } from 'react-redux';

const Auth = () => {

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    useEffect(() => {
        userList();
        authList();
    }, []);

    const dispatch = useDispatch();
    const userList = async () => {
        dispatch({
            type: USER_LIST_REQUEST,
        });
    };

    const authList = async () => {
        dispatch({
            type: AUTH_LIST_REQUEST,
        });
    };

    const { userLists } = useSelector((state) => state.user) || { userLists: [] };

    // Filter employees based on search term
    var aaa;
    if (userLists) {
        aaa = userLists;
    }


    const filteredEmployees = employees?.filter(employee => {
        const lowerCaseSearch = searchTerm.toLowerCase();

        return (
            employee.name.toLowerCase().includes(lowerCaseSearch) ||
            employee.nickname.toLowerCase().includes(lowerCaseSearch) ||
            employee.role.toLowerCase().includes(lowerCaseSearch)
        );
    });

    // Handle selecting an employee to view/edit details
    const handleEmployeeSelect = (employee) => {
        setSelectedEmployee(employee);
    };

    // Get color for permission badge
    const getPermissionColor = (permission) => {
        switch (permission) {
            case 'master':
                return 'bg-red-100 text-red-800';
            case 'submaster':
                return 'bg-orange-100 text-orange-800';
            case 'manager':
                return 'bg-blue-100 text-blue-800';
            case 'employee':
                return 'bg-green-100 text-green-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const handleCheckboxChange = (category, value) => {
        setSelected((prev) => ({
            ...prev,
            [category]: value,
        }));
    };

    const [selected, setSelected] = useState({
        user_code: "",

    });
    const [selectedAuth, setSelectedAuth] = useState("");
    const AuthChange = (event) => {
        setSelectedAuth(event.target.value);
    };
    const { authLists } = useSelector((state) => state.auth);
    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">권한 관리</h1>
                <p className="text-gray-600 mt-1">
                    권한을 수정할 직원을 선택해주세요
                </p>
            </div>

            {/* Search and Add Employee */}
            <div className="bg-white p-4 rounded-lg shadow mb-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="mb-4 md:mb-0 md:flex-1 md:mr-4">
                        <label htmlFor="search" className="sr-only">직원 검색</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <input
                                id="search"
                                type="search"
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="이름, 닉네임 또는 직급으로 검색"
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Employees List */}
            <div className="bg-white rounded-lg shadow mb-6 overflow-hidden">
                <ul className="divide-y divide-gray-200">
                    {filteredEmployees ? (
                        filteredEmployees.map((employee) => (
                            <li
                                key={employee.id}
                                className={`p-4 hover:bg-gray-50 cursor-pointer ${selectedEmployee?.id === employee.id ? 'bg-blue-50' : ''
                                    }`}
                                onClick={() => handleEmployeeSelect(employee)}
                            >
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center">
                                            <div className="bg-gray-200 rounded-full h-10 w-10 flex items-center justify-center text-gray-700 font-bold">
                                                {employee.name.charAt(0)}
                                            </div>
                                            <div className="ml-3">
                                                <div className="flex items-center">
                                                    <span className="text-lg font-medium text-gray-900">{employee.name}</span>
                                                    <span className="ml-2 text-sm text-gray-500">({employee.nickname})</span>
                                                    <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPermissionColor(employee.permission)}`}>
                                                        {permissionLevels[employee.permission]?.name || '일반'}
                                                    </span>
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {employee.role} • {employee.years}년차
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-2 md:mt-0 flex items-center">
                                        <>
                                            <input type='checkbox' className='h-5 w-5' 
                                            // checked={selected.user_code === userList.user_code}
                                            onChange={() =>
                                                handleCheckboxChange("user_code", userList.user_code)
                                            }></input>
                                        </>
                                    </div>
                                </div>
                            </li>
                        ))
                    ) : (
                        <li className="p-4 text-center text-gray-500">
                            검색 결과가 없습니다
                        </li>
                    )}
                </ul>
            </div>

            {/* Selected Employee Details */}
            {selectedEmployee && (
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">
                        {selectedEmployee.name} ({selectedEmployee.nickname}) 상세 정보
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 mb-3">기본 정보</h3>
                            <dl className="space-y-2">
                                <div className="flex flex-col sm:flex-row">
                                    <dt className="text-sm font-medium text-gray-500 sm:w-40">이름</dt>
                                    <dd className="mt-1 sm:mt-0 text-sm text-gray-900">{selectedEmployee.name}</dd>
                                </div>
                                <div className="flex flex-col sm:flex-row">
                                    <dt className="text-sm font-medium text-gray-500 sm:w-40">닉네임</dt>
                                    <dd className="mt-1 sm:mt-0 text-sm text-gray-900">{selectedEmployee.nickname}</dd>
                                </div>
                                <div className="flex flex-col sm:flex-row">
                                    <dt className="text-sm font-medium text-gray-500 sm:w-40">직무형태</dt>
                                    <dd className="mt-1 sm:mt-0 text-sm text-gray-900">{selectedEmployee.role}</dd>
                                </div>
                                <div className="flex flex-col sm:flex-row">
                                    <dt className="text-sm font-medium text-gray-500 sm:w-40">근속 년수</dt>
                                    <dd className="mt-1 sm:mt-0 text-sm text-gray-900">{selectedEmployee.years}년</dd>
                                </div>
                                <div className="flex flex-col sm:flex-row">
                                    <dt className="text-sm font-medium text-gray-500 sm:w-40">권한</dt>
                                    <dd className="mt-1 sm:mt-0 text-sm text-gray-900">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPermissionColor(selectedEmployee.permission)}`}>
                                            {permissionLevels[selectedEmployee.permission]?.name || '일반'}
                                        </span>
                                    </dd>
                                </div>
                            </dl>
                        </div>

                        <div>
                            <select value={selectedAuth} onChange={AuthChange}>
                                <option value="">권한을 선택하세요</option>
                                {
                                    authLists.map((authList, index) => {
                                        return (
                                            <option key={index} value={authList.auth_code}>
                                                {authList.auth_name}
                                            </option>
                                        )
                                    })
                                }

                            </select>
                            <h3 className="text-lg font-medium text-gray-900 mb-3">권한 설명란</h3>
                            <div className="text-sm text-gray-700">
                                <span className='ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800'>마스터</span> - 본인 및 근무자들 (직원들) 모두의 모든 데이터를 확인할 수 있고 수정도 할 수 있음 (전체 관리자)
                            </div>
                            <div className="text-sm text-gray-700">
                                &nbsp;
                            </div>
                            <div className="text-sm text-gray-700">
                                <span className='ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-orange-100 text-orange-800'>서브 마스터</span> - 본인 및 근무자들(직원들) 모두의 모든 데이터를 확인 할 수 있음 (수정은 안됨)
                            </div>
                            <div className="text-sm text-gray-700">
                                &nbsp;
                            </div>
                            <div className="text-sm text-gray-700">
                                <span className='ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800'>매니저</span>  - 본인 및 직급이 알바인 사람들의 모든 데이터를 확인 할 수 있음(수정안 안됨)
                            </div>
                            <div className="text-sm text-gray-700">
                                &nbsp;
                            </div>
                            <div className="text-sm text-gray-700">
                                <span className='ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'>직원</span>  - 본인의 데이터를 확인할 수 있음 (수정은 안됨)
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Auth;
