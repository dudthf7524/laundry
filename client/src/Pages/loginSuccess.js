import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const LoginSuccess = () => {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.user);

    if (user?.auth_code === "A1") {
        navigate('/admin/dashboard');
    } else if (user?.auth_code === "A2") {
        navigate('/admin/dashboard');
    } else if (user?.auth_code === "A3") {
        navigate('/admin/dashboard');
    } else if (user?.auth_code === "A4") {
        navigate('/attendance');
    }

    return (
        <div></div>
    )
}

export default LoginSuccess;