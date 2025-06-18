import { useState } from 'react';
import { VStack } from "../../components/VStack";
import { SPACING } from "../../styles/spacing";
import Header from "../../components/Header";
import PageTitle from "../../components/PageTitle";
import { HStack } from "../../components/HStack";
import COLORS from "../../styles/colors";
import { IoMdSearch } from "react-icons/io";
import { FONTS } from "../../styles/fonts";
import Tag from "../../components/Tag";
import ListCard from "../../components/PerformListPage/ListCard";
import testImage from "../../assets/testBandImage.jpeg"
import { useNavigate } from 'react-router-dom';

const dummyPerformData = [
        {
          img: testImage,
          title: "뮤지컬 '엘리자벳'",
          when: "2023.12.01 ~ 2023.12.31",
          text: "황실의 금기를 뛰어넘은 사랑과 자유를 그린 명작 뮤지컬",
          where: "블루스퀘어 신한카드홀",
          tags: ["뮤지컬", "로맨스", "명작"]
        },
        {
          img: testImage,
          title: "콘서트 'BTS MAP OF THE SOUL'",
          when: "2023.11.15 ~ 2023.11.17",
          text: "전 세계를 강타한 글로벌 슈퍼스타 BTS의 대규모 콘서트",
          where: "서울 월드컵경기장",
          tags: ["콘서트", "K-POP", "BTS"]
        },
        {
          img: testImage,
          title: "연극 '햄릿'",
          when: "2023.11.20 ~ 2023.12.10",
          text: "셰익스피어의 대표 비극을 현대적으로 재해석한 작품",
          where: "예술의전당 CJ토월극장",
          tags: ["연극", "클래식", "드라마"]
        },
        {
          img: testImage,
          title: "클래식 갈라 콘서트",
          when: "2023.12.24 ~ 2023.12.25",
          text: "크리스마스 특집 명품 클래식 음악회",
          where: "예술의전당 콘서트홀",
          tags: ["클래식", "콘서트", "크리스마스"]
        },
        {
          img: testImage,
          title: "뮤지컬 '레미제라블'",
          when: "2023.11.01 ~ 2024.02.28",
          text: "빅토르 위고의 명작을 각색한 감동의 뮤지컬",
          where: "샤롯데씨어터",
          tags: ["뮤지컬", "명작", "드라마"]
        }
      ];

// 모든 태그를 추출하여 중복 제거
const allTags = Array.from(new Set(dummyPerformData.flatMap(perform => perform.tags)));

export default function PerformListPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    
    const handleTagClick = (tag: string) => {
        setSelectedTags(prev => 
            prev.includes(tag) 
                ? prev.filter(t => t !== tag)
                : [...prev, tag]
        );
    };
    
    const filteredPerformData = dummyPerformData.filter(perform => {
        const matchesSearch = perform.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesTags = selectedTags.length === 0 || 
                          selectedTags.every(tag => perform.tags.includes(tag));
        return matchesSearch && matchesTags;
    });

    const navigate = useNavigate();
    return (
        <VStack
            align="flex-start"
            justify="flex-start"
            gap={SPACING.medium}
            style={{
                width: "100vw",
                height: "100vh",
                overflowY: "auto",
            }}
        >
            <Header />
            <PageTitle title="공연 리스트" />
            <VStack
                align="flex-start"
                justify="flex-start"
                gap={SPACING.tiny}
                style={{
                    width : "100%",
                    padding: `0 ${SPACING.medium}px`,
                }}
            >
                <HStack
                    align="center"
                    justify="space-between"
                    style={{
                        width : 300,
                        border : `1px solid ${COLORS.border}`,
                        borderRadius : SPACING.tiny,
                    }}
                >
                    <input
                        type="text"
                        placeholder="공연을 검색하세요"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            border: "none",
                            outline: "none",
                            backgroundColor: "transparent",
                            padding: SPACING.tiny,
                            margin: 0,
                            width: '100%',
                        }}
                    />
                    <IoMdSearch size={20} color={COLORS.textForth} />
                </HStack>
                <p
                    style={{
                        fontSize : FONTS.size.title,
                        fontWeight : FONTS.weight.w7,
                        color : COLORS.textPrimary,
                    }}
                >태그</p>
                <HStack
                    align="center"
                    justify="flex-start"
                    gap={SPACING.small}
                    style={{
                        flexWrap: 'wrap',
                        width: '100%',
                    }}
                >
                    {allTags.map(tag => (
                        <div 
                            key={tag}
                            onClick={() => handleTagClick(tag)}
                            style={{
                                cursor: 'pointer',
                                marginBottom: SPACING.small,
                            }}
                        >
                            <Tag
                                text={tag}
                                size="large"
                                isSelected={selectedTags.includes(tag)}
                            />
                        </div>
                    ))}
                </HStack>
                {filteredPerformData.length > 0 ? (
                    filteredPerformData.map((perform) => (
                        <div 
                            key={perform.title}
                            style={{ width: '100%', cursor: 'pointer' }}
                            onClick={() => {
                                const performData = {
                                    title: perform.title,
                                    when: perform.when,
                                    where: perform.where,
                                    text: perform.text,
                                    tags: perform.tags,
                                };
                            
                                const jsonString = JSON.stringify(performData);
                                const base64 = btoa(encodeURIComponent(jsonString)); // Base64 인코딩
                            
                                navigate(`/perform/${base64}`);
                            }}
                        >
                            <ListCard
                                img={perform.img}
                                title={perform.title}
                                when={perform.when}
                                text={perform.text}
                                where={perform.where}
                                tags={perform.tags}
                            />
                        </div>
                    ))
                ) : (
                    <p style={{ 
                        width: '100%', 
                        textAlign: 'center', 
                        padding: SPACING.medium,
                        color: COLORS.textThird
                    }}>
                        검색 결과가 없습니다.
                    </p>
                )}
            </VStack>
        </VStack>
    );
}