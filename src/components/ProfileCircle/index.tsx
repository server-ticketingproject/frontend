import { useEffect } from "react";
import COLORS from "../../styles/colors";
import { useNavigate } from "react-router-dom";

export default function ProfileCircle() {
    const navigate = useNavigate();
    const accessToken = localStorage.getItem('access-token');

    const handleClick = () => {
        if (accessToken) {
            navigate('/member-profile');
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