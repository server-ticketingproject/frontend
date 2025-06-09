import { HStack } from "../HStack";
import certainLogo from "./certain-logo.svg";
import s from "./styles.module.scss"
import { FONTS } from "../../styles/fonts";

export default function Logo() {
    return (
        <HStack align="center" justify="flex-start">
            <img src={certainLogo} alt="Certain Logo" />
            <p className={s.title} style={{ fontSize: FONTS.size.body, fontWeight: FONTS.weight.w1 }}>CERTAIN-CALL</p>
        </HStack>
    );
}