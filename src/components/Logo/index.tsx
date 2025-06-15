import { HStack } from "../HStack";
import certainLogo from "./certain-logo.svg";
import s from "./styles.module.scss"
import { FONTS } from "../../styles/fonts";
import { useNavigate } from "react-router-dom";

export default function Logo() {
    const navigate = useNavigate();
    return (
        <HStack align="center" justify="flex-start">
            <img src={certainLogo} alt="Certain Logo" />
            <p className={s.title} style={{ fontSize: FONTS.size.body, fontWeight: FONTS.weight.w1 }} onClick={() => {navigate('/')}}>CERTAIN-CALL</p>
        </HStack>
    );
}