import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../Api';
import '../css/login.css';
import { useDispatch } from 'react-redux';
import { USER_LOGIN_REQUEST } from "../reducers/user";
import { USER_AUTH_REQUEST } from "../reducers/user";
import { useSelector } from "react-redux";

const Login = () => {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.user);
    console.log(user)
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

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null); // 에러 초기화
        try {
            const response = await axios.post('/user/login', credentials);
            console.log(response.data.check)
            // 로그인 성공 시 처리 (예: 토큰 저장 및 페이지 이동)
            if (response.data.check === 1) {
                // 예: localStorage에 토큰 저장
                localStorage.setItem('token', response.data.token);
                window.location.href = "/";
            } else if (response.data.check === 0) {
                setError('비밀번호가 일치하자 않습니다.');
            } else if (response.data.check === -1) {
                setError('아이디가 일치하지 않습니다.');
            } else {
                setError(response.data.message || '로그인에 실패했습니다.');
            }
        } catch (err) {
            setError(err.response?.data?.message || '서버 오류가 발생했습니다.');
        }
    };

    const handleSignupClick = () => {
        navigate('/join');
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


    const dispatch = useDispatch();

    const login = (e) => {
        e.preventDefault();
        dispatch({
            type: USER_LOGIN_REQUEST,
            data: credentials,
        });
    };


    return (
        <div className="login">
            <h1>laundry</h1>
            <h2>로그인</h2>
            <form onSubmit={login}>
                <input
                    type="text"
                    name="user_id"
                    placeholder="아이디"
                    value={credentials.user_id}
                    onChange={handleInputChange}
                />
                <input
                    type="password"
                    name="user_password"
                    placeholder="비밀번호"
                    value={credentials.user_password}
                    onChange={handleInputChange}
                />
                <button type="submit">로그인</button>
            </form>
            {error && <p className="error-message">{error}</p>}
            <p className="login-link" onClick={handleSignupClick}>회원가입</p>
            <div className="ocean">
                <div className="wave"></div>
                <div className="wave"></div>
            </div>
        </div>
    );
};

export default Login;
