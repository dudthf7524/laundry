import React, { useEffect } from 'react';
import '../adminCSS/fixedTime.css';
import { USER_LIST_REQUEST } from "../reducers/user";
import { useDispatch, useSelector } from 'react-redux';

const FixedTime = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        userList();
    }, []);
    const { userLists } = useSelector((state) => state.user);

    const userList = async () => {
        dispatch({
            type: USER_LIST_REQUEST,
        });
    };
    return (
        <>
            <div className="admin_menu_bar">

                <div className='menu'>
                    <a href='/admin/user/list'>직원관리</a>
                </div>
                <div className='menu'>
                    <a href='/admin/user'>권한관리</a>
                </div>
                <div className='menu'>
                    <a href='#'>  출/퇴근 관리</a>
                </div>
            </div>
            <div className="fixed_time">
                <div className='title'>시간설정</div>
                <div className='content'>
                    <div className='option'>
                        출근시간 <select>
                            <option>09:00</option>
                        </select>
                    </div>
                    <div className='option'>
                        퇴근시간
                    </div>
                    <div className='option'>
                        휴식시간
                    </div>
                </div>



            </div>


        </>
    );
};

export default FixedTime;


