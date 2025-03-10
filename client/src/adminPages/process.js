import React, { useEffect, useState } from 'react';
import '../adminCSS/time.css';
import { USER_LIST_REQUEST } from "../reducers/user";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Process = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        userList();
    }, []);

    const [selected, setSelected] = useState({
        user_code: "",

    });

    const handleCheckboxChange = (category, value) => {
        setSelected((prev) => ({
            ...prev,
            [category]: value,
        }));
    };


    const { userLists } = useSelector((state) => state.user);


    const userList = async () => {
        dispatch({
            type: USER_LIST_REQUEST,
        });
    };

    const navigate = useNavigate();


    const handleRowClick = (user_code) => {
        navigate("/admin/process/register", { state: { user_code } });
    };
    return (
        <div className="time">
            <div></div>
            <div className='title'>직원별 공정 관리</div>
            <table cellPadding="20" border={1}>
                <tbody>
                    <tr>

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
                                    <td onClick={() => handleRowClick(userList.user_code)} style={{ cursor: "pointer" }}>{userList.user_name}</td>
                                    <td>{userList.user_nickname}</td>
                                    <td>{userList.auth?.auth_name}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

        </div>
    );
};

export default Process;


