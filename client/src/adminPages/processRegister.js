import { useEffect, useState } from "react";
import { USER_PROCESS_REGISTER_REQUEST } from "../reducers/userProcess";
import { PROCESS_LIST_REQUEST } from "../reducers/process";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const ProcessRegister = () => {

    const [formData, setFormData] = useState({
        user_code: '',
        user_process_code: '',
        user_process_count: '',
    });
    const location = useLocation();
    const { user_code } = location.state || {};
    const { processLists } = useSelector((state) => state.process);

    if(processLists){
        console.log(processLists)
    }

    const inputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    useEffect(() => {
        processList();
    }, []);
    const dispatch = useDispatch();

    const processList = (e) => {
        dispatch({
            type: PROCESS_LIST_REQUEST,
        });
    }

    const processRegister = (e) => {
        e.preventDefault();
        if(formData.process_code === ''){
            alert('업무공정을 선택해주세요')
            return;
        }
        formData.user_code = user_code;
        dispatch({
            type: USER_PROCESS_REGISTER_REQUEST,
            data: formData,
        });
    }



    return (
        <div className="">
            <div>업무공정 등록</div>

            <select name="user_process_code" value={formData.user_process_code} onChange={inputChange}>
           
                {
                    processLists?.map((processList, index) => {
                        return (
                            <option key={index} value={processList.process_code}>{processList.process_name}</option>
                        )
                    })
                }
            </select>

            <div>
                <form onSubmit={processRegister}>
                    <p>수량</p>
                    <input type="text" name="user_process_count" value={formData.user_process_count} onChange={inputChange}></input>
                    <button>업무공정 등록</button>
                </form>
            </div>
            <div>

            </div>
        </div>
    )


}
export default ProcessRegister;