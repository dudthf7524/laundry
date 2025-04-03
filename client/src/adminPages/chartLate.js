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
import FilterChart from "../adminComponents/filterChart";

import { CHARTLATE_DATE_REQUEST, CHARTLATE_MONTH_REQUEST, CHARTLATE_YEAR_REQUEST } from "../reducers/chartLate";

const ChartLate = () => {

    const [filterType, setFilterType] = useState('date'); // 'date', 'month', or 'year'
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [startYear, setStartYear] = useState(null);
    const [endYear, setEndYear] = useState(null);

    const [startMonth, setStartMonth] = useState(null);
    const [endMonth, setEndMonth] = useState(null);

    const [month, setMonth] = useState(null);
    const [year, setYear] = useState(null);
    const [hiddenUsers, setHiddenUsers] = useState([]); // 숨겨진 사용자 목록

    const toggleUser = (userKey) => {
        setHiddenUsers((prev) =>
            prev.includes(userKey) ? prev.filter((u) => u !== userKey) : [...prev, userKey]
        );
    };
    //linear
    //monotone
    const renderLines = () => {
        const userColors = ["#8884d8", "#82ca9d", "#ff7300", "#ff0000", "#00C49F"]; // 사용자별 색상 지정
        const groupedData = groupDataByUser();
        return Object.keys(groupedData)
            .filter(user => !hiddenUsers.includes(user)) // 선택되지 않은 사용자만 표시
            .map((user, index) => (
                <Line key={user} type="linear" dataKey={user} stroke={userColors[index % userColors.length]} strokeWidth={2} />
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
                        const late_count = entry.value;

                        return (
                            <p key={index} style={{ color: entry.color }}>
                                {entry.name}: {late_count}회
                            </p>
                        );
                    })}
                </div>
            );
        }
        return null;
    };

    const dispatch = useDispatch();

    const chartLateDate = async () => {
        const data = {
            startDate: startDate,
            endDate: endDate,
        }
        dispatch({
            type: CHARTLATE_DATE_REQUEST,
            data: data,
        });
    };

    const chartLateMonth = async () => {
        const data = {
            startDate: startYear + "-" + startMonth,
            endDate: endYear + "-" + endMonth,
        }
        dispatch({
            type: CHARTLATE_MONTH_REQUEST,
            data: data,
        });
    };

    const chartLateYear = async () => {
        const data = {
            startYear: startYear,
            endYear: endYear
        }
        dispatch({
            type: CHARTLATE_YEAR_REQUEST,
            data: data,
        });
    };

    useEffect(() => {
        if (filterType === "date" && startDate && endDate) {
            chartLateDate();
        } else if (filterType === "month" && startYear && endYear && startMonth && endMonth) {
            chartLateMonth();
        } else if (filterType === "year" && startYear && endYear) {
            chartLateYear();
        }
    }, [year, month, startDate, endDate, startYear, endYear, startMonth, endMonth]);

    const { chartLateDatas } = useSelector((state) => state.chartLate);

    const groupDataByUser = () => {
        const groupedData = {};

        chartLateDatas?.forEach(({ date, user_name, user_code, late_count }) => {
            const key = `${user_name} (${user_code})`; // 같은 이름 구분하기 위해 user_code 추가
            if (!groupedData[key]) {
                groupedData[key] = [];
            }
            groupedData[key].push({
                date,
                late_count: late_count
            });

        });

        return groupedData;
    };

    const getChartData = () => {
        const users = groupDataByUser();
        const allDates = [...new Set(chartLateDatas?.map(d => d.date))].sort();

        return allDates.map(date => {
            const entry = { date: date };
            Object.keys(users).forEach(user => {
                const userEntry = users[user].find(d => d.date === date);
                entry[user] = userEntry ? userEntry.late_count : null;
            });
            return entry;
        });
    };

    return (
        <div>
            <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">지각</h1>
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
                setStartYear={setStartYear}
                setEndYear={setEndYear}
                setStartMonth={setStartMonth}
                setEndMonth={setEndMonth}
            />
            <div className="p-6 bg-white shadow-lg rounded-lg">
                <h2 className="text-xl font-semibold mb-4">지각 통계</h2>
                {renderCustomLegend()} {/* 체크박스 형태의 사용자 선택 추가 */}
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={getChartData()}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis label={{ value: "횟수 (회)", angle: -90, position: "insideLeft" }} />
                        <Tooltip content={<CustomTooltip />} /> {/* ✅ 툴팁 적용 */}
                        {renderLines()}
                        <Legend
                            verticalAlign="bottom"
                            align="center"
                            onClick={(e) => toggleUser(e.value)} // Legend 클릭 시 사용자 토글
                            wrapperStyle={{ cursor: "pointer" }}
                        />
                    </LineChart>
                </ResponsiveContainer>

            </div>
        </div>
    );
};

export default ChartLate;
