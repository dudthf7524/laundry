import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="wrap">
      <Outlet /> {/* 자식 라우트가 렌더링되는 위치 */}
    </div>
  );
};

export default AuthLayout;