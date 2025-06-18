import { VStack } from "../../components/VStack";
import Header from "../../components/Header";
import { SPACING } from "../../styles/spacing";
import PageTitle from "../../components/PageTitle";
import { HStack } from "../../components/HStack";
import TitleAndText from "../../components/TitleAndText";
import { FONTS } from "../../styles/fonts";
import COLORS from "../../styles/colors";
import testImage from "../../assets/testBandImage.jpeg"

interface MemeberProps {
    img : string;
    name : string;
    introduce : string; 
}

interface BandIntroducePageProps {
    bandName : string;
    introduce : string;
    memberList : MemeberProps[];
    representativeImage : string;
    imgList : string[];
}

function MemberCard(props : MemeberProps) {
    const { img, name, introduce } = props;
    return (
        <VStack
            align="flex-start"
            justify="flex-start"
            gap={SPACING.superTiny}
            style={{
                width : 200,
            }}
        >
            <img src={img} alt="" style={{width : 200, height : 200, objectFit : 'cover', borderRadius : SPACING.tiny}} />
            <p
                style={{
                    fontSize : FONTS.size.body,
                    fontWeight : FONTS.weight.w7,
                    color : COLORS.textPrimary,
                }}
            >{name}</p>
            <p
                style={{
                    fontSize : FONTS.size.small,
                    fontWeight : FONTS.weight.w3,
                    color : COLORS.textPrimary,
                }}
            >{introduce}</p>
        </VStack>
    )
}

// Mock data for BandProfilePage
export const mockBandIntroduceData: BandIntroducePageProps = {
  bandName: "test",
  introduce: "안녕하세요! 열정적인 음악을 사랑하는 밴드입니다. 다양한 장르의 음악을 즐기며, 대중들에게 즐거움을 전달하는 것을 목표로 하고 있습니다.",
  representativeImage: testImage,
  imgList: [
    testImage,
    testImage,
    testImage,
  ],
  memberList: [
    {
      img: testImage,
      name: "김보컬",
      introduce: "보컬을 맡고 있습니다. 감성적인 목소리로 여러분의 마음을 울리겠습니다."
    },
    {
      img: testImage,
      name: "이기타",
      introduce: "기타리스트입니다. 화려한 연주로 무대를 장식하겠습니다."
    },
    {
      img: testImage,
      name: "박드럼",
      introduce: "드러머입니다. 강력한 비트로 무대를 흔들어 놓겠습니다."
    },
    {
      img: testImage,
      name: "정베이스",
      introduce: "베이시스트입니다. 그루브 넘치는 연주로 무대를 완성시켜 나가겠습니다."
    }
  ]
};

export default function BandIntroducePage() {
    const { bandName, introduce, memberList, representativeImage, imgList } = mockBandIntroduceData;

    return (
        <VStack
            align="flex-start"
            justify="flex-start"
            gap={SPACING.medium}
            style={{
                width : "100vw",
                height : "100vh",
                overflowY : "auto",
                padding : `0 ${SPACING.medium}px`,
            }}
        >
            <Header/>
            <PageTitle title={bandName}/>
            <HStack
                align="flex-start"
                justify="flex-start"
                gap={SPACING.medium}
            >
                <img src={representativeImage} alt="" style={{width : 550, height : 300, objectFit : 'cover', borderRadius : SPACING.tiny}} />
                <VStack
                    align="flex-start"
                    justify="flex-start"
                    gap={SPACING.medium}
                    style={{
                        width : "100%",
                    }}
                >
                    <TitleAndText
                        title={'소개'}
                        titleSize={FONTS.size.title}
                        text={introduce}
                        textSize={FONTS.size.body}
                        gap={SPACING.small}
                        titleColor={COLORS.textPrimary}
                        textColor={COLORS.textSecond}
                    />
                    <VStack
                        align="flex-start"
                        justify="flex-start"
                        gap={SPACING.small}
                        style={{
                            width : "100%",
                        }}
                    >
                        <p>멤버소개</p>
                        <HStack
                            align="flex-start"
                            justify="flex-start"
                            gap={SPACING.medium}
                            style={{
                            width: "100%",
                            overflowX: "auto",
                            overflowY: "hidden",
                            flexWrap: "nowrap",  // 아이템이 줄바꿈되지 않도록
                            paddingBottom: SPACING.small, // 스크롤바가 잘리지 않도록
                        }}
                    >
                        {memberList.map((member) => (
                            <MemberCard
                                key={member.name}
                                img={member.img}
                                name={member.name}
                                introduce={member.introduce}
                            />
                        ))}
                    </HStack>
                </VStack>
            </VStack>
            </HStack>
            <VStack
                align="flex-start"
                justify="flex-start"
                gap={SPACING.tiny}
                style={{
                    width : "100%",
                }}
            >
                <p
                    style={{
                        fontSize : FONTS.size.title,
                        fontWeight : FONTS.weight.w7,
                        color : COLORS.textPrimary,
                    }}
                >공연 사진</p>
                <HStack
                    align="flex-start"
                    justify="flex-start"
                    gap={SPACING.medium}
                    style={{
                        width : "100%",
                    }}
                >
                    {imgList.map((img) => (
                        <img src={img} alt="" style={{width : 200, height : 200, objectFit : 'cover', borderRadius : SPACING.tiny}} />
                    ))}
                </HStack>
            </VStack>
        </VStack>
    )
}