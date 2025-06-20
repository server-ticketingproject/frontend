import { SPACING } from "../../styles/spacing";
import { HStack } from "../HStack";
import Logo from "../Logo";
import ProfileCircle from "../ProfileCircle";
import COLORS from "../../styles/colors";
import Button from "../Button";
import { useNavigate } from "react-router-dom";

export default function Header() {
    const role = localStorage.getItem('signup_role');
    const navigate = useNavigate(); // ✅ 여기서 한 번만 호출

    return (
        <HStack
            align="center" 
            justify="space-between"
            style={{
                width: "100%",
                padding: `${SPACING.tiny}px ${SPACING.medium}px`,     
                borderBottom: `1px solid ${COLORS.border}`,    
            }}
        >
            <Logo />
            <HStack align="center" gap={SPACING.small}>
                {role !== "user" && (
                    <Button
                        text="채팅하기"
                        fontSize={14}
                        paddingVertical={8}
                        paddingHorizontal={16}
                        onClick={() => {
                            navigate("/chat"); // ✅ 훅에서 받은 navigate 사용
                        }}
                    />
                )}
                <ProfileCircle />
            </HStack>
        </HStack>
    );
}