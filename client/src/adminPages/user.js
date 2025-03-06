import React, { useEffect, useState } from 'react';
import axios from '../Api';
import { useDispatch, useSelector } from 'react-redux';
import { USER_LIST_REQUEST } from "../reducers/user";
import { USER_AUTH_UPDATE_REQUEST } from "../reducers/user";
import { AUTH_LIST_REQUEST } from "../reducers/auth";

const User = () => {

    useEffect(() => {
        userList();
        authList();
    }, []);

    const dispatch = useDispatch();
    const [openModal, setOpenModal] = useState(false);
    const [selectedAuth, setSelectedAuth] = useState(""); // 선택된 근무 패턴

    const { userLists } = useSelector((state) => state.user);
    const { authLists } = useSelector((state) => state.auth);

    const userList = async () => {
        dispatch({
            type: USER_LIST_REQUEST,
        });
    };

    const authList = async () => {
        dispatch({
            type: AUTH_LIST_REQUEST,
        });
    };

    const [selected, setSelected] = useState({
        user_code: "",

    });

    const update = async () => {
        
        if(!selected.user_code){
           alert('권한을 변경할 직원을 선택하세요') 
           return;
        }
        setOpenModal(true)
    }

    const handleCheckboxChange = (category, value) => {
        setSelected((prev) => ({
            ...prev,
            [category]: value,
        }));
    };
    const authUpdate = () => {
        console.log(selectedAuth)
        console.log(selected.user_code)

        const data = {
            auth_code: selectedAuth,
            user_code: selected.user_code
        };

        dispatch({
            type: USER_AUTH_UPDATE_REQUEST,
            data: data,

        });
    }

    const AuthChange = (event) => {
        setSelectedAuth(event.target.value);
    };
    return (
        <div>

            <div className="user" style={{ height: "900px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>

                <div>변경할 직원을 선택해주세요 . <button type='button' onClick={() => update()}>권한변경</button></div>
                <br></br>
                <table cellPadding="20" border={1}>
                    <tbody>
                        <tr>
                            <th></th>
                            <th>이름</th>
                            <th>회사내 이름</th>
                            <th>권한</th>
                        </tr>
                    </tbody>
                    <tbody>
                        {
                            userLists?.map((userList, index) => {
                                return (

                                    <tr key={index}>
                                        <td>
                                            <input type='checkbox'
                                                checked={selected.user_code === userList.user_code}
                                                onChange={() =>
                                                    handleCheckboxChange("user_code", userList.user_code)
                                                }></input>
                                        </td>
                                        <td>{userList.user_name}</td>
                                        <td>{userList.user_nickname}</td>
                                        <td>{userList.auth?.auth_name}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            {openModal && (
                <div style={{
                    position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
                    background: "white", padding: "20px", boxShadow: "0px 0px 10px rgba(0,0,0,0.3)", borderRadius: "8px"
                }}>
                    <h3>권한 설정</h3>
                    <br></br>
                    <div>
                        <select value={selectedAuth} onChange={AuthChange}>
                            <option value="">권한을 선택하세요</option>
                            {
                                authLists.map((authList, index) => {
                                    return (
                                        <option key={index} value={authList.auth_code}>
                                            {authList.auth_name}
                                        </option>
                                    )
                                })
                            }

                        </select>
                    </div>
                    <br></br>
                    <button onClick={() => authUpdate()}>권한변경</button>
                    <button onClick={() => setOpenModal(false)}>닫기</button>
                </div>
            )}
        </div>
    );
};

export default User;
