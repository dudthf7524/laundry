import React, { useEffect, useState } from 'react';
import '../css/login.css';
import { useDispatch } from 'react-redux';
import { USER_LOGIN_REQUEST } from "../reducers/user";
import { USER_AUTH_REQUEST } from "../reducers/user";
import { useSelector } from "react-redux";

const Login = () => {
    const { user } = useSelector((state) => state.user);
    const { login } = useSelector((state) => state.user);
    const { user_login_error } = useSelector((state) => state.user);

    console.log(user)
    console.log(login)
    console.log(user_login_error)
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


    const dispatch = useDispatch();

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
            console.log("일치하지 않는 아이디");
            setError('아이디가 일치하지 않습니다.');
        } else if (user_login_error === 0) {
            console.log("일치하지 않는 비밀번호");
            setError('비밀번호가 일치하지 않습니다.');
        }
    }, [user_login_error]); 

    return (
        <div className="login">
            <h1>laundry</h1>
            {
                user ? (
                    <div>{user.user_name}님 환영합니다!</div>
                ) : (
                    <>
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
                                name="user_password"
                                placeholder="비밀번호"
                                value={credentials.user_password}
                                onChange={handleInputChange}
                            />
                            <button type="submit">로그인</button>
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
