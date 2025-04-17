import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NOTICE_LIST_REQUEST, NOTICE_UPDATE_REQUEST } from '../reducers/notice';
import { useNavigate } from 'react-router-dom';

const Notice = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useSelector((state) => state.user);

    useEffect(() => {
        if (user?.auth_code === 'A4') {
            alert('관리자가 아닙니다.');
            navigate(-1); // 이전 페이지로 이동
            return null; // 컴포넌트 렌더링 중단
        }
    }, [user]);

    const { noticeLists } = useSelector((state) => state.notice);

    const [update, setUpdate] = useState({
        notice_id: '',
        notice_title: '',
        notice_content: '',
    });

    useEffect(() => {
        dispatch({ type: NOTICE_LIST_REQUEST });
    }, [dispatch]);

    useEffect(() => {
        if (noticeLists) {
            setUpdate({
                notice_id: noticeLists.notice_id || '',
                notice_title: noticeLists.notice_title || '',
                notice_content: noticeLists.notice_content || '',
            });
        }
    }, [noticeLists]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdate((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        dispatch({
            type: NOTICE_UPDATE_REQUEST,
            data: update
        })
    };

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">공지사항</h1>
                <p className="text-gray-600 mt-1">
                    공지사항 조회 및 수정
                </p>
            </div>

            {
                user?.auth_code === "A1" ? (
                    <form onSubmit={handleUpdate} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">제목</label>
                            <input
                                type="text"
                                name="notice_title"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                                value={update.notice_title}
                                onChange={handleChange}
                                placeholder="공지사항 제목을 입력하세요"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">내용</label>
                            <textarea
                                name="notice_content"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                                rows="6"
                                value={update.notice_content}
                                onChange={handleChange}
                                placeholder="공지사항 내용을 입력하세요"
                            ></textarea>
                        </div>
                        <div className="mt-6 flex justify-end">
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700 w-full"
                            >
                                수정
                            </button>
                        </div>
                    </form>
                ) : (
                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">제목</label>
                            <input
                                type="text"
                                name="notice_title"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                                value={update.notice_title}
                                readOnly
                                onChange={handleChange}
                                placeholder="공지사항 제목을 입력하세요"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">내용</label>
                            <textarea
                                name="notice_content"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                                rows="6"
                                value={update.notice_content}
                                readOnly
                                onChange={handleChange}
                                placeholder="공지사항 내용을 입력하세요"
                            ></textarea>
                        </div>
                    </form>
                )
            }
        </div>
    );
};

export default Notice;
