import React, { useEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { COMPANY_VACATION_REGISTER_REQUEST } from "../reducers/companyVacation";
import { VACATION_REGISTER_ADMIN_REQUEST, VACATION_REGISTER_REQUEST } from "../reducers/vacation";
import { USER_LIST_REQUEST } from "../reducers/user";

const VacationCompany = () => {

    const dispatch = useDispatch();
    // useEffect(() => {
    //     dispatch({ type: VACATION_LIST_REQUEST });
    // }, [dispatch]);

    useEffect(() => {
        userList();
    }, []);
    const userList = async () => {
        dispatch({
            type: USER_LIST_REQUEST,
        });
    };
    const { userLists } = useSelector((state) => state.user) || { userLists: [] };

    const [formData, setFormData] = useState({
        user_code: '',
        vacation_date: '',
        vacation_content: '',
        vacation_state: '승인'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    const handleSave = (e) => {
        e.preventDefault();
        dispatch({
            type: VACATION_REGISTER_ADMIN_REQUEST,
            data: formData
        })
    };
    
    console.log(formData)

    return (
        <div>
            {/* 캘린더 */}
            <div className="bg-white p-4  shadow mb-6">
                <h2 className="text-xl font-semibold mb-3">휴가 설정(직원)</h2>
                <form onSubmit={handleSave}>
                    <p className="mb-5">직원 선택</p>
                    <select
                        name="user_code"
                        value={formData.user_code}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 mb-5"
                    >
                        <option value="">사용자를 선택하세요</option>
                        {userLists?.map((user) => (
                            <option key={user.user_code} value={user.user_code}>
                                {user.user_name}
                            </option>
                        ))}
                    </select>
                    <p className="mb-5">날짜</p>
                    <input
                        type="date"
                        id="startDate"
                        name="vacation_date"
                        value={formData.vacation_date}
                        onChange={handleChange}

                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 mb-5"
                    />
                    <p className="mb-5">사유</p>
                    <input
                        onChange={handleChange}
                        name="vacation_content"
                        value={formData.vacation_content}
                        className="w-full p-3 border rounded mt-2 text-lg mb-5"
                    />
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700 w-full"
                    >
                        저장
                    </button>
                </form>
            </div>
        </div>
    );
};

export default VacationCompany;
