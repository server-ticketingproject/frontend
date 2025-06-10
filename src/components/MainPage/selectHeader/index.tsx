import { SPACING } from "../../../styles/spacing";
import { HStack } from "../../HStack";
import COLORS from "../../../styles/colors";
import { FONTS } from "../../../styles/fonts";
import { useLocation } from "react-router-dom";

export default function SelectHeader() {
    const path = useLocation().pathname;

    return (
        <HStack
            align="flex-start"
            justify="center"
            gap={SPACING.medium}
            style={{
                width : "100%",
                height : "65px",
                padding : `${SPACING.tiny}px`,
                borderBottom : `1px solid ${COLORS.border}`,
                fontSize : FONTS.size.huge,
                color : COLORS.textPrimary,
            }}
        >
            <p
                style={{
                    fontWeight : path === "/" ? FONTS.weight.w7 : FONTS.weight.w1,
                }}
            >공연</p>
            <p
            >공연장</p>
        </HStack>
    );  
}