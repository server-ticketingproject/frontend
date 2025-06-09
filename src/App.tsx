import { VStack } from "./components/VStack";
import { SPACING } from "./styles/spacing";
import Header from "./components/Header";

export default function App() {
  return (
    <VStack
        style={{
            width: "100vw",
            height: "100vh",
        }}
        gap={SPACING.medium}
    >
        <Header />
    </VStack>
  );
}