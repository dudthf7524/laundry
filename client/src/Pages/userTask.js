import React, { useState } from 'react';

const MyPage = () => {
    const [userInfo, setUserInfo] = useState({
        username: '사용자 이름',
        email: 'user@example.com',
    });
    const [form, setForm] = useState({
        newUsername: '',
        currentPassword: '',
        newPassword: '',
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // 여기서 아이디/비번 변경 로직 추가
        console.log('아이디 및 비밀번호 변경:', form);
    };

    return (
        <div className="flex flex-col items-center w-full h-screen p-[2vw] box-border overflow-y-auto">
            <h2 className="text-lg font-medium text-gray-900 mb-4">마이 페이지</h2>
            <div className="p-4 border rounded-lg bg-gray-50 w-full max-w-md">
                <h3 className="text-md font-semibold mb-2">사용자 정보</h3>
                <p><span className="font-medium">이름:</span> {userInfo.username}</p>
                <p><span className="font-medium">이메일:</span> {userInfo.email}</p>
            </div>

            <form onSubmit={handleSubmit} className="mt-4 w-full max-w-md p-4 border rounded-lg bg-gray-50">
                <h3 className="text-md font-semibold mb-2">아이디 및 비밀번호 변경</h3>
                <label className="block mb-2">
                    <span className="font-medium">새 아이디</span>
                    <input 
                        type="text" 
                        name="newUsername" 
                        value={form.newUsername} 
                        onChange={handleChange} 
                        className="w-full mt-1 p-2 border rounded-lg"
                        placeholder="새 아이디 입력"
                    />
                </label>
                <label className="block mb-2">
                    <span className="font-medium">현재 비밀번호</span>
                    <input 
                        type="password" 
                        name="currentPassword" 
                        value={form.currentPassword} 
                        onChange={handleChange} 
                        className="w-full mt-1 p-2 border rounded-lg"
                        placeholder="현재 비밀번호 입력"
                    />
                </label>
                <label className="block mb-2">
                    <span className="font-medium">새 비밀번호</span>
                    <input 
                        type="password" 
                        name="newPassword" 
                        value={form.newPassword} 
                        onChange={handleChange} 
                        className="w-full mt-1 p-2 border rounded-lg"
                        placeholder="새 비밀번호 입력"
                    />
                </label>
                <button 
                    type="submit" 
                    className="w-full mt-4 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                    변경하기
                </button>
            </form>
        </div>
    );
};

export default MyPage;
