import React, { useEffect, useState } from 'react';
import axios from '../Api';

const User = () => {
    const [userLists, setUserLists] = useState();


    useEffect(() => {
        userAuth();
    }, []);

    const userAuth = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                return;
            }
            const response = await axios.get("/user/list", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUserLists(response.data)

        } catch (error) {
            console.error("로그인 인증 실패:", error);
        }
    };
    const [selected, setSelected] = useState({
        user_code: "",

    });

    const handleCheckboxChange = (category, value) => {
        setSelected((prev) => ({
            ...prev,
            [category]: value,
        }));
    };
    return (
        <div>

            <div className="user" style={{ height: "900px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>

                <div>변경할 직원을 선택해주세요 . <button type='button'>권한변경</button></div>
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
        </div>
    );
};

export default User;
