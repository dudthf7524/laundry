import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { TIME_REGISTER_REQUEST } from "../reducers/time";
import '../adminCSS/timeManagement.css';

const TimeManagement = () => {

    //정의
    const dispatch = useDispatch();
    const location = useLocation();
    const { user_code } = location.state || {};
    const [formData, setFormData] = useState({
        start_hour: '00',
        start_minute: '00',
        end_hour: '00',
        end_minute: '00',
        rest_start_hour: '00',
        rest_start_minute: '00',
        rest_end_hour: '00',
        rest_end_minute: '00',

    });
    const hours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0"));
    const minutes = ["00", "30"];

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
      
    
        const work_start_time = formData.start_hour + ":" + formData.start_minute
        const work_end_time = formData.end_hour + ":" + formData.end_minute
        const rest_start_time = formData.rest_start_hour + ":" + formData.rest_start_minute
        const rest_end_time = formData.rest_end_hour + ":" + formData.rest_end_minute

        const data = {
            user_code : user_code,
            start_time: work_start_time,
            end_time: work_end_time,
            rest_start_time: rest_start_time,
            rest_end_time: rest_end_time,
        }

        console.log(data)

        dispatch({
            type: TIME_REGISTER_REQUEST,
            data: data,
        });
    }
    //함수

    return (
        <div className="time_management">
            <div className='content'>
                <div className='option'>
                    출근시간 &nbsp;
                    <select name="start_hour" value={formData.start_hour} onChange={selectChange}>
                        {
                            hours.map((hour, index) => {
                                return (
                                    <option key={index}>{hour}</option>
                                )

                            })
                        }
                    </select>&nbsp;시&nbsp;:&nbsp;

                    <select name="start_minute" value={formData.start_minute} onChange={selectChange}>
                        {
                            minutes.map((minute, index) => {
                                return (
                                    <option key={index}>{minute}</option>
                                )

                            })
                        }
                    </select>&nbsp;
                    분
                </div>
                <div className='option'>
                    퇴근시간 &nbsp;
                    <select name="end_hour" value={formData.end_hour} onChange={selectChange}>
                        {
                            hours.map((hour, index) => {
                                return (
                                    <option key={index}>{hour}</option>
                                )

                            })
                        }
                    </select>&nbsp;시&nbsp;:&nbsp;

                    <select name="end_minute" value={formData.end_minute} onChange={selectChange}>
                        {
                            minutes.map((minute, index) => {
                                return (
                                    <option key={index}>{minute}</option>
                                )

                            })
                        }
                    </select>&nbsp;
                    분
                </div>
                <div className='option'>
                    휴식시간 &nbsp;
                    <select name="rest_start_hour" value={formData.rest_start_hour} onChange={selectChange}>
                        {
                            hours.map((hour, index) => {
                                return (
                                    <option key={index}>{hour}</option>
                                )

                            })
                        }
                    </select>&nbsp;시&nbsp;:&nbsp;

                    <select name="rest_start_minute" value={formData.rest_start_minute} onChange={selectChange}>
                        {
                            minutes.map((minute, index) => {
                                return (
                                    <option key={index}>{minute}</option>
                                )

                            })
                        }
                    </select>&nbsp;
                    분
                    ~
                    <select name="rest_end_hour" value={formData.rest_end_hour} onChange={selectChange}>
                        {
                            hours.map((hour, index) => {
                                return (
                                    <option key={index}>{hour}</option>
                                )

                            })
                        }
                    </select>&nbsp;시&nbsp;:&nbsp;

                    <select name="rest_end_minute" value={formData.rest_end_minute} onChange={selectChange}>
                        {
                            minutes.map((minute, index) => {
                                return (
                                    <option key={index}>{minute}</option>
                                )

                            })
                        }
                    </select>&nbsp;
                    분
                </div>
            </div>
            <button onClick={() => timeRegister()}>출/퇴근 시간등록</button>
        </div>
    )
}
export default TimeManagement;