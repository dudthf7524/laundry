import { useEffect, useState } from "react";
import { PROCESS_LIST_REQUEST, PROCESS_UPDATE_REQUEST } from "../reducers/process";
import { useDispatch, useSelector } from "react-redux";

const TaskSetting = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        processList();
    }, []);

    const { processLists } = useSelector((state) => state.process);
    const processList = () => {
        dispatch({
            type: PROCESS_LIST_REQUEST,
        });
    };

    const [process, setProcess] = useState({
        process_code: "",
        process_name: "",
        hour_average: ""
    });

    const handleSelectChange = (e) => {
        if (e.target.value) {
            const selectedProcess = JSON.parse(e.target.value);
            setProcess(selectedProcess);
        } else {
            setProcess({  process_code: "", process_name: "", hour_average: "" });
        }
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProcess({
            ...process,
            [name]: value
        });
    };

    const processUpdate  = () =>{
        if(!process.process_code){
            alert('업무를 선택해주세요')
            return;
        }

        const data = {
            process_code : process.process_code,
            process_name : process.process_name,
            hour_average : process.hour_average,
        }

        dispatch({
            type: PROCESS_UPDATE_REQUEST,
            data: data
        });
       
    }

    return (
        <div className="space-y-6">
            <div>
                <select
                    id="language"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    defaultValue=""
                    onChange={handleSelectChange}
                >
                    <option value="">업무 선택</option>
                    {processLists?.map((item, index) => (
                        <option value={JSON.stringify(item)} key={index}>
                            {item.process_name}
                        </option>
                    ))}
                </select>
            </div>

            {process.process_code && (
                <>
                    <div>
                        <label htmlFor="process-name" className="block text-sm font-medium text-gray-700 mb-1">
                            업무명
                        </label>
                        <input
                            type="text"
                            name="process_name"
                            value={process.process_name}
                            onChange={handleInputChange} 
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="hour-average" className="block text-sm font-medium text-gray-700 mb-1">
                            시간당 업무개수
                        </label>
                        <input
                            type="number"
                            name="hour_average"
                            value={process.hour_average}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-auto" 
                            />
                    </div>
                </>
            )}
            <div className="mt-8 flex justify-end">
            <button
              type="button"
              className="px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700"
              onClick={()=>processUpdate()}
            >
              설정 저장
            </button>
          </div>
        </div>
    );
};

export default TaskSetting;
