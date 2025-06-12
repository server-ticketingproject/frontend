import COLORS from "../../styles/colors";

interface ButtonProps {
 onClick : () => void;
 text : string;
 paddingVertical ?: number;
 paddingHorizontal ?: number;   
 fontSize : number;
}

export default function Button({
    onClick,
    text,
    paddingVertical,
    paddingHorizontal,
    fontSize,
}: ButtonProps) {
    return (
        <button
            onClick={onClick}
            style={{
                padding : `${paddingVertical}px ${paddingHorizontal}px`,
                backgroundColor : COLORS.brandPrimary,
                color : COLORS.textInvert,
                borderRadius : "8px",
                fontSize : fontSize,
                border : "none",
                outline : "none",
                margin: '0'
            }}
        >
            {text}
        </button>
    );
}