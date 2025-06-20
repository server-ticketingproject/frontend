import COLORS from "../../styles/colors";
import { useNavigate } from "react-router-dom";

export default function ProfileCircle() {
    const navigate = useNavigate();
    const accessToken = localStorage.getItem('access_token');
    const role = localStorage.getItem('signup_role'); // 회원가입/로그인 시 저장된 role

    const handleClick = () => {
        if (accessToken) {
            if (role === "performer") {
                navigate('/band-profile');
            } else if (role === "user") {
                navigate('/member-profile');
            } else if (role === "stage_manager") {
                navigate('/stage-manager');
            }
        } else {
            navigate('/login');
        }
    };

    return (
        <div
            style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                backgroundColor: COLORS.textFifth,
                cursor: "pointer",
            }}
            onClick={handleClick}
        />
    );
}