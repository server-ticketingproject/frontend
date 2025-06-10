import { HStack } from "../HStack";
import { SPACING } from "../../styles/spacing";
import { FONTS } from "../../styles/fonts";
import COLORS from "../../styles/colors";

interface PageTitleProps {
    title : string;
}

export default function PageTitle({ title } : PageTitleProps) {
    return (
        <HStack
            align="center"
            justify="flex-start"
            style={{
                width : "100%",
                padding : SPACING.medium,
            }}
        >
            <p
                style={{
                    fontSize : 30,
                    fontWeight : FONTS.weight.w7,
                    color : COLORS.textPrimary,
                }}
            >
                {title}
            </p>
        </HStack>
    );
}