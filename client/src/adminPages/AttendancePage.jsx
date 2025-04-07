import { useEffect, useState } from 'react';
import FilterControls from '../adminComponents/FilterControls';
import AttendanceTable from '../adminComponents/AttendanceTable';
import { useDispatch } from 'react-redux';
import { ATTENDANCESTART_DATE_REQUEST, ATTENDANCESTART_MONTH_REQUEST, ATTENDANCESTART_UPDATE_REQUEST, ATTENDANCESTART_YEAR_REQUEST } from '../reducers/attendanceStart';
import { format } from 'date-fns';

const AttendancePage = () => {
  const today = format(new Date(), 'yyyy-MM-dd');
  const [filterType, setFilterType] = useState('date');
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);
  const [month, setMonth] = useState(null);
  const [year, setYear] = useState(null);
  const [selected, setSelected] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState({});
  const [sortedData, setSortedData] = useState({});

  const hours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'));
  const minutes = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));

  const handleTimeChange = (field, value, type) => {
    const [hour, minute] = (editData[field] || "00:00").split(":");
    const newTime = type === 'hour' ? `${value}:${minute}` : `${hour}:${value}`;

    setEditData((prev) => ({
      ...prev,
      [field]: newTime,
    }));
  };

  const vacationDate = async () => {
    const data = {
      startDate: startDate,
      endDate: endDate,
    }
    dispatch({
      type: ATTENDANCESTART_DATE_REQUEST,
      data: data,
    });
  };

  const vacationMonth = async () => {
    const data = {
      year: year,
      month: month,
    }
    dispatch({
      type: ATTENDANCESTART_MONTH_REQUEST,
      data: data,
    });
  };

  const vacationYear = async () => {
    const data = {
      year: year
    }
    dispatch({
      type: ATTENDANCESTART_YEAR_REQUEST,
      data: data,
    });
  };

  const dispatch = useDispatch();

  useEffect(() => {
    if (filterType === "date" && startDate && endDate) {
      vacationDate();
    } else if (filterType === "month" && year && month) {
      vacationMonth();
    } else if (filterType === "year" && year) {
      vacationYear();
    }
  }, [year, month, startDate, endDate]);


  const handleEditClick = () => {
    if (selected) {
      setEditData({ ...selected });
      setIsModalOpen(true);
    } else {
      alert("수정할 항목을 선택해주세요.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    dispatch({
      type: ATTENDANCESTART_UPDATE_REQUEST,
      data: editData,
    });

    setIsModalOpen(false);


  };

  const attendanceStartYearSum = sortedData ? sortedData.length : 0;
  const countNullEnd = Array.isArray(sortedData)
    ? sortedData.filter(asy => asy.attendance_end === null).length
    : 0;
  const countLate = Array.isArray(sortedData)
    ? sortedData.filter(asy => asy.attendance_start_state === "지각").length
    : 0;

  return (
    <div>
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">근태</h1>
          <p className="text-gray-600 mt-1">
            직원들의 근태 기록을 조회하고 관리합니다
          </p>
        </div>
      </div>

      <FilterControls
        setFilterType={setFilterType}
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        setMonth={setMonth}
        setYear={setYear}
        handleEditClick={handleEditClick}
      />

      <div className="mb-6">
        <AttendanceTable
          setSelected={setSelected}
          selected={selected}
          setSortedData={setSortedData}

        />
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-4/5 p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">근태 정보 수정</h2>

            <label>이름</label>
            <input type="text" readOnly name="attendance_start_date" value={editData.user_name} onChange={handleInputChange} className="border p-2 w-full mb-2" />

            <label>직무형태</label>
            <input type="textg" readOnly name="attendance_start_date" value={editData.user_position} onChange={handleInputChange} className="border p-2 w-full mb-2" />

            <label>출근날짜</label>
            <input type="date" name="attendance_start_date" value={editData.attendance_start_date} onChange={handleInputChange} className="border p-2 w-full mb-2" />

            {/* <label>출근시간</label>
            <input type="text" name="attendance_start_time" value={editData.attendance_start_time} onChange={handleInputChange} className="border p-2 w-full mb-2" /> */}
            <label>출근시간</label>
            <div className="flex gap-2 mb-2">
              <select
                value={editData.attendance_start_time?.split(":")[0] || "00"}
                onChange={(e) => handleTimeChange("attendance_start_time", e.target.value, "hour")}
                className="w-full border p-2"
              >
                {hours.map((h) => (
                  <option key={h} value={h}>{h}</option>
                ))}
              </select>
              :
              <select
                value={editData.attendance_start_time?.split(":")[1] || "00"}
                onChange={(e) => handleTimeChange("attendance_start_time", e.target.value, "minute")}
                className="w-full border p-2"
              >
                {minutes.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            <label>출근상태</label>
            <input type="text" name="attendance_start_state" value={editData.attendance_start_state} onChange={handleInputChange} className="border p-2 w-full mb-2" />

            <label>퇴근날짜</label>
            <input type="date" name="attendance_end_date" value={editData.attendance_end_date || ""} onChange={handleInputChange} className="border p-2 w-full mb-2" />

            {/* <label>퇴근시간</label>
            <input type="text" name="attendance_end_time" value={editData.attendance_end_time || ""} onChange={handleInputChange} className="border p-2 w-full mb-2" /> */}

            <label>퇴근시간</label>
            <div className="flex gap-2 mb-2">
              <select
                value={editData.attendance_end_time?.split(":")[0] || "00"}
                onChange={(e) => handleTimeChange("attendance_end_time", e.target.value, "hour")}
                className="w-full border p-2"
              >
                {hours.map((h) => (
                  <option key={h} value={h}>{h}</option>
                ))}
              </select>
              :
              <select
                value={editData.attendance_end_time?.split(":")[1] || "00"}
                onChange={(e) => handleTimeChange("attendance_end_time", e.target.value, "minute")}
                className="w-full border p-2"
              >
                {minutes.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            <button onClick={() => handleSave()} className="w-full bg-blue-500 text-white px-4 py-2 rounded text-center">
              저장
            </button>
            <button onClick={() => setIsModalOpen(false)} className="w-full bg-gray-300 text-black px-4 py-2 rounded text-center mt-2">
              취소
            </button>
          </div>
        </div>
      )}

      <div className="bg-white p-4 rounded-lg shadow mb-4">
        <h3 className="text-lg font-medium text-gray-900 mb-3">근태 요약</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded">
            <div className="text-sm font-medium text-blue-500">총 근태 기록</div>
            <div className="mt-1 text-2xl font-semibold">{attendanceStartYearSum}건</div>
          </div>
          <div className="bg-green-50 p-4 rounded">
            <div className="text-sm font-medium text-green-500">정상 출근</div>
            <div className="mt-1 text-2xl font-semibold">
              {attendanceStartYearSum - countNullEnd}건
            </div>
          </div>
          <div className="bg-yellow-50 p-4 rounded">
            <div className="text-sm font-medium text-yellow-500">근무중</div>
            <div className="mt-1 text-2xl font-semibold">
              {countNullEnd}건
            </div>
          </div>
          <div className="bg-red-50 p-4 rounded">
            <div className="text-sm font-medium text-red-500">지각</div>
            <div className="mt-1 text-2xl font-semibold">
              {countLate}건
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendancePage;
