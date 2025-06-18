import { VStack } from "../../components/VStack";
import { SPACING } from "../../styles/spacing";
import Header from "../../components/Header";
import { HStack } from "../../components/HStack";
import testImage from "../../assets/testBandImage.jpeg"
import TitleAndText from "../../components/TitleAndText";
import { FONTS } from "../../styles/fonts";
import COLORS from "../../styles/colors"
import PerformIntroduceCard from "../../components/PerformPage/IntroduceCard";
import Button from "../../components/Button";
import Tag from "../../components/Tag";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

export default function PerformPage() {
    const { encoded } = useParams();
    const [performData, setPerformData] = useState<any>(null);
    const navigate = useNavigate();

    useEffect(() => {
        try {
            const decoded = decodeURIComponent(atob(encoded || ''));
            const data = JSON.parse(decoded);
            setPerformData(data);
        } catch (e) {
            console.error("공연 데이터 디코딩 실패", e);
        }
    }, [encoded]);

    if (!performData) return <p>공연 정보를 불러오는 중입니다...</p>;

    const { title, when, where, text, tags } = performData;
    const images = [testImage, testImage, testImage];

    return (
        <VStack
            align="flex-start"
            justify="flex-start"
            gap={SPACING.medium}
            style={{
                width : "100vw",
                height : "100vh",
                overflowY : "auto",
            }}
        >
            <Header />
            <VStack
                align="flex-start"
                justify="flex-start"
                gap={SPACING.medium}
                style={{
                    width : "100%",
                    padding: `0 ${SPACING.medium}px`,
                }}
            >
            <HStack
                align="flex-start"
                justify="space-between"
                style={{
                    width : "100%",
                }}
            >
                <HStack
                    align="flex-start"
                    justify="center"
                    gap={SPACING.huge}
                >
                    <img src={testImage} alt="testImage" style={{ width : 400, height : 300, borderRadius: SPACING.medium }}/>
                    <VStack
                        align="flex-start"
                        justify="flex-start"
                        gap={SPACING.tiny}
                    >
                        <p
                            style={{
                                fontSize : FONTS.size.head,
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
                    <TitleAndText
                        title="일시"
                        text={when}
                        titleSize={FONTS.size.body}
                        textSize={FONTS.size.body}
                        textColor={COLORS.textSecond}
                        gap={SPACING.superTiny}
                    />
                    <TitleAndText
                        title="장소"
                        text={where}
                        titleSize={FONTS.size.body}
                        textSize={FONTS.size.body}
                        textColor={COLORS.textSecond}
                        gap={SPACING.superTiny}
                    />
                    <TitleAndText
                        title="남은 티켓"
                        text="10장"
                        titleSize={FONTS.size.body}
                        textSize={FONTS.size.body}
                        textColor={COLORS.brandPrimary}
                        gap={SPACING.superTiny}
                    />
                </VStack>
                </HStack>
                <HStack
                    align="center"
                    justify="center"
                    gap={SPACING.huge}
                    style={{
                        height : '100%',
                        marginRight : SPACING.huge,
                    }}
                >
                    <p
                        style={{
                            fontSize : FONTS.size.head,
                            fontWeight : FONTS.weight.w7,
                            color : COLORS.textPrimary,
                        }}
                    >
                        가격 : 13000원 
                    </p>
                <Button
                    text="예매하기"
                    fontSize={FONTS.size.body}
                    onClick={() => {navigate('/perform-reserve/' + encoded)}}
                    paddingHorizontal={SPACING.superHuge}
                    paddingVertical={40}
                />
                </HStack>
            </HStack>
            <HStack
                align="flex-start"
                justify="flex-start"
                gap={SPACING.medium}
                style={{
                    width : "100%",
                    height : 391,
                }}
            >
                <PerformIntroduceCard
                    title="오이스터즈 어게인"
                    isBand={true}
                    img={testImage}
                    children={
                        <VStack
                            align="flex-start"
                            justify="flex-start"
                            gap={SPACING.tiny}
                        >
                            <TitleAndText
                            title="소개"
                            text="안녕하세요 저희는 오아시스이고요
                                    잘해체하고 잘 던집니다
                                내한할거임~~"
                            titleSize={FONTS.size.body}
                            textSize={FONTS.size.body}
                            textColor={COLORS.textSecond}
                            gap={SPACING.superTiny}
                            />
                            <HStack
                            align="center"
                            justify="flex-start"
                            gap={SPACING.tiny}
                            >
                            <p
                                style={{
                                    fontSize : FONTS.size.body,
                                    fontWeight : FONTS.weight.w7,
                                    color : COLORS.textPrimary,
                                }}
                            >태그</p>
                            {tags.map((tag : any, index : number) => (
                                <Tag
                                    key={index}
                                    text={tag}
                                    size="small"
                                    isSelected={true}
                                />
                            ))}
                        </HStack>
                        </VStack>
                    }
                />
                <PerformIntroduceCard
                    title="공연대극장"
                    isBand={false}
                    img={testImage}
                    children={
                        <VStack
                            align="flex-start"
                            justify="flex-start"
                            gap={SPACING.tiny}
                        >
                            <TitleAndText
                            title="위치"
                            text="서울특별시 용산구 청파로 1길"
                            titleSize={FONTS.size.body}
                            titleColor={COLORS.textPrimary}
                            
                            textSize={FONTS.size.body}
                            textColor={COLORS.textSecond}
                            gap={SPACING.superTiny}
                            />
                            <TitleAndText
                            title="수용인원"
                            text="100명"
                            titleSize={FONTS.size.body}
                            textSize={FONTS.size.body}
                            textColor={COLORS.textSecond}
                            gap={SPACING.superTiny}
                            /><TitleAndText
                            title="주차공간"
                            text="100대"
                            titleSize={FONTS.size.body}
                            textSize={FONTS.size.body}
                            textColor={COLORS.textSecond}
                            gap={SPACING.superTiny}
                            />
                        </VStack>
                    }
                />
            </HStack>
            <VStack
                align="flex-start"
                justify="flex-start"
                gap={SPACING.medium}
                style={{
                    width : "100%",
                    height : 400,
                }}
            >
                <p
                    style={{
                        fontSize : FONTS.size.head,
                        fontWeight : FONTS.weight.w7,
                        color : COLORS.textPrimary,
                    }}
                >
                    밴드 공연 사진
                </p>
                <HStack
                    align="flex-start"
                    justify="flex-start"
                    gap={SPACING.medium}
                    style={{
                        width : "100%",
                        overflowX : "scroll",
                        whiteSpace : "nowrap",
                        scrollbarWidth : "none",
                        
                    }}
                >
                    {images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt=""
                        style={{
                            height : 300,
                            borderRadius : SPACING.tiny,
                        }}
                    />
                ))}
                </HStack>
            </VStack>
            </VStack>
        </VStack>
    );
}   