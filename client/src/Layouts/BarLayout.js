import React from "react";
import { Outlet } from "react-router-dom";
import BottomBar from "../Components/BottomBar";

const BarLayout = () => {
  return (
    <div className="wrap">
      <BottomBar />
      <Outlet /> {/* 자식 라우트가 렌더링되는 위치 */}
    </div>
  );
};

export default BarLayout;