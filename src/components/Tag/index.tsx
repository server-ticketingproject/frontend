import { HStack } from "../HStack";
import { SPACING } from "../../styles/spacing";
import { FONTS } from "../../styles/fonts";
import COLORS from "../../styles/colors";

interface TagProps {
    text : string;
    size: "small" | "large";
    isSelected : boolean;
}

export default function Tag({ text, size, isSelected } : TagProps) {
    return (
        <HStack
            align="center"
            justify="center"
            style={{
                padding : size === "small" ? `${SPACING.superTiny}px ${SPACING.small}px` : `${SPACING.tiny}px ${SPACING.big}px`,
                borderRadius : SPACING.superTiny,
                backgroundColor : isSelected ? COLORS.brandPrimary : COLORS.textFifth,
                color : COLORS.textInvert,
                fontSize : size === "small" ? FONTS.size.small : FONTS.size.body,
            }}
        >
            #{text}
        </HStack>
    );
}