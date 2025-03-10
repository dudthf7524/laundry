import { useDispatch, useSelector } from 'react-redux';

import { USER_LIST_REQUEST } from "../reducers/user";
import { useEffect, useState } from 'react';

const UserList = () => {

    useEffect(() => {
        userList();
    }, []);

    const dispatch = useDispatch();
    const { userLists } = useSelector((state) => state.user);
    const [selected, setSelected] = useState({
        user_code: "",

    });
    const userList = async () => {
        dispatch({
            type: USER_LIST_REQUEST,
        });
    };
    const handleCheckboxChange = (category, value) => {
        setSelected((prev) => ({
            ...prev,
            [category]: value,
        }));
    };
    return (
        <div className="user_list">
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
    )
}
export default UserList;