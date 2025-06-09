import COLORS from "../../styles/colors";
import { HStack } from "../HStack";

interface TitleAndTextProps {
    title : string;
    titleSize : number;
    text : string;
    textSize : number;
    gap : number;
    width ?: string;
    icon? : React.ReactNode;
}

export default function TitleAndText({
    title,
    titleSize,
    text,
    textSize,
    gap,
    icon,
    width,
}: TitleAndTextProps) {
    return (
        <HStack gap={gap} align="center" justify="flex-start" style={{ width: width }}>
            <p style={{ fontSize: titleSize , fontWeight: 500, color : COLORS.textPrimary}}>{title}</p>
            <p style={{ fontSize: textSize , fontWeight: 200, color: COLORS.textSecond}}>{text}</p>
            {icon}
        </HStack>
    );
}