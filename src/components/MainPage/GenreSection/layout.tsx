import { HStack } from "../../HStack";
import { SPACING } from "../../../styles/spacing";
import GenreSectionPart from "./part";


export default function GenreSectionLayout() {

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
            <GenreSectionPart genre="발라드" />
            <GenreSectionPart genre="JPOP" />
        </HStack>
    );
}