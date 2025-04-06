import { useEffect, useState } from 'react';
import { employees, permissionLevels } from '../data/mockData';
import { USER_AUTH_UPDATE_REQUEST, USER_LIST_REQUEST } from '../reducers/user';
import { AUTH_LIST_REQUEST } from "../reducers/auth";
import { useDispatch, useSelector } from 'react-redux';
import { TIME_LIST_REQUEST, TIME_REGISTER_REQUEST, TIME_UPDATE_REQUEST } from '../reducers/time';
import { PROCESS_LIST_REQUEST } from '../reducers/process';
import { USER_PROCESS_DELETE_REQUEST, USER_PROCESS_LIST_REQUEST, USER_PROCESS_REGISTER_REQUEST } from '../reducers/userProcess';

const Time = () => {

    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    useEffect(() => {
        userList();
    }, []);

    const dispatch = useDispatch();
    const userList = async () => {
        dispatch({
            type: USER_LIST_REQUEST,
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

    const inputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const { processLists } = useSelector((state) => state.process);
    const { userProcessLists } = useSelector((state) => state.userProcess);

 
    const [formData, setFormData] = useState({
        user_code: '',
        user_process_code: '',
        user_process_count: '',
    });

    useEffect(() => {
        processList();
        userProcessList()
    }, []);


    const processList = () => {
        dispatch({
            type: PROCESS_LIST_REQUEST,
        });
    }

    const userProcessList = () => {
        dispatch({
            type: USER_PROCESS_LIST_REQUEST,
        });
    }

    const processRegister = (e) => {
        e.preventDefault();
        if (formData.user_process_code === '') {
            alert('업무공정을 선택해주세요')
            return;
        }else if (formData.user_process_count === '') {
            alert('업무수량을 입력해주세요')
            return;
        }
        formData.user_code = selected.user_code;
        dispatch({
            type: USER_PROCESS_REGISTER_REQUEST,
            data: formData,
        });
    }

    const [userProcess, setUserProcess] = useState({})
    const [userProcessIs, setUserProcessIs] = useState(false)

    useEffect(() => {
        if (selected.user_code) {
            const userProcess = userProcessLists.filter(process => process.user_code === selected.user_code);
            if (userProcess.length > 0) {
                setUserProcess(userProcess)
                setUserProcessIs(true)
            } else {
                setUserProcess(null)
                setUserProcessIs(false)
            }

            console.log(userProcess)

        }
    }, [selected.user_code, userProcessLists]);
    const handleDelete = (task) => {
        if (window.confirm(`'${task.process.process_name}' 업무를 삭제하시겠습니까?`)) {

            const data = {
                user_process_id: task.user_process_id
            };
            console.log(data)
            dispatch({
                type: USER_PROCESS_DELETE_REQUEST,
                data: data,
            });
        }
    };

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">업무 관리</h1>
                <p className="text-gray-600 mt-1">
                    업무를 설정할 직원을 선택해주세요
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
                <div className="bg-white p-6 rounded-lg shadow mb-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">
                        {selected.user_name} ({selected.user_nickname})
                    </h2>
                    <div>
                        <h3 className="text-lg font-medium mb-3 text-green-600">업무공정 등록</h3>

                        <div className="font-medium mb-3">업무 유형</div>

                        <select
                            name="user_process_code"
                            value={formData.user_process_code}
                            onChange={inputChange}
                            className="block w-full p-2 border border-gray-300 rounded-md mb-3"
                        >
                            <option value="">업무를 선택하세요</option>
                            {processLists?.map((processList, index) => (
                                <option key={index} value={processList.process_code}>
                                    {processList.process_name}
                                </option>
                            ))}
                        </select>

                        <div className="font-medium mb-3">업무 수량</div>
                        <input
                            id="user_process_count"
                            type="number"
                            name="user_process_count"
                            value={formData.user_process_count}
                            onChange={inputChange}
                            min="1"
                            step="1"
                            className="block w-full p-2 border border-gray-300 rounded-md mb-3"
                            placeholder="수량 입력"
                        />
                        <button
                            onClick={processRegister}
                            className="w-full mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                            업무 등록
                        </button>
                    </div>

                </div>

            )}

            {selected.user_code && (
                <div className="bg-white p-6 rounded-lg shadow mb-6">
                    <h3 className="text-lg font-medium mb-3 text-blue-600">등록된 업무</h3>
                    {userProcessIs ? (
                        <div className="space-y-2">
                            {/* 테이블 헤더 */}
                            <div className="grid grid-cols-3 gap-4 p-3 font-semibold bg-gray-200 rounded-md text-gray-900">
                                <p>업무명</p>
                                <p>수량</p>
                                <p className="text-center">삭제</p>
                            </div>

                            {/* 데이터 리스트 */}
                            {userProcess.map((process, index) => (
                                <div key={index} className="grid grid-cols-3 gap-4 p-4 border rounded-lg shadow-sm bg-gray-50 items-center">
                                    <p className="text-gray-900">{process.process.process_name}</p>
                                    <p className="text-gray-700">{process.user_process_count}</p>
                                    <button
                                        className="text-red-500 font-bold text-xl hover:text-red-700 transition duration-200 text-center"
                                        onClick={() => handleDelete(process)}
                                    >
                                        ✖
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-500">등록된 업무가 없습니다.</p>
                    )}
                </div>
            )}




        </div>
    );
};

export default Time;
