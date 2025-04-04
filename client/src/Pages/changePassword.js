import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { USER_LOGIN_REQUEST, USER_AUTH_REQUEST, USER_CHECK_ID_REQUEST, USER_CHECK_PASSWORD_REQUEST } from "../reducers/user";

const ChangePassword = () => {
    const { userCheckId, userCheckPassword } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const [userPassword, setUserPassword] = useState({ user_password: '' });
    const [formData, setFormData] = useState({
        new_user_password: '',
        new_user_password_check: '',
        notice_content: '',
    });
    const [isAvailable, setIsAvailable] = useState(false);
    const [checkIdState, setCheckIdState] = useState(false);


    const handleInputChange = (e) => {
        setUserPassword({ ...userPassword, [e.target.name]: e.target.value });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const checkPassword = () => {
        if (!userPassword.user_password) {
            alert("비밀번호를 입력해주세요");
            return;
        }
        const data = userPassword;
        dispatch({
            type: USER_CHECK_PASSWORD_REQUEST,
            data: data
        });
    }

    console.log(userCheckPassword)

    useEffect(() => {
        if (userCheckPassword === 0) {
            setIsAvailable(false);
            setCheckIdState(true)
        } else if (userCheckPassword === 1) {
            setIsAvailable(true);
            setCheckIdState(true)
        }
    }, [userCheckPassword]);

    return (
        <div className="w-[80%] flex flex-col items-center justify-center">
            <h2 className="text-xl font-bold mt-4">비밀번호 변경</h2>

            <div className="w-full mt-4 bg-white p-6 rounded-lg shadow-md">
                {/* 아이디 입력 및 중복 확인 */}
                <div className="mb-3">
                    <input
                        type="text"
                        name="user_password"
                        placeholder="현재 비밀번호를 입력해주세요"
                        value={userPassword.user_password}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    />
                </div>
                <div className="">

                    <button
                        type="button"
                        onClick={checkPassword}
                        className="w-full p-3 bg-[#00b7ff] text-white rounded-md hover:bg-[#0065b3] transition"
                    >
                        비밀번호 확인
                    </button>
                </div>
                {checkIdState ? (
                    <p className={`mt-2 text-sm ${isAvailable ? "text-green-500" : "text-red-500"}`}>
                        {isAvailable ? "비밀번호 확인 완료" : "현재 사용중인 비밀번호가 아닙니다."}
                    </p>
                ) : (<></>)}

                {/* 새로운 아이디 입력 필드 */}
                {/* {isAvailable ? (
                    <button
                        type="submit"
                        // onClick={changeId}
                        className="w-full mt-4 p-3 bg-[#00b7ff] text-white rounded-md hover:bg-[#0065b3] transition"
                    >
                        아이디 변경하기
                    </button>
                ) : (<></>)
                } */}

                {/* 새로운 아이디 입력 필드 */}
                {isAvailable && (
                    <>
                        <input
                            type="text"
                            name="new_user_password"
                            placeholder="새로운 비밀번호 입력"
                            value={formData.new_user_password}
                            onChange={handleChange}                            className="w-full mt-3 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                        <input
                            type="text"
                            name="new_user_password_check"
                            placeholder="비밀번호 확인"
                            value={formData.new_user_password_check}
                            onChange={handleChange}                            className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                    </>
                )}

                <button
                    type="submit"
                    className="w-full mt-4 p-3 bg-[#00b7ff] text-white rounded-md hover:bg-[#0065b3] transition"
                >
                   비밀번호 변경하기
                </button>
            </div>
        </div>
    );
};

export default ChangePassword;
