import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { USER_INFORMATION_REQUEST } from '../reducers/user';

const MyPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
   
    const changeId = () => {
        navigate('/change/id');
    }
    const changePassword = () => {
        navigate('/change/password');
    }

    const userInformations = async () => {
        dispatch({
            type: USER_INFORMATION_REQUEST,
        });
    };
    useEffect(() => {
        userInformations();

    }, []);
    const { userInformation } = useSelector((state) => state.user);

    return (
        <div className="flex flex-col items-center w-full h-screen p-[2vw] box-border overflow-y-auto">
            <h2 className="text-lg font-medium text-gray-900 mb-4">MY PAGE</h2>
            <div className="p-4 mb-4 border rounded-lg w-full text-center">
                <h3 className="text font-semibold mb-2">
                    이름
                </h3>
                <input
                    type="text"
                    name="notice_title"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-center"
                    value={userInformation?.user_name || ''}
                    readOnly
                    placeholder="공지사항 제목을 입력하세요"
                />
            </div>

            <div className="p-4 mb-4 border rounded-lg w-full">
                <h3 className="text  font-semibold mb-2 text-center">
                    닉네임
                </h3>
                <input
                    type="text"
                    name="notice_title"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-center"
                    value={userInformation?.user_nickname || '' }
                    readOnly
                    placeholder="공지사항 제목을 입력하세요"
                />
            </div>

            <div className="p-4 mb-4 border rounded-lg w-full">
                <h3 className="text  font-semibold mb-2 text-center">
                    직급
                </h3>
                <input
                    type="text"
                    name="notice_title"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-center"
                    value={userInformation?.user_position || ''}
                    readOnly
                    placeholder="공지사항 제목을 입력하세요"
                />
            </div>

            <div className="p-4 mb-4 border rounded-lg w-full">
                <h3 className="text  font-semibold mb-2 text-center">
                    입사일
                </h3>
                <input
                    type="text"
                    name="notice_title"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-center"
                    value={userInformation?.user_hire_date || ''}
                    readOnly
                    placeholder="공지사항 제목을 입력하세요"
                />
            </div>


            <div className="flex flex-col w-full gap-5">
                {/* 아이디 변경 */}
                <div>
                    <button

                        onClick={changeId}
                        className="w-full p-3 bg-white text-black border rounded-lg transition hover:bg-black hover:text-white"
                    >
                        아이디 변경
                    </button>
                </div>
                <div>
                    <button

                        onClick={changePassword}
                        className="w-full p-3 bg-white text-black border rounded-lg transition hover:bg-black hover:text-white"
                    >
                        비밀번호 변경
                    </button>
                </div>

            </div>

        </div>
    );
};

export default MyPage;
