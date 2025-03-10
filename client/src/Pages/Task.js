import React, { useState, useEffect } from 'react';
import { ReactComponent as Icon1 } from '../Assets/Images/star.svg';
import '../css/task.css';
import BottomBar from '../Components/BottomBar';
import { useDispatch, useSelector } from 'react-redux';

const TaskPage = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    const { optionLists } = useSelector((state) => state.option);
    
    // 선택된 옵션을 관리하는 state
    const [selectedOption, setSelectedOption] = useState("세탁");

    // useEffect(() => {
    //     optionList();
    // }, []);

    // const optionList = () => {
    //     dispatch({
    //         type: OPTION_LIST_REQUEST,
    //     });
    // };

    // 선택한 옵션의 데이터 필터링
    const filteredOption = optionLists?.find(option => option.option_name === selectedOption);

    const options = ["세탁", "다림질", "배송"];

    return (
        <div className='task'>
            <div></div>
            <div className="notice">
                <Icon1 className="icon" />
                <p>안녕하세요 {user?.user_name}님! 오늘 하루도 화이팅!</p>
            </div>
            <div className="worker_select">
                {/* 옵션 선택 드롭다운 */}
                <select
                    className='select_one'
                    name="option_name"
                    value={selectedOption}
                    onChange={(e) => setSelectedOption(e.target.value)}
                >
                    {options.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                    ))}
                </select>

                <div className='select_two'>
                    <div>
                        {/* 선택한 옵션에 대한 정보 표시 */}
                        <div>
                            {filteredOption ? (
                                <>
                                    <div>총 수량 : {filteredOption.option_count || 0}벌</div>
                                </>
                            ) : (
                                <div>해당 옵션의 데이터가 없습니다.</div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="select_three">
                    <button>QR촬영</button>
                    <button>선택</button>
                </div>
            </div>
            <div className="work_time">
                <div className="work_time_one">
                    <div>업무시간</div>
                    <div>총업무시간</div>
                </div>
                <div className="work_time_two">
                    <div>13:40~15:40 <input type="time"></input></div>
                    <div>2:00</div>
                </div>

                <div className='work_time_three'>
                    <div>시간당</div>
                    <div>분당</div>
                </div>

                <div className="work_time_button">
                    <button>업무시작</button>
                    <button>업무종료</button>
                </div>
            </div>
            <div>오늘 업무 총평: 참 잘했어요</div>
            <BottomBar />
        </div>
    );
};

export default TaskPage;
