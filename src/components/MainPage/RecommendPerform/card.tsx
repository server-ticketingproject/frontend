import { VStack } from "../../VStack";
import { SPACING } from "../../../styles/spacing";
import testBandImage from "../../../assets/testBandImage.jpeg";
import { FONTS } from "../../../styles/fonts";
import COLORS from "../../../styles/colors";
interface RecommendPerformCardProps {
    title : string;
    slogan : string;
    when : string;
}

export default function RecommendPerformCard({
    title,
    when,
    slogan,
}: RecommendPerformCardProps) {
    return (
        <VStack
            align="flex-start"
            justify="flex-start"
            gap={SPACING.superTiny}
            style={{
                width : 200,
                height : 320,
            }}
        >
            <VStack
                align="flex-start"
                justify="flex-start"
                style={{
                    width : 200,
                    height : 250,
                    backgroundImage : `url(${testBandImage})`,
                    backgroundSize : "cover",
                    backgroundPosition : "center",
                    borderRadius : SPACING.small,
                    padding : SPACING.small,
                    position : "relative",
                }}
            >
                <p
                    style={{
                        fontSize : FONTS.size.title,
                        fontWeight : FONTS.weight.w5,
                        color : COLORS.textInvert,
                        zIndex : 1,
                    }}
                >{slogan}</p>
                <div
                    style={{
                        position : "absolute",
                        top : 0,
                        left : 0,
                        width : "100%",
                        height : "100%",
                        backgroundColor : "rgba(0, 0, 0, 0.5)",
                        zIndex : 0,
                        borderRadius : SPACING.small,
                    }}
                />
            </VStack>
           <p
            style={{
                fontSize : FONTS.size.title,
                fontWeight : FONTS.weight.w5,
                color : COLORS.textPrimary,
            }}
           >{title}</p>
           <p
            style={{
                fontSize : FONTS.size.body,
                fontWeight : FONTS.weight.w1,
                color : COLORS.textForth,
            }}
           >{when}</p>
        </VStack>
    );
}