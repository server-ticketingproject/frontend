import { VStack } from "../../components/VStack";
import { SPACING } from "../../styles/spacing";
import Header from "../../components/Header";
import { HStack } from "../../components/HStack";
import testImage from "../../assets/testBandImage.jpeg"
import TitleAndText from "../../components/TitleAndText";
import { FONTS } from "../../styles/fonts";
import COLORS from "../../styles/colors"
import Button from "../../components/Button";

export default function PerformPage() {
    return (
        <VStack
            align="flex-start"
            justify="flex-start"
            gap={SPACING.medium}
            style={{
                width : "100vw",
                height : "100vh",
                overflowY : "auto",
                padding: `${SPACING.medium}px`,
            }}
        >
            <Header />
            <HStack
                align="flex-start"
                justify="space-between"
                style={{
                    width : "100%",
                }}
            >
                <HStack
                    align="flex-start"
                    justify="center"
                    gap={SPACING.huge}
                >
                    <img src={testImage} alt="testImage" style={{ width : 400, height : 300, borderRadius: SPACING.medium }}/>
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
                    >오이스터즈 어게인</p>
                    <p
                        style={{
                            fontSize : FONTS.size.body,
                            fontWeight : FONTS.weight.w3,
                            color : COLORS.textPrimary,
                        }}
                    >저희는 청년밴드로 재밋는 곡들을 연주하고.
                    어쩌고 저쩌고 많이 보러 와주셈 ㅋㅋ</p>
                    <TitleAndText
                        title="일시"
                        text="2025/12/26 20:00~22:00"
                        titleSize={FONTS.size.body}
                        textSize={FONTS.size.body}
                        textColor={COLORS.textSecond}
                        gap={SPACING.superTiny}
                    />
                    <TitleAndText
                        title="장소"
                        text="서울특별시"
                        titleSize={FONTS.size.body}
                        textSize={FONTS.size.body}
                        textColor={COLORS.textSecond}
                        gap={SPACING.superTiny}
                    />
                    <TitleAndText
                        title="남은 티켓"
                        text="10장"
                        titleSize={FONTS.size.body}
                        textSize={FONTS.size.body}
                        textColor={COLORS.brandPrimary}
                        gap={SPACING.superTiny}
                    />
                </VStack>
                </HStack>
                <HStack
                    align="center"
                    justify="center"
                    gap={SPACING.huge}
                    style={{
                        height : '100%',
                        marginRight : SPACING.huge,
                    }}
                >
                    <p
                        style={{
                            fontSize : FONTS.size.head,
                            fontWeight : FONTS.weight.w7,
                            color : COLORS.textPrimary,
                        }}
                    >
                        가격 : 13000원 
                    </p>
                <Button
                    text="예매하기"
                    fontSize={FONTS.size.body}
                    onClick={() => {console.log("예매하기")}}
                    paddingHorizontal={SPACING.superHuge}
                    paddingVertical={40}
                />
                </HStack>
                
            </HStack>
        </VStack>
    );
}   