import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { TIME_REGISTER_REQUEST } from "../reducers/time";

const TimeManagement = () => {

    //정의
    const dispatch = useDispatch();
    const location = useLocation();
    const { user_code } = location.state || {};
    const [formData, setFormData] = useState({
        user_code : '',
        start_time: '',
        end_time: '',
        rest_start_time: '',
        rest_end_time: '',
    });
    const times = Array.from({ length: 24 }, (_, i) =>
        `${String(i).padStart(2, "0")}:00`
    );
    //정의

    //함수
    const selectChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const timeRegister = () => {
        console.log(formData)
        console.log(user_code)
        formData.user_code = user_code;
    
        dispatch({
            type: TIME_REGISTER_REQUEST,
            data: formData,
        });
    }
    //함수

    return (
        <div className="work_management">
            <div className='content'>
                <div className='option'>
                    출근시간
                    <select name="start_time" value={formData.start_time} onChange={selectChange}>
                        {
                            times.map((time, index) => {
                                return (
                                    <option key={index}>{time}</option>
                                )

                            })
                        }
                    </select>
                </div>
                <div className='option'>
                    퇴근시간
                    <select name="end_time" value={formData.end_time} onChange={selectChange}>
                        {
                            times.map((time, index) => {
                                return (
                                    <option key={index}>{time}</option>
                                )

                            })
                        }
                    </select>
                </div>
                <div className='option'>
                    휴식시간
                    <select name="rest_start_time" value={formData.rest_start_time} onChange={selectChange}>
                        {
                            times.map((time, index) => {
                                return (
                                    <option key={index}>{time}</option>
                                )

                            })
                        }
                    </select>
                    ~
                    <select name="rest_end_time" value={formData.rest_end_time} onChange={selectChange}>
                        {
                            times.map((time, index) => {
                                return (
                                    <option key={index}>{time}</option>
                                )

                            })
                        }
                    </select>
                </div>
            </div>
            <button onClick={() => timeRegister()}>출/퇴근 시간등록</button>
        </div>
    )
}
export default TimeManagement;