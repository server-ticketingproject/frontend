import Header from "../../components/Header";
import SelectHeader from "../../components/MainPage/selectHeader";
import { VStack } from "../../components/VStack";
import { SPACING } from "../../styles/spacing";
import { useState } from "react";
import WeekPerformCard from "../../components/MainPage/weekPerformCard/card";
import testImage from "../../assets/testBandImage.jpeg"
import COLORS from "../../styles/colors"
import {FONTS} from "../../styles/fonts"
import {FaChevronLeft, FaChevronRight} from "react-icons/fa"
import {HStack} from "../../components/HStack"

const performances = [
    {
        id: 1,
        title : "오이스터즈 어게인",
        img : testImage,
        introduce : "오이스터즈 어게인은 2015년에 설립된 한국의 랜드1로프밴드입니다.",
        when : "2023.12.01 ~ 2023.12.31",
        where : "서울시 용산구 청파동 12길",
        ticketLeft : 10,
    },
    {
        id: 2,
        title : "오이스터즈 어게인",
        img : testImage,
        introduce : "오이스터즈 어게인은 2015년에 설립된 한국의 랜드2로프밴드입니다.",
        when : "2023.12.01 ~ 2023.12.31",
        where : "서울시 용산구 청파동 12길",
        ticketLeft : 10,
    },
    {
        id: 3,
        title : "오이스터즈 어게인",
        img : testImage,
        introduce : "오이스터즈 어게인은 2015년에 설립된 한국의 랜드3로프밴드입니다.",
        when : "2023.12.01 ~ 2023.12.31",
        where : "서울시 용산구 청파동 12길",
        ticketLeft : 10,
    },
    {
        id: 4,
        title : "오이스터즈 어게인",
        img : testImage,
        introduce : "오이스터즈 어게인은 2015년에 설립된 한국의 랜드4로프밴드입니다.",
        when : "2023.12.01 ~ 2023.12.31",
        where : "서울시 용산구 청파동 12길",
        ticketLeft : 10,
    },
    {   
        id: 5,
        title : "오이스터즈 어게인",
        img : testImage,
        introduce : "오이스터즈 어게인은 2015년에 설립된 한국의 랜드5로프밴드입니다.",
        when : "2023.12.01 ~ 2023.12.31",
        where : "서울시 용산구 청파동 12길",
        ticketLeft : 10,
    },
    {
        id: 6,
        title : "오이스터즈 어게인",
        img : testImage,
        introduce : "오이스터즈 어게인은 2015년에 설립된 한국의 랜드6로프밴드입니다.",
        when : "2023.12.01 ~ 2023.12.31",
        where : "서울시 용산구 청파동 12길",
        ticketLeft : 10,
    },
    {
        id: 7,
        title : "오이스터즈 어게인",
        img : testImage,
        introduce : "오이스터즈 어게인은 2015년에 설립된 한국의 랜드7로프밴드입니다.",
        when : "2023.12.01 ~ 2023.12.31",
        where : "서울시 용산구 청파동 12길",
        ticketLeft : 10,
    },
    {
        id: 8,
        title : "오이스터즈 어게인",
        img : testImage,
        introduce : "오이스터즈 어게인은 2015년에 설립된 한국의 랜드8로프밴드입니다.",
        when : "2023.12.01 ~ 2023.12.31",
        where : "서울시 용산구 청파동 12길",
        ticketLeft : 10,
    },
    {
        id: 9,
        title : "오이스터즈 어게인",
        img : testImage,
        introduce : "오이스터즈 어게인은 2015년에 설립된 한국의 랜드9로프밴드입니다.",
        when : "2023.12.01 ~ 2023.12.31",
        where : "서울시 용산구 청파동 12길",
        ticketLeft : 10,
    },
    {
        id: 10,
        title : "오이스터즈 어게인",
        img : testImage,
        introduce : "오이스터즈 어게인은 2015년에 설립된 한국의 랜드10로프밴드입니다.",
        when : "2023.12.01 ~ 2023.12.31",
        where : "서울시 용산구 청파동 12길",
        ticketLeft : 10,
    },

]



export default function StageMainPage() {

    const [currentIndex, setCurrentIndex] = useState(0);
    const currentPerformance = performances[currentIndex];
  
    const goToPrevious = () => {
      setCurrentIndex((prevIndex) => 
        prevIndex === 0 ? performances.length - 1 : prevIndex - 1
      );
    };
  
    const goToNext = () => {
      setCurrentIndex((prevIndex) => 
        prevIndex === performances.length - 1 ? 0 : prevIndex + 1
      );
    };

    return (
        <VStack
            align="flex-start"
            justify="flex-start"
            gap={SPACING.medium}
            style={{
                width : "100%",
                overflowY : "auto",
            }}
        >       
            <Header />
            <SelectHeader/>
            <HStack
                align="center"
                justify="center"
                gap={SPACING.medium}    
                style={{
                    width : "100%",
                    padding : `0 ${SPACING.medium}px`,
                }}
            >
                <VStack
                    style={{
                        position: "relative",
                        width: "calc(100% - 370px)",
                        height: "370px",
                        padding: `${SPACING.medium}px`,
                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${currentPerformance.img})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        borderRadius: SPACING.small,
                    }}
                >
                    <p style={{
                        fontSize: FONTS.size.title,
                        fontWeight: FONTS.weight.w5,
                        color: COLORS.textInvert,
                        zIndex: 1,
                    }}>인기 공연장</p>

                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: SPACING.medium,
                        transform: 'translateY(-50%)',
                        zIndex: 2,
                        cursor: 'pointer',
                        color: COLORS.textInvert,
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        borderRadius: '50%',
                        width: '40px',
                        height: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }} 
                    onClick={goToPrevious}
                    >
                        <FaChevronLeft size={24} />
                    </div>

                    <WeekPerformCard
                        key={currentPerformance.id}
                        title={currentPerformance.title}
                        introduce={currentPerformance.introduce}
                        when={currentPerformance.when}
                        where={currentPerformance.where}
                        ticketLeft={currentPerformance.ticketLeft}
                        style={{
                            position: "absolute",
                            right: SPACING.huge,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            zIndex: 1,
                        }}
                    />

                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        right: SPACING.medium,
                        transform: 'translateY(-50%)',
                        zIndex: 2,
                        cursor: 'pointer',
                        color: COLORS.textInvert,
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        borderRadius: '50%',
                        width: '40px',
                        height: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }} 
                    onClick={goToNext}
                    >
                        <FaChevronRight size={24} />
                    </div>

                    <HStack style={{
                        position: 'absolute',
                        bottom: SPACING.medium,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        zIndex: 2,
                        gap: SPACING.small,
                    }}>
                        {performances.map((_, index) => (
                            <div 
                                key={index}
                                style={{
                                    width: '10px',
                                    height: '10px',
                                    borderRadius: '50%',
                                    backgroundColor: index === currentIndex ? COLORS.brandPrimary : COLORS.textInvert,
                                    opacity: index === currentIndex ? 1 : 0.5,
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                }}
                                onClick={() => setCurrentIndex(index)}
                            />
                        ))}
                    </HStack>

                    <div
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            backgroundColor: "rgba(0, 0, 0, 0.3)",
                            zIndex: 0,
                        }}
                    />
                </VStack>
            </HStack>
    </VStack>
    );
}