import { HStack } from "../../HStack";
import { SPACING } from "../../../styles/spacing";
import GenreSectionPart from "./part";
import { Performance } from "../../../interface/perfromance.ts"

interface GenreSectionLayoutProps {
    performances : Performance[];
}

export default function GenreSectionLayout({ performances }: GenreSectionLayoutProps) {

    const genreSectionList = performances;
    
    return (
        <HStack
            align="flex-start"
            justify="flex-start"
            gap={SPACING.superHuge}
            style={{
                width : "100%",
                overflowX : "scroll",
                scrollbarWidth : "none",
                padding : `0 ${SPACING.medium}px`,
            }}
        >
            <GenreSectionPart genre="발라드" performances={genreSectionList} />
            <GenreSectionPart genre="JPOP" performances={genreSectionList} />
        </HStack>
    );
}