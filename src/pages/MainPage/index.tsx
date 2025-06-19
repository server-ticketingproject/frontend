import { useEffect, useState } from "react";
import { VStack } from "../../components/VStack";
import Header from "../../components/Header";
import { SPACING } from "../../styles/spacing";
import SelectHeader from "../../components/MainPage/selectHeader";
import { HStack } from "../../components/HStack";
import WeekPerformCardLayout from "../../components/MainPage/weekPerformCard/layout";
import MyperformsLayout from "../../components/MainPage/Myperforms/layout";
import RecommendPerformLayout from "../../components/MainPage/RecommendPerform/layout";
import GenreSectionLayout from "../../components/MainPage/GenreSection/layout";
import testImage from "../../assets/testBandImage.jpeg";
import Button from "../../components/Button";
import { FONTS } from "../../styles/fonts";

/**
 * Mock data representing a list of performance events.
 */

const mockData = [
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
];

export default function MainPage() {
    const [performances, setPerformances] = useState<any[]>(mockData);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/events')
            .then(res => res.json())
            .then(data => {
                let list = [];
                if (Array.isArray(data)) {
                    list = data;
                } else if (Array.isArray(data.results)) {
                    list = data.results;
                }
                if (list.length > 0) {
                    // 백엔드 데이터 -> 프론트 카드 데이터 변환
                    setPerformances(
                        list.map((item : any) => ({
                            id: item.id,
                            title: item.title,
                            img: item.poster || testImage,
                            introduce: item.team_intro || item.description || "",
                            when: item.date || "",
                            where: item.stage_name || "",
                            ticketLeft: 10, // 목데이터 값 사용
                        }))
                    );
                } else {
                    setPerformances(mockData);
                }
            })
            .catch(() => setPerformances(mockData));
    }, []);

    const requestdfa = () => {
        fetch('http://127.0.0.1:8000/api/events')
            .then(res => res.json())
            .then(data => {
                let list = [];
                if (Array.isArray(data)) {
                    list = data;
                } else if (Array.isArray(data.results)) {
                    list = data.results;
                }
                if (list.length > 0) {
                    // 백엔드 데이터 -> 프론트 카드 데이터 변환
                    setPerformances(
                        list.map((item : any) => ({
                            id: item.id,
                            title: item.title,
                            img: item.poster || testImage,
                            introduce: item.team_intro || item.description || "",
                            when: item.date || "",
                            where: item.stage_name || "",
                            ticketLeft: 10, // 목데이터 값 사용
                        }))
                    );
                } if (list.length === 0) {
                    console.log("목데이터로 대체합니다.");
                } else {
                    setPerformances(mockData);
                }
            })
            .catch(() => setPerformances(mockData));
    }
        

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
               <WeekPerformCardLayout performances={performances.slice(0, 4)} />
               <MyperformsLayout />
            </HStack>
            <RecommendPerformLayout performances={performances}/>
            <GenreSectionLayout performances={performances.slice(0, 3)}/>
            <Button text="더보기" onClick={() => {requestdfa()}} fontSize={FONTS.size.small} /> 
        </VStack>
    );
}