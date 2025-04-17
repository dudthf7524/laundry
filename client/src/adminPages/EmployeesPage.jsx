import { useEffect, useState } from 'react';
import { permissionLevels } from '../data/mockData';
import { USER_DELETE_REQUEST, USER_LIST_REQUEST, USER_UPDATE_REQUEST } from '../reducers/user';
import { useDispatch, useSelector } from 'react-redux';

const EmployeesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const [selected, setSelected] = useState({
    user_id: "",
    user_code: "",
    user_name: "",
    user_nickname: "",
    user_position: "",
    user_hire_date: "",
    auth_code: "",
    auth_name: "",
  });

  const [selectUpdate, setSelectUpdate] = useState({
    user_id: "",
    user_code: "",
    user_name: "",
    user_nickname: "",
    user_position: "",
    user_hire_date: "",
    auth_code: "",
    auth_name: "",
  });

  // Handle search input change
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

  const handleChange = (userList) => {
    setSelected(prev => ({
      ...prev,
      user_id: userList.user_id,
      user_code: userList.user_code,
      user_name: userList.user_name,
      user_nickname: userList.user_nickname,
      user_position: userList.user_position,
      user_hire_date: userList.user_hire_date,
      auth_code: userList.auth.auth_code,
      auth_name: userList.auth.auth_name,

      // 필요에 따라 더 많은 정보를 추가할 수 있습니다
    }));

    setSelectUpdate(prev => ({
      ...prev,
      user_id: userList.user_id,
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

  const { userLists } = useSelector((state) => state.user) || { userLists: [] };

  const filteredUserLists = userLists?.filter(employee => {
    const lowerCaseSearch = searchTerm.toLowerCase();

    return (
      employee.user_name.toLowerCase().includes(lowerCaseSearch) ||
      employee.user_nickname.toLowerCase().includes(lowerCaseSearch) ||
      employee.user_position.toLowerCase().includes(lowerCaseSearch)
    );
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

  const gotoJoin = () => {
    window.location.href = "/join"
  }

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

  const userUpdate = () => {
    const updatedUser = { ...selected };

    const data = {
      user_code: selectUpdate.user_code,
      user_name: selectUpdate.user_name,
      user_nickname: selectUpdate.user_nickname,
      user_position: selectUpdate.user_position,
      user_hire_date: selectUpdate.user_hire_date,
    };


    dispatch({
      type: USER_UPDATE_REQUEST,
      data: data,

    });

  }

  const handleDeleteUser = (user_code, user_name) => {
    if (window.confirm(` ${user_name} 을(를) 삭제하시겠습니까?`)) {
      const data = {
        user_code: user_code
      };

      dispatch({
        type: USER_DELETE_REQUEST,
        data: data,

      });
    }

  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">직원 관리</h1>
        <p className="text-gray-600 mt-1">
          직원 정보를 조회하고 관리합니다
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
          <button onClick={() => gotoJoin()} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            + 새 직원 추가
          </button>

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
                    <div className="mt-2 md:mt-0 flex items-center">
                      <>
                        <button className="text-blue-600 hover:text-blue-800 mr-3"
                          onClick={() =>
                            handleChange(userList)
                          }>
                          수정
                        </button>
                      </>
                    </div>
                  </div>
                  <div className="flex-2">
                    <div className="mt-2 md:mt-0 flex items-center">
                      <>
                        <button className="text-red-600 hover:text-red-800 mr-3"
                          onClick={() =>
                            handleDeleteUser(userList.user_code, userList.user_name)
                          }>
                          삭제
                        </button>
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
                  <dt className="text-sm font-medium text-gray-500 sm:w-40">아이디</dt>
                  <dd className="mt-1 sm:mt-0 text-sm text-gray-900">
                    <input
                      type="text"
                      value={selectUpdate.user_id}
                      onChange={(e) => setSelectUpdate({ ...selectUpdate, user_name: e.target.value })}
                      className="border border-gray-300 rounded-md p-1 w-full"
                      readOnly
                    />
                  </dd>
                </div>
                <div className="flex flex-col sm:flex-row">
                  <dt className="text-sm font-medium text-gray-500 sm:w-40">이름</dt>
                  <dd className="mt-1 sm:mt-0 text-sm text-gray-900">
                    <input
                      type="text"
                      value={selectUpdate.user_name}
                      onChange={(e) => setSelectUpdate({ ...selectUpdate, user_name: e.target.value })}
                      className="border border-gray-300 rounded-md p-1 w-full"
                    />
                  </dd>
                </div>

                <div className="flex flex-col sm:flex-row">
                  <dt className="text-sm font-medium text-gray-500 sm:w-40">닉네임</dt>
                  <dd className="mt-1 sm:mt-0 text-sm text-gray-900">
                    <input
                      type="text"
                      value={selectUpdate.user_nickname}
                      onChange={(e) => setSelectUpdate({ ...selectUpdate, user_nickname: e.target.value })}
                      className="border border-gray-300 rounded-md p-1 w-full"
                    />
                  </dd>
                </div>

                <div className="flex flex-col sm:flex-row">
                  <dt className="text-sm font-medium text-gray-500 sm:w-40">직무형태</dt>
                  <dd className="mt-1 sm:mt-0 text-sm text-gray-900">
                    <input
                      type="text"
                      value={selectUpdate.user_position}
                      onChange={(e) => setSelectUpdate({ ...selectUpdate, user_position: e.target.value })}
                      className="border border-gray-300 rounded-md p-1 w-full"
                    />
                  </dd>
                </div>

                <div className="flex flex-col sm:flex-row">
                  <dt className="text-sm font-medium text-gray-500 sm:w-40">입사일</dt>
                  <dd className="mt-1 sm:mt-0 text-sm text-gray-900">
                    <input
                      type="date"
                      value={selectUpdate.user_hire_date}
                      onChange={(e) => setSelectUpdate({ ...selectUpdate, user_hire_date: e.target.value })}
                      className="border border-gray-300 rounded-md p-1 w-full"
                    />
                  </dd>
                </div>
                <div className="flex flex-col sm:flex-row">
                  <dt className="text-sm font-medium text-gray-500 sm:w-40">권한</dt>
                  <dd className="mt-1 sm:mt-0 text-sm text-gray-900">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPermissionColor(selected.auth_code)}`}>
                      {permissionLevels[selected.auth_code]?.name || '일반'}
                    </span>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
          <button onClick={() => userUpdate()} className="mt-5 pb-3 pt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full">
            직원 정보수정
          </button>
        </div>
      )}
    </div>
  );
};

export default EmployeesPage;
