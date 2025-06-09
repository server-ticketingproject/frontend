import TitleAndText from "../../../TitleAndText";
import { VStack } from "../../../VStack";
import { FONTS } from "../../../../styles/fonts";
import { SPACING } from "../../../../styles/spacing";
import COLORS from "../../../../styles/colors";
import Button from "../../../Button";

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
            align="center"
            justify="space-between"
            style={{
                padding : SPACING.medium,
                ...style,
            }}
        >
            <VStack
                gap={SPACING.tiny}
                align="center"
                justify="center"
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
                    titleSize={FONTS.size.body}
                    text={when}
                    textSize={FONTS.size.body}
                    gap={SPACING.superTiny}
                />
                <TitleAndText
                    width="100%"
                    title={'장소'}
                    titleSize={FONTS.size.body}
                    text={where}
                    textSize={FONTS.size.body}
                    gap={SPACING.superTiny}
                />
                <TitleAndText
                    width="100%"
                    title={'티켓'}
                    titleSize={FONTS.size.body}
                    text={`${ticketLeft}장`}
                    textSize={FONTS.size.body}
                    gap={SPACING.superTiny}
                />
                </VStack>
            </VStack>
            <VStack>
                <Button
                    onClick={() => {console.log('예매하기') }}
                    text="예매하기"
                    fontSize={FONTS.size.body}
                />
            </VStack>
        </VStack>
    );
}