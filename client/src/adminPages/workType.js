import { useEffect, useState } from "react";
import { WORKTYPE_REGISTER_REQUEST } from "../reducers/workType";
import { WORKTYPE_LIST_REQUEST } from "../reducers/workType";
import { useDispatch, useSelector } from "react-redux";

const WorkType = () => {

    const [FormData, setFormData] = useState({
        work_type_name: '',
    });

    const inputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...FormData,
            [name]: value
        });
    };

    const dispatch = useDispatch();

    const register = (e) => {
        e.preventDefault();
        dispatch({
            type: WORKTYPE_REGISTER_REQUEST,
            data: FormData,
        });
    }
    useEffect(() => {
        list();
    }, []);


    const list = () => {
        dispatch({
            type: WORKTYPE_LIST_REQUEST,
        });
    }

    const { workTypeLists } = useSelector((state) => state.workType);
  
    return (
        <div className="work_type">
            <div>근무유형을 입력해주세요</div>
            <form onSubmit={register}>
                <input type="text" name="work_type_name" onChange={inputChange}></input>
                <button>등록</button>
            </form>
            <div>근무유형</div>
            <div>
                {
                    workTypeLists?.map((workTypeList, index) => {
                        return (
                            <div key={index}>{workTypeList.work_type_name}</div>
                        )
                    })
                }
            </div>
        </div>
    )


}
export default WorkType;