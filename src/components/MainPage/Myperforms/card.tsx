import { VStack } from "../../VStack";
import testBandImage from "../../../assets/testBandImage.jpeg";
import { SPACING } from "../../../styles/spacing";
import { FONTS } from "../../../styles/fonts";
import COLORS from "../../../styles/colors";
import TitleAndText from "../../TitleAndText";
import { IoMdMap } from "react-icons/io";
interface MyperformsCardProps {
    title : string;
    when : string;
    where : string;
}
export default function MyperformsCard({
    title,
    when,
    where,
}: MyperformsCardProps) {
    return (
        <VStack
            align="flex-start"
            justify="flex-start"
            gap={SPACING.tiny}
            style={{
                width : '100%',
                height : 100,
                padding : SPACING.tiny,
                backgroundImage : `url(${testBandImage})`,
                backgroundSize : "cover",
                backgroundPosition : "center",
                borderRadius : SPACING.tiny,
                position : "relative",
            }}
        >
            <p
                style={{
                    fontSize : FONTS.size.body,
                    fontWeight : FONTS.weight.w5,
                    color : COLORS.textInvert,
                    zIndex : 1,
                }}
            >{title}</p>
            <TitleAndText
                title="일시"
                titleSize={FONTS.size.small}
                text={when}
                textSize={FONTS.size.small}
                titleColor={COLORS.textFifth}
                textColor={COLORS.textFifth}
                gap={SPACING.superTiny}
                style={{
                    zIndex : 1,
                }}
            />
            <TitleAndText
                title="장소"
                titleSize={FONTS.size.small}
                text={where}
                textSize={FONTS.size.small}
                titleColor={COLORS.textFifth}
                textColor={COLORS.textFifth}
                gap={SPACING.superTiny}
                style={{
                    zIndex : 1,
                }}
                icon={<IoMdMap size={12} color={COLORS.textInvert}/>}
            />
            <div
                style={{
                    position : "absolute",
                    top : 0,
                    left : 0,
                    width : "100%",
                    height : "100%",
                    backgroundColor : "rgba(0, 0, 0, 0.5)",
                    zIndex : 0,
                    borderRadius : SPACING.tiny,
                }}
            />
        </VStack>
    );
}