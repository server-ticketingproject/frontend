import { SPACING } from "../../styles/spacing";
import { HStack } from "../HStack";
import Logo from "../Logo";
import ProfileCircle from "../ProfileCircle";
import COLORS from "../../styles/colors";

export default function Header() {
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
            <ProfileCircle />
        </HStack>
    );
}