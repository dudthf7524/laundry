import React, { useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

// 더미 데이터 (API 연동 시 변경 가능)
const dataByYear = [
    { date: "2022", user1: 600, user2: 200, user3: 500, user4: 1000, user5: 1400, user6: 2100 },
    { date: "2023", user1: 700, user2: 300, user3: 600, user4: 1200, user5: 1600, user6: 2200 },
    { date: "2024", user1: 800, user2: 400, user3: 700, user4: 1300, user5: 1800, user6: 2300 },
];

const dataByMonth = [
    { date: "01월", user1: 180, user2: 160, user3: 150, user4: 170, user5: 190, user6: 180 },
    { date: "02월", user1: 175, user2: 155, user3: 145, user4: 165, user5: 185, user6: 175 },
    { date: "03월", user1: 200, user2: 180, user3: 170, user4: 190, user5: 210, user6: 200 },
];

const dataByDay = [
    { date: "01일", user1: 8, user2: 7, user3: 7, user4: 10, user5: 13, user6: 16 },
    { date: "02일", user1: 8, user2: 7, user3: 8, user4: 11, user5: 14, user6: 17 },
    { date: "03일", user1: 8, user2: 7, user3: 9, user4: 12, user5: 15, user6: 18 },
];




const AttendanceChart = () => {
    const [selectedData, setSelectedData] = useState("year");
    const [selectedUsers, setSelectedUsers] = useState([true, true, false, false, false, false]);

    // 데이터 변경 함수
    const getChartData = () => {
        switch (selectedData) {
            case "month":
                return dataByMonth;
            case "day":
                return dataByDay;
            default:
                return dataByYear;
        }
    };

    const handleUserChange = (index) => {
        const newSelectedUsers = [...selectedUsers];
        newSelectedUsers[index] = !newSelectedUsers[index];
        setSelectedUsers(newSelectedUsers);
    };

    const renderLines = () => {
        const users = ["user1", "user2", "user3", "user4", "user5", "user6"];
        return users.map((user, index) => {
            if (selectedUsers[index]) {
                const color = ["#8884d8", "#82ca9d", "#ffc658", "#d62728", "#2ca02c", "#ff7f0e"][index];
                return <Line key={user} type="monotone" dataKey={user} stroke={color} strokeWidth={2} name={`사용자 ${index + 1}`} />;
            }
            return null;
        });
    };

    return (
        <div className="p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-xl font-semibold mb-4">출퇴근 통계</h2>

            {/* 버튼 UI */}
            <div className="flex space-x-2 mb-4">
                <button onClick={() => setSelectedData("day")} className="px-4 py-2 bg-blue-500 text-white rounded">
                    일별
                </button>
                <button onClick={() => setSelectedData("month")} className="px-4 py-2 bg-green-500 text-white rounded">
                    월별
                </button>
                <button onClick={() => setSelectedData("year")} className="px-4 py-2 bg-red-500 text-white rounded">
                    연도별
                </button>
            </div>

            {/* 사용자 선택 UI */}
            <div className="flex space-x-2 mb-4">
                {["사용자 1", "사용자 2", "사용자 3", "사용자 4", "사용자 5", "사용자 6"].map((user, index) => (
                    <label key={index} className="inline-flex items-center space-x-2">
                        <input
                            type="checkbox"
                            checked={selectedUsers[index]}
                            onChange={() => handleUserChange(index)}
                            className="form-checkbox"
                        />
                        <span>{user}</span>
                    </label>
                ))}
            </div>

            {/* 차트 표시 */}
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={getChartData()}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />

                    {renderLines()}
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default AttendanceChart;
