import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import FilterChart from "../components copy/filterChart";
import { CHART_DATE_REQUEST, CHART_MONTH_REQUEST, CHART_YEAR_REQUEST } from "../reducers/chart";



// 더미 데이터 (API 연동 시 변경 가능)
// const dataByYear = [
//     { attendance_start_date: "2025-03-24", sum_hour: 0, user_name: "김경준", },
//     { attendance_start_date: "2025-03-25", sum_hour: 8, user_name: "김경준", },
//     { attendance_start_date: "2025-03-27", sum_hour: 0, user_name: "김경준", },
// ];


const dataByYear = [
    { attendance_start_date: "2025-03-24", sum_hour: 0, user_name: "김경준" },
    { attendance_start_date: "2025-03-25", sum_hour: 8, user_name: "김경준" },
    { attendance_start_date: "2025-03-27", sum_hour: 0, user_name: "김경준" },
    { attendance_start_date: "2025-03-24", sum_hour: 5, user_name: "이민수" },
    { attendance_start_date: "2025-03-25", sum_hour: 7, user_name: "이민수" },
    { attendance_start_date: "2025-03-27", sum_hour: 6, user_name: "이민수" },
    { attendance_start_date: "2025-03-24", sum_hour: 7, user_name: "최영솔솔" },
    { attendance_start_date: "2025-03-25", sum_hour: 8, user_name: "최영솔솔" },
    { attendance_start_date: "2025-03-27", sum_hour: 9, user_name: "최영솔솔" },
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


    const [startYear, setStartYear] = useState(null);
    const [endYear, setEndYear] = useState(null);

    const [startMonth, setStartMonth] = useState(null);
    const [endMonth, setEndMonth] = useState(null);

    const [month, setMonth] = useState(null);
    const [year, setYear] = useState(null);
    const [user, setUser] = useState(null);

    const [hiddenUsers, setHiddenUsers] = useState([]); // 숨겨진 사용자 목록

    const toggleUser = (userKey) => {
        setHiddenUsers((prev) =>
            prev.includes(userKey) ? prev.filter((u) => u !== userKey) : [...prev, userKey]
        );
    };

    const renderLines = () => {
        const userColors = ["#8884d8", "#82ca9d", "#ff7300", "#ff0000", "#00C49F"]; // 사용자별 색상 지정
        const groupedData = groupDataByUser();
        return Object.keys(groupedData)
            .filter(user => !hiddenUsers.includes(user)) // 선택되지 않은 사용자만 표시
            .map((user, index) => (
                <Line key={user} type="monotone" dataKey={user} stroke={userColors[index % userColors.length]} strokeWidth={2} />
            ));
    };

    // ✅ 사용자별 체크박스 스타일 Legend
    const renderCustomLegend = () => {
        const groupedData = groupDataByUser();
        return (
            <div style={{ display: "flex", gap: "10px", marginBottom: "10px", flexWrap: "wrap" }}>
                {Object.keys(groupedData).map((user, index) => (
                    <label key={user} style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                        <input
                            type="checkbox"
                            checked={!hiddenUsers.includes(user)}
                            onChange={() => toggleUser(user)}
                            style={{ marginRight: "5px" }}
                        />
                        <span style={{ color: ["#8884d8", "#82ca9d", "#ff7300", "#ff0000", "#00C49F"][index % 5] }}>
                            {user}
                        </span>
                    </label>
                ))}
            </div>
        );
    };

    // ✅ 툴팁(Tooltip) 커스터마이징 (시간:분 형식)
    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div style={{ background: "#fff", padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}>
                    <p><strong>{payload[0].payload.data}</strong></p>
                    {payload.map((entry, index) => {
                        const totalHours = entry.value;
                        const hours = Math.floor(totalHours);
                        const minutes = Math.round((totalHours - hours) * 60);
                        return (
                            <p key={index} style={{ color: entry.color }}>
                                {entry.name}: {hours}시간 {minutes}분
                            </p>
                        );
                    })}
                </div>
            );
        }
        return null;
    };

    const chartDate = async () => {
        const data = {
            startDate: startDate,
            endDate: endDate,
            user_code: user,
        }
        dispatch({
            type: CHART_DATE_REQUEST,
            data: data,
        });
    };
    const { chartDates } = useSelector((state) => state.chart);
    console.log(chartDates)

    const chartMonth = async () => {
        const data = {
            startDate: startYear+"-"+startMonth,
            endDate: endYear+"-"+endMonth,
        }
        dispatch({
            type: CHART_MONTH_REQUEST,
            data: data,
        });
    };

    const chartYear = async () => {
        const data = {
            startYear: startYear,
            endYear: endYear
        }
        dispatch({
            type: CHART_YEAR_REQUEST,
            data: data,
        });
    };

    const dispatch = useDispatch();

    useEffect(() => {
        if (filterType === "date" && startDate && endDate) {
            console.log("선택한 시작일", startDate)
            console.log("선택한 시작일", endDate)
            chartDate();
        } else if (filterType === "month" && startYear && endYear && startMonth && endMonth) {
            console.log("선택한 시작일", startYear)
            console.log("선택한 시작일", endYear)
            console.log("선택한 시작일", startMonth)
            console.log("선택한 시작일", endMonth)
            chartMonth();
        } else if (filterType === "year" && startYear && endYear) {
            console.log("선택한 시작일", startYear)
            console.log("선택한 시작일", endYear)
            chartYear();
        }
    }, [year, month, startDate, endDate, startYear, endYear, startMonth, endMonth]);


    const groupDataByUser = () => {
        const groupedData = {};

        chartDates?.forEach(({ date, user_name, user_code, sum_hour, sum_minute }) => {
            const key = `${user_name} (${user_code})`; // 같은 이름 구분하기 위해 user_code 추가
            if (!groupedData[key]) {
                groupedData[key] = [];
            }

            const hours = Number(sum_hour);
            const minutes = Number(sum_minute);

            groupedData[key].push({
                date,
                total_hours: hours + minutes / 60 // ✅ 분을 시간으로 변환하여 추가
            });

        });

        return groupedData;
    };

    const getChartData = () => {
        const users = groupDataByUser();
        const allDates = [...new Set(chartDates?.map(d => d.date))].sort();

        return allDates.map(date => {
            const entry = { date: date };
            Object.keys(users).forEach(user => {
                const userEntry = users[user].find(d => d.date === date);
                entry[user] = userEntry ? userEntry.total_hours : null;
            });
            return entry;
        });
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


            <FilterChart
                setFilterType={setFilterType}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
                setMonth={setMonth}
                setYear={setYear}
                setUser={setUser}
                setStartYear={setStartYear}
                setEndYear={setEndYear}
                setStartMonth={setStartMonth}
                setEndMonth={setEndMonth}
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
                {renderCustomLegend()} {/* 체크박스 형태의 사용자 선택 추가 */}
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={getChartData()}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis label={{ value: "총 근무 시간 (시간)", angle: -90, position: "insideLeft" }} />
                        <Tooltip content={<CustomTooltip />} /> {/* ✅ 툴팁 적용 */}
                        {renderLines()}
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default Chart;
