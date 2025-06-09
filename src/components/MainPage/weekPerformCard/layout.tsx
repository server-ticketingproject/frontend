import WeekPerformCard from "./card";
import { VStack } from "../../VStack";
import { SPACING } from "../../../styles/spacing";
import testBandImage from "../../../assets/testBandImage.jpeg";
import { FONTS } from "../../../styles/fonts";
import COLORS from "../../../styles/colors";
export default function WeekPerformCardLayout() {
    return (
        <VStack
            style={{
                position : "relative",
                width : "calc(100% - 370px)",
                height : "370px",
                padding : `${SPACING.medium}px`,
                backgroundImage : `url(${testBandImage})`,
                backgroundSize : "cover",
                backgroundPosition : "center",
                borderRadius : SPACING.small,
            }}
        >
            <p style={{
                fontSize : FONTS.size.title,
                fontWeight : FONTS.weight.w5,
                color : COLORS.textInvert,
                zIndex : 1,
            }}>이주의 공연들</p>
            <WeekPerformCard
                title="자우림밴드"
                introduce="저희는 청년밴드로 재밋는 곡들을 연주하고.
어쩌고 저쩌고 많이 보러 와주셈 ㅋㅋ"
                when="2025년 6월 10일"
                where="서울시 강남구"
                ticketLeft={10}
                style={{
                    position : "absolute",
                    right : SPACING.huge,
                    top : '50%',
                    transform : 'translateY(-50%)',
                    zIndex : 1,
                }}
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
                    borderRadius : SPACING.small,
                }}
            />
        </VStack>
    );
}