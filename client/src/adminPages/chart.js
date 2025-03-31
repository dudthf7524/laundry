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
import FilterControls from "../components copy/FilterControls";
import FilterChart from "../components copy/filterChart";
import { CHART_DATE_REQUEST } from "../reducers/chart";



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
    const [month, setMonth] = useState(null);
    const [year, setYear] = useState(null);
    const [user, setUser] = useState(null);


    // const groupDataByUser = () => {
    //     const groupedData = {};
    //     dataByYear.forEach(({ attendance_start_date, sum_hour, user_name }) => {
    //         if (!groupedData[user_name]) {
    //             groupedData[user_name] = [];
    //         }
    //         groupedData[user_name].push({ attendance_start_date, sum_hour });
    //     });

    //     return groupedData;
    // };

    const renderLines = () => {
        const userColors = ["#8884d8", "#82ca9d", "#ff7300", "#ff0000"]; // 사용자별 색상 지정
        const groupedData = groupDataByUser();
        return Object.keys(groupedData).map((user, index) => (
            <Line key={user} type="monotone" dataKey={user} stroke={userColors[index % userColors.length]} strokeWidth={2} />
        ));
    };
    
    // X축 데이터를 날짜순 정렬
    // const getChartData = () => {
    //     const users = groupDataByUser();
    //     const allDates = [...new Set(dataByYear.map(d => d.attendance_start_date))].sort();
        
    //     return allDates.map(date => {
    //         const entry = { attendance_start_date: date };
    //         Object.keys(users).forEach(user => {
    //             const userEntry = users[user].find(d => d.attendance_start_date === date);
    //             entry[user] = userEntry ? userEntry.sum_hour : null; // 데이터가 없는 경우 null 처리
    //         });
    //         return entry;
    //     });
    // };



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
        if (filterType === "date" && startDate && endDate && user) {
            console.log("선택한 시작일", startDate)
            console.log("선택한 시작일", endDate)
            chartDate();
        } else if (filterType === "month" && year && month) {
            console.log("선택한 시작일", year)
            console.log("선택한 시작일", month)
            // vacationMonth();
        } else if (filterType === "year" && year) {
            console.log("선택한 시작일", year)
            // vacationYear();
        }
    }, [year, month, startDate, endDate,]);

    const [selectedUsers, setSelectedUsers] = useState([true, true, false, false, false, false]);

    // const renderLines = () => {
    //     const users = ["sum_hour", "user2", "user3", "user4", "user5", "user6", "user7"];
    //     return users.map((user, index) => {
    //         if (selectedUsers[index]) {
    //             const color = ["#8884d8", "#82ca9d", "#ffc658", "#d62728", "#2ca02c", "#ff7f0e"][index];
    //             return <Line key={user} type="monotone" dataKey={user} stroke={color} strokeWidth={2} name={`사용자 ${index + 1}`} />;
    //         }
    //         return null;
    //     });
    // };

    // const getChartData = () => {
    //     switch (selectedData) {
    //         case "month":
    //             return dataByMonth;
    //         case "day":
    //             return dataByDay;
    //         default:
    //             return dataByYear;
    //     }
    // };


    // const getChartData = () => {
    //     return dataByYear
    //         .map(item => ({
    //             ...item,
    //             attendance_start_date: new Date(item.attendance_start_date).toISOString().split("T")[0], // YYYY-MM-DD 형식
    //         }))
    //         .sort((a, b) => new Date(a.attendance_start_date) - new Date(b.attendance_start_date)); // 날짜순 정렬
    // };

    // // 선을 동적으로 생성하는 함수
    // const renderLines = () => (
    //     <Line type="monotone" dataKey="sum_hour" stroke="#8884d8" strokeWidth={2} />
    // );
    
    const [hiddenUsers, setHiddenUsers] = useState([]); // 숨겨진 사용자 목록

    const toggleUser = (userName) => {
        setHiddenUsers((prev) =>
            prev.includes(userName) ? prev.filter((u) => u !== userName) : [...prev, userName]
        );
    };




    const groupDataByUser = () => {
        const groupedData = {};
        dataByYear.forEach(({ attendance_start_date, sum_hour, user_name }) => {
            if (!groupedData[user_name]) {
                groupedData[user_name] = [];
            }
            groupedData[user_name].push({ attendance_start_date, sum_hour });
        });
    
        return groupedData;
    };
    
    // X축 데이터를 날짜순 정렬
    const getChartData = () => {
        const users = groupDataByUser();
        const allDates = [...new Set(dataByYear.map(d => d.attendance_start_date))].sort();
        
        return allDates.map(date => {
            const entry = { attendance_start_date: date };
            Object.keys(users).forEach(user => {
                const userEntry = users[user].find(d => d.attendance_start_date === date);
                entry[user] = userEntry ? userEntry.sum_hour : null; // 데이터가 없는 경우 null 처리
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
                        <XAxis dataKey="attendance_start_date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />

                        {renderLines()}
                    </LineChart>
                </ResponsiveContainer>

                <ResponsiveContainer width="100%" height={300}>
            <LineChart data={getChartData()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="attendance_start_date" />
                <YAxis />
                <Tooltip />
                <Legend
                    onClick={(e) => toggleUser(e.value)} // 클릭하면 사용자 숨김/보임 토글
                />
                {renderLines()}
            </LineChart>
        </ResponsiveContainer>
            </div>
        </div>
    );
};

export default Chart;
