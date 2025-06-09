import WeekPerformCard from "./card";
import { VStack } from "../../../VStack";
import { SPACING } from "../../../../styles/spacing";

export default function WeekPerformCardLayout() {
    return (
        <VStack
            style={{
                position : "relative",
                width : "1034px",
                height : "370px",
            }}
        >
            <WeekPerformCard
                title="자우림밴드"
                introduce="자우림밴드의 공연을 예매해보세요!"
                when="2025년 6월 10일"
                where="서울시 강남구"
                ticketLeft={10}
                style={{
                    position : "absolute",
                    right : SPACING.huge,
                    top : '50%',
                    transform : 'translateY(-50%)',
                }}
            />
        </VStack>
    );
}