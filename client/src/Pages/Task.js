import React, { useState, useEffect } from 'react';
import { ReactComponent as Icon1 } from '../Assets/Images/star.svg';
import '../css/task.css';
import BottomBar from '../Components/BottomBar';

const TaskPage = () => {
    const [options, setOptions] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('선택해주세요');

    useEffect(() => {
        // 예시 데이터를 가져오는 함수
        const fetchData = async () => {
            // 실제 DB 요청을 대체할 예시 데이터
            const exampleData = [
                { id: 1, label: '옵션 1' },
                { id: 2, label: '옵션 2' },
                { id: 3, label: '옵션 3' },
                { id: 4, label: '옵션 4' },
                { id: 5, label: '옵션 5' },
                { id: 6, label: '옵션 6' },
            ];
            setOptions(exampleData); // 상태에 데이터 설정
        };

        fetchData();
    }, []); // 컴포넌트가 처음 렌더링될 때 한 번 실행

    const handleSelect = (option) => {
        setSelectedOption(option.label);
        setIsOpen(false); // 드롭다운 닫기
    };

    return (
        <div className='task'>
            <div></div>
            <div className="notice">
                <Icon1 className="icon" />
                <p>안녕하세요 00님! 오늘 하루도 화이팅!</p>
            </div>
            <div className="worker_select">

                <div className="select_one">
                    <div
                        className="custom-dropdown-selected"
                        onClick={() => setIsOpen((prev) => !prev)}
                    >
                        {selectedOption}
                    </div>
                    {isOpen && (
                        <ul className="custom-dropdown-options">
                            {options.map((option) => (
                                <li
                                    key={option.id}
                                    className="custom-dropdown-option"
                                    onClick={() => handleSelect(option)}
                                >
                                    {option.label}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className='select_two'>
                    <div>
                        총 230벌
                    </div>
                    <div>
                        평균 20 / 시간 당
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
                    <div>13:40~15:40</div>
                    <div>2:00</div>
                </div>

                <div className='work_time_three'>
                    <div>
                        시간당
                    </div>
                    <div>
                        분당
                    </div>
                </div>
               
                <div className="work_time_button">
                    <button>업무시작</button>
                    <button>업무종료</button>
                </div>
            </div>
            <div>
                오늘 업무 총평: 참 잘했어요
            </div>
            <BottomBar />
        </div>
    );
};

export default TaskPage;
