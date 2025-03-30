import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
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
import FilterControls from "../components copy/FilterControls";


// 더미 데이터 (API 연동 시 변경 가능)
const dataByYear = [
    { date: "2022", user1: 600, user2: 200, user3: 500, user4: 1000, user5: 1400, user6: 2100, user7: 10 },
    { date: "2023", user1: 700, user2: 300, user3: 600, user4: 1200, user5: 1600, user6: 2200, user7: 10 },
    { date: "2024", user1: 800, user2: 400, user3: 700, user4: 1300, user5: 1800, user6: 2300, user7: 2100 },
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

const Chart = () => {
    const [selectedData, setSelectedData] = useState("year");
    const [filterType, setFilterType] = useState('date'); // 'date', 'month', or 'year'
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [month, setMonth] = useState(null);
    const [year, setYear] = useState(null);

    

    const vacationDate = async () => {
        const data = {
            startDate: startDate,
            endDate: endDate,
        }
        // dispatch({
        //     type: ATTENDANCESTART_DATE_REQUEST,
        //     data: data,
        // });
    };

    const vacationMonth = async () => {
        const data = {
            year: year,
            month: month,
        }
        // dispatch({
        //     type: ATTENDANCESTART_MONTH_REQUEST,
        //     data: data,
        // });
    };

    const vacationYear = async () => {
        const data = {
            year: year
        }
        // dispatch({
        //     type: ATTENDANCESTART_YEAR_REQUEST,
        //     data: data,
        // });
    };

    const dispatch = useDispatch();

    useEffect(() => {
        if (filterType === "date" && startDate && endDate) {
            console.log("선택한 시작일", startDate)
            console.log("선택한 시작일", startDate)
          
            // vacationDate();
        } else if (filterType === "month" && year && month) {
            console.log("선택한 시작일", startDate)
            console.log("선택한 시작일", startDate)
            // vacationMonth();
        } else if (filterType === "year" && year) {
            console.log("선택한 시작일", startDate)
            console.log("선택한 시작일", startDate)
            // vacationYear();
        }
    }, [year, month, startDate, endDate]);

    const [selectedUsers, setSelectedUsers] = useState([true, true, false, false, false, false]);

    const renderLines = () => {
        const users = ["user1", "user2", "user3", "user4", "user5", "user6", "user7"];
        return users.map((user, index) => {
            if (selectedUsers[index]) {
                const color = ["#8884d8", "#82ca9d", "#ffc658", "#d62728", "#2ca02c", "#ff7f0e"][index];
                return <Line key={user} type="monotone" dataKey={user} stroke={color} strokeWidth={2} name={`사용자 ${index + 1}`} />;
            }
            return null;
        });
    };

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

    return (
        <div>

            <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">차트</h1>
                    <p className="text-gray-600 mt-1">
                        차트 조회 및 비교
                    </p>
                </div>
            </div>


            <FilterControls
                setFilterType={setFilterType}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
                setMonth={setMonth}
                setYear={setYear}
            />

            <div className="p-6 bg-white shadow-lg rounded-lg">
                <h2 className="text-xl font-semibold mb-4">출퇴근 통계</h2>

                {/* 버튼 UI */}
                {/* <div className="flex mb-4 space-x-2">
                    <button
                        className={`px-3 py-1 rounded text-sm ${timeFrame === 'daily'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                        onClick={() => handleTimeFrameChange('daily')}
                    >
                        일별
                    </button>
                    <button
                        className={`px-3 py-1 rounded text-sm ${timeFrame === 'monthly'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                        onClick={() => handleTimeFrameChange('monthly')}
                    >
                        월별
                    </button>
                    <button
                        className={`px-3 py-1 rounded text-sm ${timeFrame === 'yearly'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                        onClick={() => handleTimeFrameChange('yearly')}
                    >
                        연도별
                    </button>
                </div> */}

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
        </div>
    );
};

export default Chart;
