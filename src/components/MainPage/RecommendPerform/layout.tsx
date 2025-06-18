import { VStack } from "../../VStack";
import { SPACING } from "../../../styles/spacing";
import { FONTS } from "../../../styles/fonts";
import COLORS from "../../../styles/colors";
import { HStack } from "../../HStack";
import RecommendPerformCard from "./card";
import Button from "../../Button";
import { Performance } from "../../../interface/perfromance.ts"
import { useNavigate } from "react-router-dom";
interface RecommendPerformLayoutProps {
    performances : Performance[];
}

export default function RecommendPerformLayout({ performances }: RecommendPerformLayoutProps) {

    const navigate = useNavigate();
    const recommendPerformList = performances;
    
    return (
        <VStack
            align="flex-start"
            justify="flex-start"
            gap={SPACING.medium}
            style={{
                width : "100%",
                padding : `0 ${SPACING.medium}px`,
            }}
        >
            <p
                style={{
                    fontSize : FONTS.size.head,
                    fontWeight : FONTS.weight.w7,
                    color : COLORS.textPrimary,
                }}
            >
                요즘 인기있는 공연들
            </p>
            <HStack
                align="center"
                justify="flex-start"
                gap={SPACING.small}
                style={{
                    width : "100%",
                    overflowX : "scroll",
                    scrollbarWidth : "none",
                }}
            >
                {recommendPerformList.map((perform, index) => (
                    <RecommendPerformCard
                        key={index}
                        title={perform.title}
                        when={perform.when}
                    />
                ))}
            </HStack>
            <HStack
                align="center"
                justify="center"
                style={{
                    width : "100%",
                }}
            >
                <Button
                    onClick={() => {navigate('/performList')}}
                    text="더 많은 공연 보러가기"
                    fontSize={FONTS.size.body}
                    paddingHorizontal={SPACING.huge}
                    paddingVertical={SPACING.medium}
                />
            </HStack>
        </VStack>
    );
}