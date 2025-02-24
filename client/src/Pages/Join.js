import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../Api'; // 작성한 axios 인스턴스 사용
import '../Styles/Auth.css';

const Join = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        user_id: '',
        name: '',
        nickname: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [isUsernameChecked, setIsUsernameChecked] = useState(false);
    const [isUsernameValid, setIsUsernameValid] = useState(false); // 아이디 입력 여부 상태

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        if (name === 'user_id') {
            setIsUsernameChecked(false); // 아이디 변경 시 중복 확인 상태 초기화
            setIsUsernameValid(value.trim().length > 0); // 입력란에 텍스트가 있는지 확인
        }
    };

    const handleCheckDuplicate = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await axios.post('/user/check-username', { user_id: formData.user_id });
            if (response.data.success || response.data.message === 'Username is available') {
                alert('사용 가능한 아이디입니다.');
                setIsUsernameChecked(true);
            } else {
                setError(response.data.message || '이미 사용 중인 아이디입니다.');
                setIsUsernameChecked(false);
            }
        } catch (err) {
            setError(err.response?.data?.message || '서버 오류가 발생했습니다.');
            setIsUsernameChecked(false);
        }
    };

    const handleJoin = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (!isUsernameChecked) {
            setError('아이디 중복 확인을 해주세요.');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('비밀번호가 일치하지 않습니다.');
            return;
        }

        try {
            const response = await axios.post('/user/join', formData);
            if (response.data.success) {
                setSuccess('회원가입에 성공했습니다. 로그인 페이지로 이동합니다.');
                setTimeout(() => navigate('/'), 2000); // 2초 후 로그인 페이지로 이동
            } else {
                setError(response.data.message || '회원가입에 실패했습니다.');
            }
        } catch (err) {
            setError(err.response?.data?.message || '서버 오류가 발생했습니다.');
        }
    };

    const handleLoginClick = () => {
        navigate('/');
    };

    return (
        <>
            <div className="login">
                <h1>laundry</h1>
                <h2>회원가입</h2>
                <form onSubmit={handleJoin}>
                    <div>
                        <input
                            type="text"
                            name="user_id"
                            placeholder="아이디"
                            value={formData.username}
                            onChange={handleInputChange}
                        />
                        <button
                            className={`${isUsernameValid ? 'active' : 'disabled'}`}
                            onClick={handleCheckDuplicate}
                            disabled={!isUsernameValid} // 비활성화 상태
                        >
                            중복확인
                        </button>
                    </div>
                    <input
                        type="text"
                        name="name"
                        placeholder="이름"
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="nickname"
                        placeholder="닉네임"
                        value={formData.nickname}
                        onChange={handleInputChange}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="비밀번호"
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="비밀번호 확인"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                    />
                    <button type="submit">회원가입</button>
                </form>
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}
                <p className="login-link" onClick={handleLoginClick}>로그인하기</p>
            </div>
            <div className="ocean">
                <div className="wave"></div>
                <div className="wave"></div>
            </div>
        </>
    );
};

export default Join;
