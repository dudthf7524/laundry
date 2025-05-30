import { useEffect, useState } from 'react';
import { employees, permissionLevels } from '../data/mockData';
import { USER_AUTH_UPDATE_REQUEST, USER_LIST_REQUEST } from '../reducers/user';
import { AUTH_LIST_REQUEST } from "../reducers/auth";
import { useDispatch, useSelector } from 'react-redux';

const Auth = () => {

    const [searchTerm, setSearchTerm] = useState('');

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

    const filteredUserLists = userLists?.filter(employee => {
        const lowerCaseSearch = searchTerm.toLowerCase();

        return (
            employee.user_name.toLowerCase().includes(lowerCaseSearch) ||
            employee.user_nickname.toLowerCase().includes(lowerCaseSearch) ||
            employee.user_position.toLowerCase().includes(lowerCaseSearch)
        );
    });

    // Handle selecting an employee to view/edit details


    // Get color for permission badge
    const getPermissionColor = (permission) => {
        switch (permission) {
            case 'A1':
                return 'bg-red-100 text-red-800';
            case 'A2':
                return 'bg-orange-100 text-orange-800';
            case 'A3':
                return 'bg-blue-100 text-blue-800';
            case 'A4':
                return 'bg-green-100 text-green-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };
    const [selectedAuth, setSelectedAuth] = useState({
        auth_code: "",

    });
    const handleCheckboxChange = (userList) => {
        setSelected(prev => ({
            ...prev,
            user_code: userList.user_code,
            user_name: userList.user_name,
            user_nickname: userList.user_nickname,
            user_position: userList.user_position,
            user_hire_date: userList.user_hire_date,
            auth_code: userList.auth.auth_code,
            auth_name: userList.auth.auth_name,

            // 필요에 따라 더 많은 정보를 추가할 수 있습니다
        }));

        setSelectedAuth(prev => ({
            ...prev,
            auth_code: "",
        }));
    };


    const handleCheckboxChangeAuth = (category, value) => {
        setSelectedAuth((prev) => ({
            ...prev,
            [category]: value,
        }));
    };

    const [selected, setSelected] = useState({
        user_code: "",
        user_name: "",
        user_nickname: "",
        user_position: "",
        user_hire_date: "",
        auth_code: "",
        auth_name: "",
    });
    const authUpdate = () => {

        const data = {
            auth_code: selectedAuth.auth_code,
            user_code: selected.user_code
        };

        dispatch({
            type: USER_AUTH_UPDATE_REQUEST,
            data: data,

        });
    }



    const getYearsOfService = (hireDate) => {
        const hire = new Date(hireDate); // 입사일을 Date 객체로 변환
        const today = new Date(); // 현재 날짜
        const years = today.getFullYear() - hire.getFullYear();

        // 입사월, 입사일이 현재보다 이후라면 1년을 빼줌
        if (
            today.getMonth() < hire.getMonth() ||
            (today.getMonth() === hire.getMonth() && today.getDate() < hire.getDate())
        ) {
            return years - 1;
        }
        return years;
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
                    {filteredUserLists ? (
                        filteredUserLists?.map((userList, index) => (
                            <li
                                key={index}
                                className={`cursor-pointer p-4 hover:bg-gray-50 ${selected.user_code === userList.user_code ? 'bg-blue-50' : ''
                                    }`}
                                onClick={() =>
                                    handleCheckboxChange(userList)
                                }
                            >
                                <div className="flex flex-row md:flex-row md:items-center md:justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center">
                                            <div className="bg-gray-200 rounded-full h-10 w-10 flex items-center justify-center text-gray-700 font-bold">
                                                {userList.user_name.charAt(0)}
                                            </div>
                                            <div className="ml-3">
                                                <div className="flex items-center">
                                                    <span className="text-lg font-medium text-gray-900">{userList.user_name}</span>
                                                    <span className="ml-2 text-sm text-gray-500">({userList.user_nickname})</span>
                                                    <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPermissionColor(userList.auth.auth_code)}`}>
                                                        {userList.auth.auth_name}
                                                    </span>
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {userList.user_position} • {getYearsOfService(userList.user_hire_date)}년차
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="flex-2">
                                        <div className="mt-2 md:mt-0 flex items-center" >
                                            <>
                                                <input type='checkbox' className='h-5 w-5 cursor-pointer'
                                                    checked={selected.user_code === userList.user_code}
                                                    onChange={() =>
                                                        handleCheckboxChange(userList)
                                                    }
                                                ></input>
                                            </>
                                        </div>
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
            {selected.user_code && (
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">
                        {selected.user_name} ({selected.user_nickname}) 상세 정보
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 mb-3">기본 정보</h3>
                            <dl className="space-y-2">
                                <div className="flex flex-col sm:flex-row">
                                    <dt className="text-sm font-medium text-gray-500 sm:w-40">이름</dt>
                                    <dd className="mt-1 sm:mt-0 text-sm text-gray-900">{selected.user_name}</dd>
                                </div>
                                <div className="flex flex-col sm:flex-row">
                                    <dt className="text-sm font-medium text-gray-500 sm:w-40">닉네임</dt>
                                    <dd className="mt-1 sm:mt-0 text-sm text-gray-900">{selected.user_nickname}</dd>
                                </div>
                                <div className="flex flex-col sm:flex-row">
                                    <dt className="text-sm font-medium text-gray-500 sm:w-40">직무형태</dt>
                                    <dd className="mt-1 sm:mt-0 text-sm text-gray-900">{selected.user_position}</dd>
                                </div>
                                <div className="flex flex-col sm:flex-row">
                                    <dt className="text-sm font-medium text-gray-500 sm:w-40">근속 년수</dt>
                                    <dd className="mt-1 sm:mt-0 text-sm text-gray-900">{getYearsOfService(selected.user_hire_date)}년</dd>
                                </div>
                                <div className="flex flex-col sm:flex-row">
                                    <dt className="text-sm font-medium text-gray-500 sm:w-40">권한</dt>
                                    <dd className="mt-1 sm:mt-0 text-sm text-gray-900">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPermissionColor(selected.auth_code)}`}>
                                            {selected.auth_name}
                                        </span>
                                    </dd>
                                </div>
                            </dl>
                        </div>

                        <div>
                            <h3 className="text-lg font-medium text-gray-900 mb-3">수정할 권한을 선택해주세요</h3>
                            {
                                authLists.map((authList, index) => {
                                    return (
                                        <div className="text-sm pb-4" key={index}>

                                            <input type='checkbox'
                                                checked={selectedAuth.auth_code === authList.auth_code}
                                                onChange={() =>
                                                    handleCheckboxChangeAuth("auth_code", authList.auth_code)
                                                }></input>
                                            <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPermissionColor(authList.auth_code)}`}>{authList.auth_name}</span>
                                          
                                        </div>
                                    )
                                })
                            }
                            <button onClick={() => authUpdate()} className="text-blue-600 hover:text-blue-800 mr-3">
                                권한변경
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Auth;
