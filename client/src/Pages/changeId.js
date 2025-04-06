import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { USER_LOGIN_REQUEST, USER_AUTH_REQUEST, USER_CHECK_ID_REQUEST, USER_CHANGE_ID_REQUEST } from "../reducers/user";
import { LOGOUT_REQUEST } from '../reducers/logout';

const ChangeId = () => {
    const { userCheckId, userChangeId } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const [userId, setUserId] = useState({ user_id: '' });
    const [isAvailable, setIsAvailable] = useState(false);
    const [checkIdState, setCheckIdState] = useState(false);


    const handleInputChange = (e) => {
        setUserId({ ...userId, [e.target.name]: e.target.value });
    };

    const checkId = () => {
        if (!userId.user_id) {
            alert("아이디를 입력해주세요");
            return;
        }
        const data = userId;
        dispatch({
            type: USER_CHECK_ID_REQUEST,
            data: data
        });
    }

    const changeId = () => {
        const data = userId;
        dispatch({
            type: USER_CHANGE_ID_REQUEST,
            data: data
        });
    };

    useEffect(() => {
        if (userChangeId === 1) {
            dispatch({
                type: LOGOUT_REQUEST,
            });
        }
    }, [userChangeId]);



    useEffect(() => {
        if (userCheckId === 0) {
            setIsAvailable(true);
            setCheckIdState(true)
        } else if (userCheckId === 1) {
            setIsAvailable(false);
            setCheckIdState(true)
        }
    }, [userCheckId]);

    return (
        <div className="w-[80%] flex flex-col items-center justify-center">
            <h2 className="text-xl font-bold mt-4">아이디 변경</h2>

            <div className="w-full mt-4 bg-white p-6 rounded-lg shadow-md">
                {/* 아이디 입력 및 중복 확인 */}
                <div className="mb-3">
                    <input
                        type="text"
                        name="user_id"
                        placeholder="아이디"
                        value={userId.user_id}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    />
                </div>

                <div className="">
                    <button
                        type="button"
                        onClick={checkId}
                        className="w-full p-3 bg-[#00b7ff] text-white rounded-md hover:bg-[#0065b3] transition"
                    >
                        중복 확인
                    </button>
                </div>
                {checkIdState ? (
                    <p className={`mt-2 text-sm ${isAvailable ? "text-green-500" : "text-red-500"}`}>
                        {isAvailable ? "사용 가능한 아이디입니다." : "이미 사용 중인 아이디입니다."}
                    </p>
                ) : (<></>)
                }

                {/* 새로운 아이디 입력 필드 */}
                {isAvailable ? (
                    <button
                        type="submit"
                        onClick={changeId}
                        className="w-full mt-4 p-3 bg-[#00b7ff] text-white rounded-md hover:bg-[#0065b3] transition"
                    >
                        아이디 변경하기
                    </button>
                ) : (<></>)
                }

            </div>
        </div>
    );
};

export default ChangeId;
