import { VStack } from "../../VStack";
import { SPACING } from "../../../styles/spacing";
import COLORS from "../../../styles/colors";
import MyperformsCard from "./card";
import { FONTS } from "../../../styles/fonts";

interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
  image?: string;
}

export default function MyperformsLayout() {
    return (
        <VStack
            align="flex-start"
            justify="flex-start"
            gap={SPACING.small}
            style={{
                width : 370,
                height : 370,
                padding : SPACING.small,
                backgroundColor : COLORS.textInvert,
                border : `1px solid ${COLORS.border}`,
                borderRadius : SPACING.medium,
            }}
        >
            <>
                <p
                    style={{
                        fontWeight : FONTS.weight.w7,
                        fontSize : FONTS.size.head,
                    }}
                >현재 <span style={{ color: COLORS.brandPrimary }}>박찬혁</span> 님의 <br />공연 예약 내용은 다음과 같습니다.</p>
            </>
            <MyperformsCard
                title="자우림밴드"
                when="2025년 6월 10일"
                where="서울시 강남구"
            />
            <MyperformsCard
                title="자우림밴드"
                when="2025년 6월 10일"
                where="서울시 강남구"
            />
        </VStack>
    );
}