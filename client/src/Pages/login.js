import React, { useEffect, useState } from 'react';
import '../css/login.css';
import { useDispatch } from 'react-redux';
import { USER_LOGIN_REQUEST } from "../reducers/user";
import { USER_AUTH_REQUEST } from "../reducers/user";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { user } = useSelector((state) => state.user);
    const { login } = useSelector((state) => state.user);
    const { user_login_error } = useSelector((state) => state.user);

    const logoImg = process.env.PUBLIC_URL + '/logo/logo.png';


    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [credentials, setCredentials] = useState({
        user_id: '',
        user_password: ''
    });
    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCredentials({
            ...credentials,
            [name]: value
        });
    };

    useEffect(() => {
        userAuth();
    }, []);


    const userAuth = async () => {
        dispatch({
            type: USER_AUTH_REQUEST,
            data: credentials,
        });
    };

    const goClient = () => {
        navigate('/attendance')
    }
    const goAdmin = () => {
        navigate('/admin/dashboard')
    }




    const handleLogin = (e) => {
        if (credentials.user_id === "") {
            alert("아이디를 입력해주세요")
            return;
        } else if (credentials.user_password === "") {
            alert('비밀번호를 입력해주세요')
            return;
        }

        e.preventDefault();

        dispatch({
            type: USER_LOGIN_REQUEST,
            data: credentials,

        });
    };

    useEffect(() => {
        if (user_login_error === -1) {
            setError('아이디가 일치하지 않습니다.');
        } else if (user_login_error === 0) {
            setError('비밀번호가 일치하지 않습니다.');
        }
    }, [user_login_error]);

    return (
        <div className="login">
            <img
                src={logoImg}
                alt="로고"
                className="w-full max-w-[300px] h-auto"
            />
            {
                user?.auth_code === "A1" || user?.auth_code === "A2" || user?.auth_code === "A3" ? (
                    <div className='w-full'>
                        <div className="welcome-message text-xl font-semibold text-gray-800 mt-6 text-center animate-fade-in">
                            👋 {user.user_name}님, 환영합니다!
                        </div>

                        <div className='relative z-50'>
                            <button
                                type="submit"
                                onClick={goAdmin}
                                className="w-full mt-4 p-3 bg-[#00b7ff] text-white rounded-md hover:bg-[#0065b3] transition"
                            >
                                관리자 페이지
                            </button>
                        </div>
                        <div className='relative z-50'>
                            <button
                                type="submit"
                                onClick={goClient}
                                className="w-full mt-4 p-3 bg-[#00b7ff] text-white rounded-md hover:bg-[#0065b3] transition z-50"
                            >
                                근로자 페이지
                            </button>
                        </div>

                    </div>
                ) : user?.auth_code === "A4" ? (
                    <div className='w-full'>
                        <div className="welcome-message text-xl font-semibold text-gray-800 mt-6 text-center animate-fade-in">
                            👋 {user.user_name}님, 환영합니다!
                        </div>
                        <div className='relative z-50'>
                            <button
                                type="submit"
                                onClick={goClient}
                                className="w-full mt-4 p-3 bg-[#00b7ff] text-white rounded-md hover:bg-[#0065b3] transition"
                            >
                                근로자 페이지
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        <form onSubmit={handleLogin}>
                            <input
                                className="z-50"
                                type="text"
                                name="user_id"
                                placeholder="아이디"
                                value={credentials.user_id}
                                onChange={handleInputChange}
                            />
                            <input
                                className="z-50"
                                type="password"
                                name="user_password"
                                placeholder="비밀번호"
                                value={credentials.user_password}
                                onChange={handleInputChange}
                            />
                            <button className="z-50" type="submit">로그인</button>
                        </form>
                        {error && <p className="error-message">{error}</p>}
                    </>
                )
            }

            <div className="ocean">
                <div className="wave"></div>
                <div className="wave"></div>
            </div>
        </div>
    );
};

export default Login;
