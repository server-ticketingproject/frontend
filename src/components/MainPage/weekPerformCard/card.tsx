import TitleAndText from "../../TitleAndText";
import { VStack } from "../../VStack";
import { FONTS } from "../../../styles/fonts";
import { SPACING } from "../../../styles/spacing";
import COLORS from "../../../styles/colors";
import Button from "../../Button";

interface WeekPerformCardProps {
 title : string;
 introduce : string;
 when : string;
 where : string;
 ticketLeft : number;      
 style ?: any
}

export default function WeekPerformCard({
    title,
    introduce,
    when,
    where,
    ticketLeft,
    style,
}: WeekPerformCardProps) {
    return (
        <VStack
            align="flex-start"
            justify="space-between"
            style={{
                padding : SPACING.medium,
                backgroundColor : COLORS.textInvert,
                width : 300,
                height : 300,
                borderRadius : SPACING.medium,
                ...style,
            }}
        >
            <VStack
                gap={SPACING.tiny}
                align="flex-start"
                justify="flex-start"
            >
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
                        fontWeight : FONTS.weight.w2,
                        color : COLORS.textSecond,
                    }}
                >{introduce}</p>
                <VStack
                    gap={SPACING.superTiny}
                    align="center"
                    justify="center"
                >
                <TitleAndText
                    width="100%"
                    title={'일시'}
                    titleSize={FONTS.size.small}
                    text={when}
                    textSize={FONTS.size.small}
                    gap={SPACING.superTiny}
                />
                <TitleAndText
                    width="100%"
                    title={'장소'}
                    titleSize={FONTS.size.small}
                    text={where}
                    textSize={FONTS.size.small}
                    gap={SPACING.superTiny}
                />
                <TitleAndText
                    width="100%"
                    title={'남은 티켓'}
                    titleSize={FONTS.size.small}
                    text={`${ticketLeft}장`}
                    textSize={FONTS.size.small}
                    gap={SPACING.superTiny}
                />
                </VStack>
            </VStack>
                <Button
                    onClick={() => {console.log('예매하기') }}
                    text="예매하기"
                    fontSize={FONTS.size.body}
                    paddingHorizontal={SPACING.huge}
                    paddingVertical={SPACING.medium}
                />
        </VStack>
    );
}