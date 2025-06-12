import { VStack } from "../../components/VStack";
import { SPACING } from "../../styles/spacing";
import Header from "../../components/Header";
import PageTitle from "../../components/PageTitle";
import ListCard from "../../components/StageListPage/ListCard";
import testImage from "../../assets/testBandImage.jpeg"

export default function StageListPage() {

     const dummyPerformData = [
        {
          img: testImage,
          title: "밴드 전문 공연장",
          when: "2023.12.01 ~ 2023.12.31",
          text: "홍대 인근의 다양한 밴드 공연을 즐길 수 있는 전문 공연장",
          where: "홍대 밴드 거리",
          peoples: 100
        },
        {
          img: testImage,
          title: "콘서트 'BTS MAP OF THE SOUL'",
          when: "2023.11.15 ~ 2023.11.17",
          text: "전 세계를 강타한 글로벌 슈퍼스타 BTS의 대규모 콘서트",
          where: "서울 월드컵경기장",
          peoples: 50000
        },
        {
          img: testImage,
          title: "연극 '햄릿'",
          when: "2023.11.20 ~ 2023.12.10",
          text: "셰익스피어의 대표 비극을 현대적으로 재해석한 작품",
          where: "예술의전당 CJ토월극장",
          peoples: 200
        },
        {
          img: testImage,
          title: "클래식 갈라 콘서트",
          when: "2023.12.24 ~ 2023.12.25",
          text: "크리스마스 특집 명품 클래식 음악회",
          where: "예술의전당 콘서트홀",
          peoples: 300
        },
        {
          img: testImage,
          title: "뮤지컬 '레미제라블'",
          when: "2023.11.01 ~ 2024.02.28",
          text: "빅토르 위고의 명작을 각색한 감동의 뮤지컬",
          where: "샤롯데씨어터",
          peoples: 400
        }
      ];

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
            <PageTitle title="공연장 대여" />
            <VStack
                align="flex-start"
                justify="flex-start"
                gap={SPACING.tiny}
                style={{
                    width : "100%",
                    padding: `0 ${SPACING.medium}px`,
                }}
            >
                
                {dummyPerformData.map((perform) => (
                    <ListCard
                        key={perform.title}
                        img={perform.img}
                        title={perform.title}
                        when={perform.when}
                        text={perform.text}
                        where={perform.where}
                        peoples={perform.peoples}
                    />
                ))}
            </VStack>
        </VStack>
    );
}

