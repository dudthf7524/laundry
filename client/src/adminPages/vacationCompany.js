import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { employees, permissionLevels } from "../data/mockData";
import { VACATION_ALLOW_REQUEST, VACATION_LIST_REQUEST, VACATION_REGISTER_REQUEST } from "../reducers/vacation";
import { NOTICE_UPDATE_REQUEST } from "../reducers/notice";
import { COMPANY_VACATION_REGISTER_REQUEST } from "../reducers/companyVacation";

const VacationCompany = () => {

    const dispatch = useDispatch();
    // useEffect(() => {
    //     dispatch({ type: VACATION_LIST_REQUEST });
    // }, [dispatch]);


    const [formData, setFormData] = useState({
        company_vacation_date: '',
        company_vacation_reason: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    const handleSave= (e) => {
        e.preventDefault();
        dispatch({
            type: COMPANY_VACATION_REGISTER_REQUEST,
            data: formData
        })
    };

    // 캘린더 렌더링
    return (
        <div>
            {/* 캘린더 */}
            <div className="bg-white p-4  shadow mb-6">
                <h2 className="text-xl font-semibold mb-3">휴무일 설정(회사)</h2>
                <form onSubmit={handleSave}>
                    <p className="mb-5">날짜</p>
                    <input
                        type="date"
                        id="startDate"
                        name="company_vacation_date"
                        value={formData.notice_title}
                        onChange={handleChange}

                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 mb-5"
                    />
                    <p className="mb-5">사유</p>
                    <input
                        onChange={handleChange}
                        name="company_vacation_reason"
                        value={formData.notice_title}
                        className="w-full p-3 border rounded mt-2 text-lg"
                    />
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700 w-full"
                    >
                        수정
                    </button>
                </form>
            </div>
        </div>
    );
};

export default VacationCompany;
