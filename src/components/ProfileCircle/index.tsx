import { useEffect } from "react";
import COLORS from "../../styles/colors";
import { useNavigate } from "react-router-dom";

export default function ProfileCircle() {
    const navigate = useNavigate();
    const accessToken = localStorage.getItem('access-token');

    useEffect(() => {
        if (accessToken) {
            navigate('/profile');
        }
    }, [accessToken]);
    return (
        <div
            onClick={() => {navigate('/login')}}
            style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                backgroundColor: COLORS.textFifth,
            }}
        />
    );
}