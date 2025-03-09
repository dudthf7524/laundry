import React, { useEffect, useState } from 'react';
import '../adminCSS/fixedTime.css';
import { USER_LIST_REQUEST } from "../reducers/user";
import { useDispatch, useSelector } from 'react-redux';

const FixedTime = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        userList();
    }, []);

    const times = Array.from({ length: 24 }, (_, i) =>
        `${String(i).padStart(2, "0")}:00`
    );

    console.log(times);

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
    return (
        <div className="fixed_time">
            <div></div>
            <div className='title'>시간설정</div>
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
            <div className='content'>
                <div className='option'>
                    출근시간
                    <select>
                        {
                            times.map((time, index) => {
                                return (
                                    <option key={index}>{time}</option>
                                )

                            })
                        }
                    </select>
                </div>
                <div className='option'>
                    퇴근시간
                    <select>
                        {
                            times.map((time, index) => {
                                return (
                                    <option key={index}>{time}</option>
                                )

                            })
                        }
                    </select>
                </div>
                <div className='option'>
                    휴식시간
                    <select>
                        {
                            times.map((time, index) => {
                                return (
                                    <option key={index}>{time}</option>
                                )

                            })
                        }
                    </select>
                    ~
                    <select>
                        {
                            times.map((time, index) => {
                                return (
                                    <option key={index}>{time}</option>
                                )

                            })
                        }
                    </select>
                </div>
            </div>





        </div>
    );
};

export default FixedTime;


