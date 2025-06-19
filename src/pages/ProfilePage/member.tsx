import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { VStack } from "../../components/VStack";
import { HStack } from "../../components/HStack";
import { SPACING } from "../../styles/spacing";
import { FONTS } from "../../styles/fonts";
import testImage from "../../assets/testBandImage.jpeg";
import ProfileHeader from "./profileHeader";
import MyperformsCard from "../../components/MainPage/Myperforms/card";
import TitleAndText from "../../components/TitleAndText";
import COLORS from "../../styles/colors";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Modal from "../../components/Modal";

export default function MemberPage() {
    const navigate = useNavigate();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editedUser, setEditedUser] = useState({
        id: '',
        username: '',
        email: '',
        phone: '',
    });
    const [performanceList, setPerformanceList] = useState<any[]>([]);

    // 로그인 시 받은 토큰에서 사용자 정보와 예약 공연 정보 불러오기
    useEffect(() => {
        // 예시: localStorage에 저장된 사용자 정보와 예약 공연 정보 사용
        const userData = JSON.parse(localStorage.getItem('user') || '{}');
        setEditedUser({
            id: userData.id || '',
            username: userData.username || '',
            email: userData.email || '',
            phone: userData.phone || '',
        });

        // 예약 공연 정보도 localStorage에서 불러오기 (예: 'reserved_performances')
        const reserved = JSON.parse(localStorage.getItem('reserved_performances') || '[]');
        setPerformanceList(reserved);
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedUser(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = () => {
        // 실제로는 API 호출 필요
        localStorage.setItem('user', JSON.stringify(editedUser));
        setIsEditModalOpen(false);
    };

    return (
        <VStack
            align="center"
            justify="center"
            gap={SPACING.medium}
            style={{
                width : "100vw",
                height : "100vh",
                overflowY : "auto",
                padding : `${SPACING.medium}px`,
            }}
        >
            <ProfileHeader/>
            <VStack
                align="flex-start"
                justify="flex-start"
                gap={SPACING.medium}
                style={{
                    width : 600,
                    height : 900,
                    padding : SPACING.medium,
                }}
            >
                <div style={{ width: '100%' }}>
                    <HStack 
                        justify="space-between" 
                        align="center" 
                        style={{ width: '100%' }}
                    >
                        <TitleAndText
                            title="username"
                            titleSize={FONTS.size.title}
                            text={editedUser.username}
                            textSize={FONTS.size.body}
                            gap={SPACING.tiny}
                        />
                        <div style={{ marginLeft: 'auto' }}>
                            {/* <Button 
                                onClick={() => setIsEditModalOpen(true)}
                                text="수정하기"
                                fontSize={14}
                                paddingVertical={8}
                                paddingHorizontal={16}
                            /> */}
                        </div>
                    </HStack>
                </div>
                <TitleAndText
                    title="email"
                    titleSize={FONTS.size.title}
                    text={editedUser.email}
                    textSize={FONTS.size.body}
                    gap={SPACING.tiny}
                />
                <TitleAndText
                    title="phone"
                    titleSize={FONTS.size.title}
                    text={editedUser.phone}
                    textSize={FONTS.size.body}
                    gap={SPACING.tiny}
                />
                <VStack>
                <VStack
                    align="flex-start"
                    justify="flex-start"
                    gap={SPACING.tiny}
                    style={{
                        width : 600,
                        height : 600,
                    }}
                >
                    <p
                        style={{
                            fontSize : FONTS.size.title,
                            fontWeight : FONTS.weight.w7,
                            color : COLORS.textPrimary,
                            zIndex : 1,
                        }}
                    >내가 예약한 공연 목록</p>
                    {performanceList.length > 0 ? (
                        performanceList.map((performance) => (
                            <MyperformsCard
                                key={performance.id}
                                title={performance.title}
                                when={performance.when}
                                where={performance.where}
                                img={performance.img || testImage}
                            />
                        ))
                    ) : (
                        <p style={{ color: COLORS.textThird }}>예약한 공연이 없습니다.</p>
                    )}
                </VStack>
            </VStack>
            </VStack>
            
            <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
                <VStack gap={SPACING.medium} style={{ padding: SPACING.medium, width: '400px' }}>
                    <h2 style={{ margin: 0 }}>프로필 수정</h2>
                    
                    <VStack gap={SPACING.small} style={{ width: '100%' }}>
                        <label>이름</label>
                        <Input
                            name="username"
                            value={editedUser.username}
                            onChange={handleInputChange}
                            style={{ width: '100%' }}
                        />
                    </VStack>
                    
                    <VStack gap={SPACING.small} style={{ width: '100%' }}>
                        <label>이메일</label>
                        <Input
                            name="email"
                            type="email"
                            value={editedUser.email}
                            onChange={handleInputChange}
                            style={{ width: '100%' }}
                        />
                    </VStack>
                    
                    <VStack gap={SPACING.small} style={{ width: '100%' }}>
                        <label>전화번호</label>
                        <Input
                            name="phone"
                            value={editedUser.phone}
                            onChange={handleInputChange}
                            style={{ width: '100%' }}
                        />
                    </VStack>
                    
                    <HStack gap={SPACING.small} justify="flex-end" style={{ width: '100%', marginTop: SPACING.medium }}>
                        <Button 
                            onClick={() => setIsEditModalOpen(false)}
                            text="취소"
                            fontSize={14}
                            paddingVertical={8}
                            paddingHorizontal={16}
                        />
                        <Button 
                            onClick={handleSave}
                            text="저장"
                            fontSize={14}
                            paddingVertical={8}
                            paddingHorizontal={16}
                        />
                    </HStack>
                </VStack>
            </Modal>
        </VStack>
    )
}