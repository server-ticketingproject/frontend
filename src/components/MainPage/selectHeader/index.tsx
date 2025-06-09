import { SPACING } from "../../../styles/spacing";
import { HStack } from "../../HStack";
import COLORS from "../../../styles/colors";
import { FONTS } from "../../../styles/fonts";

export default function SelectHeader() {
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
            <p>공연</p>
            <p>공연장</p>
        </HStack>
    );  
}