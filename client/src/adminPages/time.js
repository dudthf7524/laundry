import { useEffect, useState } from 'react';
import { USER_LIST_REQUEST } from '../reducers/user';
import { AUTH_LIST_REQUEST } from "../reducers/auth";
import { useDispatch, useSelector } from 'react-redux';
import { TIME_LIST_REQUEST, TIME_REGISTER_REQUEST, TIME_UPDATE_REQUEST } from '../reducers/time';
import { useLocation } from 'react-router-dom';

const Time = () => {

    const [searchTerm, setSearchTerm] = useState('');

    const location = useLocation();
    const query = new URLSearchParams(location.search);
    var userCode = null

    userCode = query.get("user_code");

    console.log(userCode)


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


    const [selectedWorkHours, setSelectedWorkHours] = useState({
        startHour: "00",
        startMinute: "00",
        endHour: "00",
        endMinute: "00",
        breakStartHour: "00",
        breakStartMinute: "00",
        breakEndHour: "00",
        breakEndMinute: "00",
    });

    const handleTimeChange = (category, value) => {
        setSelectedWorkHours((prev) => ({
            ...prev,
            [category]: value,
        }));
    };




    const timeOptions = {
        hours: Array.from({ length: 24 }, (_, i) => (i < 10 ? `0${i}` : `${i}`)),
        minutes: ["00", "10", "20", "30", "40", "50"],
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
    // useEffect(() => {
    //     if (userCode) {
    //         setSelected(userCode)

    //     }
    // }, [userCode]);
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

    const timeRegister = () => {
        const work_start_time = selectedWorkHours.startHour + ":" + selectedWorkHours.startMinute
        const work_end_time = selectedWorkHours.endHour + ":" + selectedWorkHours.endMinute
        const rest_start_time = selectedWorkHours.breakStartHour + ":" + selectedWorkHours.breakStartMinute
        const rest_end_time = selectedWorkHours.breakEndHour + ":" + selectedWorkHours.breakEndMinute

        const data = {
            user_code: selected.user_code,
            start_time: work_start_time,
            end_time: work_end_time,
            rest_start_time: rest_start_time,
            rest_end_time: rest_end_time,
        }
        dispatch({
            type: TIME_REGISTER_REQUEST,
            data: data,
        });
    }

    const [WorkHourss, setWorkHourss] = useState({
        startHour: "00",
        startMinute: "00",
        endHour: "00",
        endMinute: "00",
        breakStartHour: "00",
        breakStartMinute: "00",
        breakEndHour: "00",
        breakEndMinute: "00",
    });

    const timeUpdate = () => {
        const work_start_time = WorkHourss.startHour + ":" + WorkHourss.startMinute
        const work_end_time = WorkHourss.endHour + ":" + WorkHourss.endMinute
        const rest_start_time = WorkHourss.breakStartHour + ":" + WorkHourss.breakStartMinute
        const rest_end_time = WorkHourss.breakEndHour + ":" + WorkHourss.breakEndMinute

        const data = {
            user_code: selected.user_code,
            time_id: WorkHourss.time_id,
            start_time: work_start_time,
            end_time: work_end_time,
            rest_start_time: rest_start_time,
            rest_end_time: rest_end_time,
        }

        dispatch({
            type: TIME_UPDATE_REQUEST,
            data: data,
        });
    }

    useEffect(() => {
        timeList();
    }, []);

    const timeList = async () => {
        dispatch({
            type: TIME_LIST_REQUEST,
        });
    };
    const { timeLists } = useSelector((state) => state.time) || { timeLists: [] };

    const [hasWorkHours, setHasWorkHours] = useState(false);
    const [userWorkHours, setUserWorkHours] = useState(false);

    useEffect(() => {
        if (userCode && userLists?.length > 0) {
            var matchedUser;
            if (selected.user_code) {
                matchedUser = userLists.find(user => user.user_code === Number(selected.user_code));
            } else {
                matchedUser = userLists.find(user => user.user_code === Number(userCode));
            }
            if (matchedUser) {
                setSelected({
                    user_code: matchedUser.user_code,
                    user_name: matchedUser.user_name,
                    user_nickname: matchedUser.user_nickname,
                    user_position: matchedUser.user_position,
                    user_hire_date: matchedUser.user_hire_date,
                    auth_code: matchedUser.auth.auth_code,
                    auth_name: matchedUser.auth.auth_name,
                });
            }
        }

        if (selected.user_code) {
            const userWorkHours = timeLists.find(time => time.user_code === selected.user_code);
            setUserWorkHours(userWorkHours)
            if (userWorkHours) {
                const [startHour, startMinute] = userWorkHours.start_time.split(":");
                const [endHour, endMinute] = userWorkHours.end_time.split(":");
                const [breakStartHour, breakStartMinute] = userWorkHours.rest_start_time.split(":");
                const [breakEndHour, breakEndMinute] = userWorkHours.rest_end_time.split(":");
                setWorkHourss({
                    time_id: userWorkHours.time_id,
                    startHour, startMinute,
                    endHour, endMinute,
                    breakStartHour, breakStartMinute,
                    breakEndHour, breakEndMinute
                });
                setHasWorkHours(true);
            } else {
                setHasWorkHours(false);
            }
        }
    }, [selected.user_code, timeLists, userCode, window.location.search]);

    const handleTimeChanges = (category, value) => {
        setWorkHourss((prev) => ({
            ...prev,
            [category]: value,
        }));
    };

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">시간 관리</h1>
                <p className="text-gray-600 mt-1">
                    시간을 설정할 직원을 선택해주세요
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
                                className={`p-4 hover:bg-gray-50 ${selected.user_code === userList.user_code ? 'bg-blue-50' : ''
                                    }`}
                            >
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
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
                                    <div className="mt-2 md:mt-0 flex items-center">
                                        <>
                                            <input type='checkbox' className='h-5 w-5 cursor-pointer'
                                                checked={selected.user_code === userList.user_code}
                                                onChange={() =>
                                                    handleCheckboxChange(userList)
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
            {selected.user_code && (
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">
                        {selected.user_name} ({selected.user_nickname})
                    </h2>
                    {
                        hasWorkHours ? (
                            <div>
                                <h3 className="text-lg font-medium mb-3 text-blue-600">출/퇴근 및 휴식 시간 수정</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                    {["start", "end", "breakStart", "breakEnd"].map((type) => (
                                        <div key={type} className="w-full">
                                            <label className="block text-sm font-medium text-gray-700">
                                                {type === "start" ? "출근 시간" :
                                                    type === "end" ? "퇴근 시간" :
                                                        type === "breakStart" ? "휴식 시작 시간" : "휴식 종료 시간"}
                                            </label>
                                            <div className="flex space-x-2 mt-1">
                                                <select
                                                    className="border rounded p-2 w-full"
                                                    value={WorkHourss[`${type}Hour`]}
                                                    onChange={(e) => handleTimeChanges(`${type}Hour`, e.target.value)}
                                                >
                                                    {timeOptions.hours.map((hour) => (
                                                        <option key={hour} value={hour}>{hour}</option>
                                                    ))}
                                                </select>
                                                <span className="self-center">:</span>
                                                <select
                                                    className="border rounded p-2 w-full"
                                                    value={WorkHourss[`${type}Minute`]}
                                                    onChange={(e) => handleTimeChanges(`${type}Minute`, e.target.value)}
                                                >
                                                    {timeOptions.minutes.map((minute) => (
                                                        <option key={minute} value={minute}>{minute}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>

                                    ))}
                                </div>
                                <button
                                    onClick={timeUpdate}
                                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                                    시간 수정
                                </button>
                            </div>
                        ) : (
                            <div>
                                <h3 className="text-lg font-medium mb-3 text-green-600">출/퇴근 및 휴식 시간 등록</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                    {["start", "end", "breakStart", "breakEnd"].map((type) => (
                                        <div key={type} className="w-full">
                                            <label className="block text-sm font-medium text-gray-700">
                                                {type === "start" ? "출근 시간" :
                                                    type === "end" ? "퇴근 시간" :
                                                        type === "breakStart" ? "휴식 시작 시간" : "휴식 종료 시간"}
                                            </label>
                                            <div className="flex space-x-2 mt-1">
                                                <select
                                                    className="border rounded p-2 w-full"
                                                    value={selectedWorkHours[`${type}Hour`]}
                                                    onChange={(e) => handleTimeChange(`${type}Hour`, e.target.value)}
                                                >
                                                    {timeOptions.hours.map((hour) => (
                                                        <option key={hour} value={hour}>{hour}</option>
                                                    ))}
                                                </select>
                                                <span className="self-center">:</span>
                                                <select
                                                    className="border rounded p-2 w-full"
                                                    value={selectedWorkHours[`${type}Minute`]}
                                                    onChange={(e) => handleTimeChange(`${type}Minute`, e.target.value)}
                                                >
                                                    {timeOptions.minutes.map((minute) => (
                                                        <option key={minute} value={minute}>{minute}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>

                                    ))}
                                </div>
                                <button
                                    onClick={timeRegister}
                                    className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                                    시간 등록
                                </button>
                            </div>
                        )
                    }
                </div>
            )}
        </div>
    );
};

export default Time;
