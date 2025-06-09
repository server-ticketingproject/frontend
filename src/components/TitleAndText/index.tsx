import COLORS from "../../styles/colors";
import { HStack } from "../HStack";

interface TitleAndTextProps {
    title : string;
    titleSize : number;
    titleColor ?: string;
    text : string;
    textSize : number;
    textColor ?: string;
    gap : number;
    width ?: string;
    icon? : React.ReactNode;
    style ?: any;
}

export default function TitleAndText({
    title,
    titleSize,
    titleColor,
    text,
    textSize,
    textColor,
    gap,
    icon,
    width,
    style,
}: TitleAndTextProps) {
    return (
        <HStack gap={gap} align="center" justify="flex-start" style={{ width: width, ...style }}>
            <p style={{ fontSize: titleSize , fontWeight: 500, color : titleColor ? titleColor : COLORS.textPrimary}}>{title}</p>
            <p style={{ fontSize: textSize , fontWeight: 200, color: textColor ? textColor : COLORS.textSecond}}>{text}</p>
            {icon}
        </HStack>
    );
}