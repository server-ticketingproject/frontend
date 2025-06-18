import { VStack } from "../../VStack";
import { SPACING } from "../../../styles/spacing";
import COLORS from "../../../styles/colors";
import { FONTS } from "../../../styles/fonts";
import RecommendPerformCard from "../RecommendPerform/card";
import { HStack } from "../../HStack";
import Button from "../../Button";
interface GenreSectionPartProps {
    genre : string;
    performances : Performance[];
}

interface Performance {
    id: number;
    title: string;
    introduce: string;
    when: string;
    where: string;
    ticketLeft: number;
    img: string;
}

export default function GenreSectionPart({ genre, performances } : GenreSectionPartProps) {

    const recommendPerformList = performances;

    return (
        <VStack
            align="flex-start"
            justify="flex-start"
            gap={SPACING.small}
            style={{
                width : 628,
                fontSize : FONTS.size.huge,
                color : COLORS.textPrimary,
            }}
        >
            <p
                style={{
                    fontSize : FONTS.size.head,
                    fontWeight : FONTS.weight.w7,
                    color : COLORS.textPrimary,
                }}
            >
                {genre}
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
                    onClick={() => {console.log('더 많은 공연 보러가기') }}
                    text={`더 많은 ${genre} 공연 보러가기`}
                    fontSize={FONTS.size.body}
                    paddingHorizontal={SPACING.huge}
                    paddingVertical={SPACING.medium}
                />
            </HStack>
        </VStack>
    );
}