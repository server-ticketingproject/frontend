import { VStack } from "../../components/VStack";
import Header from "../../components/Header";
import { SPACING } from "../../styles/spacing";
import SelectHeader from "../../components/MainPage/selectHeader";
import { HStack } from "../../components/HStack";
import WeekPerformCardLayout from "../../components/MainPage/weekPerformCard/layout";
import MyperformsLayout from "../../components/MainPage/Myperforms/layout";

export default function MainPage() {
    return (
        <VStack
            align="center"
            justify="flex-start"
            gap={SPACING.medium}
            style={{
                width : "100vw",
                height : "100vh",
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
                    padding : `${SPACING.medium}px`,
                }}
            >
               <WeekPerformCardLayout />
               <MyperformsLayout />
            </HStack>
        </VStack>
    );
}