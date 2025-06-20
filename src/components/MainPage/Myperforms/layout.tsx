import { useEffect, useState } from "react";
import { VStack } from "../../VStack";
import { SPACING } from "../../../styles/spacing";
import COLORS from "../../../styles/colors";
import MyperformsCard from "./card";
import { FONTS } from "../../../styles/fonts";

export default function MyperformsLayout() {
    const [username, setUsername] = useState('회원');
    const [reserved, setReserved] = useState<any[]>([]);

    useEffect(() => {
        // users/profile에서 username 받아오기
        fetch('http://127.0.0.1:8000/api/users/profile/', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
        })
            .then(res => res.ok ? res.json() : Promise.reject())
            .then(data => {
                if (data && data.username) setUsername(data.username);
            })
            .catch(() => setUsername('회원'));

        // 예약 공연 정보는 기존대로 localStorage에서 불러오기
        const reservedList = JSON.parse(localStorage.getItem('reserved_performances') || '[]');
        setReserved(reservedList);
    }, []);

    return (
        <VStack
            align="flex-start"
            justify="flex-start"
            gap={SPACING.small}
            style={{
                width : 370,
                height : 370,
                padding : SPACING.small,
                backgroundColor : COLORS.textInvert,
                border : `1px solid ${COLORS.border}`,
                borderRadius : SPACING.medium,
            }}
        >
            <p
                style={{
                    fontWeight : FONTS.weight.w7,
                    fontSize : FONTS.size.head,
                }}
            >
                <span style={{ color: COLORS.brandPrimary }}>{username}</span>님의 <br />공연 예약 내용은 다음과 같습니다.
            </p>
            {reserved.length > 0 ? (
                reserved.map((item: any, idx: number) => (
                    <MyperformsCard
                        key={idx}
                        title={item.title}
                        when={item.when}
                        where={item.where}
                        img={item.img}
                    />
                ))
            ) : (
                <p style={{ color: COLORS.textThird, fontSize: FONTS.size.body }}>
                    예약한 공연이 없습니다.
                </p>
            )}
        </VStack>
    );
}