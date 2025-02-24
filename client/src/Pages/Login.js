import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../Api';
import '../Styles/Auth.css';

const Login = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        user_id: '',
        password: ''
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

            // 로그인 성공 시 처리 (예: 토큰 저장 및 페이지 이동)
            if (response.data.success) {
                // 예: localStorage에 토큰 저장
                localStorage.setItem('token', response.data.token);
                alert('로그인 성공!');
                navigate('/dashboard'); // 대시보드 또는 다른 페이지로 이동
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

    return (
        <>
            <div className="login">
                <h1>laundry</h1>
                <h2>로그인</h2>
                <form onSubmit={handleLogin}>
                    <input 
                        type="text" 
                        name="user_id"
                        placeholder="아이디" 
                        value={credentials.user_id}
                        onChange={handleInputChange}
                    />
                    <input 
                        type="password" 
                        name="password"
                        placeholder="비밀번호" 
                        value={credentials.password}
                        onChange={handleInputChange}
                    />
                    <button type="submit">로그인</button>
                </form>
                {error && <p className="error-message">{error}</p>}
                <p className="login-link" onClick={handleSignupClick}>회원가입</p>
            </div>
            <div class="ocean">
                <div class="wave"></div>
                <div class="wave"></div>
            </div>
        </>
    );
};

export default Login;
