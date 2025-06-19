import { useState, useEffect } from 'react';
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
import testImage from "../../assets/testBandImage.jpeg";
import { useNavigate } from 'react-router-dom';

export default function PerformListPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [performData, setPerformData] = useState<any[]>([]);

    // 공연 리스트를 백엔드에서 불러오기
    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/events')
            .then(res => res.json())
            .then(data => {
                // API 응답이 배열이 아닐 경우를 대비
                if (Array.isArray(data)) {
                    setPerformData(data);
                } else if (Array.isArray(data.results)) {
                    setPerformData(data.results);
                } else {
                    setPerformData([]);
                }
            })
            .catch(() => setPerformData([]));
    }, []);

    // 모든 태그 추출
    const allTags = Array.from(
        new Set(
            performData.flatMap(perform =>
                Array.isArray(perform.tags)
                    ? perform.tags.map((tag: any) => tag.name)
                    : []
            )
        )
    );

    const handleTagClick = (tag: string) => {
        setSelectedTags(prev =>
            prev.includes(tag)
                ? prev.filter(t => t !== tag)
                : [...prev, tag]
        );
    };

    // 검색 및 태그 필터링
    const filteredPerformData = performData.filter(perform => {
        const matchesSearch = perform.title?.toLowerCase().includes(searchTerm.toLowerCase());
        const performTags = Array.isArray(perform.tags) ? perform.tags.map((tag: any) => tag.name) : [];
        const matchesTags =
            selectedTags.length === 0 ||
            selectedTags.every(tag => performTags.includes(tag));
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
                    width: "100%",
                    padding: `0 ${SPACING.medium}px`,
                }}
            >
                <HStack
                    align="center"
                    justify="space-between"
                    style={{
                        width: 300,
                        border: `1px solid ${COLORS.border}`,
                        borderRadius: SPACING.tiny,
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
                        fontSize: FONTS.size.title,
                        fontWeight: FONTS.weight.w7,
                        color: COLORS.textPrimary,
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
                            key={perform.id}
                            style={{ width: '100%', cursor: 'pointer' }}
                            onClick={() => {
                                const performData = {
                                    title: perform.title,
                                    when: perform.date,
                                    where: perform.stage_name,
                                    text: perform.team_intro || perform.description,
                                    tags: Array.isArray(perform.tags) ? perform.tags.map((tag: any) => tag.name) : [],
                                };

                                const jsonString = JSON.stringify(performData);
                                const base64 = btoa(encodeURIComponent(jsonString)); // Base64 인코딩

                                navigate(`/perform/${base64}`);
                            }}
                        >
                            <ListCard
                                img={perform.poster || testImage}
                                title={perform.title}
                                when={perform.date}
                                text={perform.team_intro || perform.description}
                                where={perform.stage_name}
                                tags={Array.isArray(perform.tags) ? perform.tags.map((tag: any) => tag.name) : []}
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