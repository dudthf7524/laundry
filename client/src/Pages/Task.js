import React, { useState, useEffect } from 'react';
import { ReactComponent as Icon1 } from '../Assets/Images/star.svg';

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
        <>
            <div className="box notice">
                <Icon1 className="icon"/>
                <p>안녕하세요 00님! 오늘 하루도 화이팅!</p>
            </div>
            <div className="box bord-box">
                <div className="custom-dropdown-container">
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
                <p>총 230벌</p>
                <p>평균 20 / 시간 당</p>
                <div className="row-form">
                    <button>QR촬영</button>
                    <button>선택</button>
                </div>
            </div>
            <div className="box bord-box">
                <div className="row-form">
                    <h4>업무시간</h4>
                    <h4>총업무시간</h4>
                </div>
                <div className="row-form">
                    <p>13:40~15:40</p>
                    <p>2:00</p>
                </div>
                <p>시간당</p>
                <p>분당</p>
                <div className="row-form work">
                    <button>업무시작</button>
                    <button>업무종료</button>
                </div>
            </div>
            <div className="box text">
                오늘 업무 총평: 참 잘했어요
            </div>
        </>
    );
};

export default TaskPage;
