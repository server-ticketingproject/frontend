import { HStack } from "../../components/HStack";
import { useNavigate } from "react-router-dom";
import { MdArrowBackIos } from "react-icons/md";
import { SPACING } from "../../styles/spacing";

export default function ProfileHeader() {
    const navigate = useNavigate();
    return (
        <HStack
            align="center"
            justify="flex-start"
            style={{
                width : "100%",
                padding : `0 ${SPACING.medium}px`,
            }}
        >
            <MdArrowBackIos onClick={() => navigate(-1)} size={24} />
            <p>프로필</p>
        </HStack>
    )
}