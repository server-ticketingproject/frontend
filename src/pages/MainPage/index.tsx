import { VStack } from "../../components/VStack";
import Header from "../../components/Header";
import { SPACING } from "../../styles/spacing";
import SelectHeader from "../../components/MainPage/selectHeader";
import { HStack } from "../../components/HStack";
import WeekPerformCardLayout from "../../components/MainPage/weekPerformCard/layout";
import MyperformsLayout from "../../components/MainPage/Myperforms/layout";
import RecommendPerformLayout from "../../components/MainPage/RecommendPerform/layout";
import GenreSectionLayout from "../../components/MainPage/GenreSection/layout";
export default function MainPage() {
    return (
        <VStack
            align="center"
            justify="flex-start"
            gap={SPACING.medium}
            style={{
                width : "100%",
                overflowY : "auto",
            }}
        >
            <Header />
            <SelectHeader />
            <HStack
                align="center"
                justify="center"
                gap={SPACING.medium}    
                style={{
                    width : "100%",
                    padding : `0 ${SPACING.medium}px`,
                }}
            >
               <WeekPerformCardLayout />
               <MyperformsLayout />
            </HStack>
            <RecommendPerformLayout />
            <GenreSectionLayout />
        </VStack>
    );
}