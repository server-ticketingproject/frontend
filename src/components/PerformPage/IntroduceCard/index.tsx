import { VStack } from "../../VStack";
import { FONTS } from "../../../styles/fonts";
import COLORS from "../../../styles/colors";
import { SPACING } from "../../../styles/spacing";
import { HStack } from "../../HStack";

interface PerformIntroduceCardProps {
    children : React.ReactNode;
    img : string;
    title : string;
    isBand : boolean;
}

export default function PerformIntroduceCard(props : PerformIntroduceCardProps) {

    const { children, title, isBand, img } = props;

    return (
        <VStack
            align="flex-start"
            justify="flex-start"
            gap={SPACING.small}
            style={{
                width : "50%",
                height : "100%",
            }}
        >
            <p
                style={{
                    fontSize : FONTS.size.head,
                    fontWeight : FONTS.weight.w7,
                    color : COLORS.textPrimary,
                }}
            >{ isBand ? '밴드 소개' : '공연 소개'}</p>
            <HStack
                align="flex-start"
                justify="flex-start"
                gap={SPACING.medium}
            >
                <img src={img} alt="" style={{width: 300,  // 고정 너비
    aspectRatio: '4/3',  // 비율 고정 (또는 height: 120 등)
    objectFit: 'cover',
    borderRadius: SPACING.tiny}} />
               <VStack
                    align="flex-start"
                    justify="flex-start"
                    gap={SPACING.tiny}
               >
                    <p
                        style={{
                            fontSize : FONTS.size.head,
                            fontWeight : FONTS.weight.w7,
                            color : COLORS.textPrimary,
                        }}
                    >{title}</p>
                    {children}
               </VStack>
            </HStack>
        </VStack>
    );
}