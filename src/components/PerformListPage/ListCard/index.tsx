import { HStack } from "../../HStack";
import { SPACING } from "../../../styles/spacing";
import { VStack } from "../../VStack";
import Button from "../../Button";
import { FONTS } from "../../../styles/fonts";
import Tag from "../../Tag";
import COLORS from "../../../styles/colors";

interface ListCardProps {
    img: any;
    title : string;
    when : string;
    text : string;
    where : string;
    tags : string[];
}

export default function ListCard({ img, title, when, text, where, tags } : ListCardProps) {
    return (
       <HStack
            align="center"
            justify="flex-start"
            gap={SPACING.medium}
            style={{
                width : "100%",
                height : 174,
                padding : `${SPACING.small}px`,
            }}
       >
        <img src={img} alt="" width={150} height={150} style={{borderRadius : SPACING.superTiny}} />
        <VStack
            align="flex-start"
            justify="flex-start"
            gap={SPACING.tiny}
            style={{
                height : "100%",
            }}
        >
            <p
                style={{
                    fontSize : FONTS.size.title,
                    fontWeight : FONTS.weight.w7,
                    color : COLORS.textPrimary,
                }}
            >{title}</p>
            <p
                style={{
                    fontSize : FONTS.size.body,
                    fontWeight : FONTS.weight.w3,
                    color : COLORS.textPrimary,
                }}
            >{text}</p>
        </VStack>
        <VStack
            align="flex-start"
            justify="flex-start"
            gap={SPACING.tiny}
            style={{
                height : "100%",
            }}
        >
            <p
                style={{
                    fontSize : FONTS.size.title,
                    fontWeight : FONTS.weight.w7,
                    color : COLORS.textPrimary,
                }}
            >일시</p>
            <p
                style={{
                    fontSize : FONTS.size.body,
                    fontWeight : FONTS.weight.w3,
                    color : COLORS.textPrimary,
                }}
            >{when}</p>
        </VStack>
        <VStack
            align="flex-start"
            justify="flex-start"
            gap={SPACING.tiny}
            style={{
                height : "100%",
            }}
        >
            <p
                style={{
                    fontSize : FONTS.size.title,
                    fontWeight : FONTS.weight.w7,
                    color : COLORS.textPrimary,
                }}
            >장소</p>
            <p
                style={{
                    fontSize : FONTS.size.body,
                    fontWeight : FONTS.weight.w3,
                    color : COLORS.textPrimary,
                }}
            >{where}</p>
            <Button
                text="지도 보러가기"
                fontSize={FONTS.size.body}
                onClick={() => {console.log("지도 보러가기")}}
                paddingHorizontal={SPACING.medium}
                paddingVertical={SPACING.tiny}
            />
        </VStack>
        <VStack
            align="flex-start"
            justify="flex-start"
            gap={SPACING.tiny}
            style={{
                height : "100%",
            }}
        >
            <p
                style={{
                    fontSize : FONTS.size.title,
                    fontWeight : FONTS.weight.w7,
                    color : COLORS.textPrimary,
                }}
            >태그</p>
            {tags.map((tag) => (
                <Tag
                    text={tag}
                    size="small"
                    isSelected={false}
                />
            ))}
        </VStack>
       </HStack>
    );
}