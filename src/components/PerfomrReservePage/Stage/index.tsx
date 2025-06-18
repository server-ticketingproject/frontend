import { useState } from 'react';
import styled from 'styled-components';
import COLORS from "../../../styles/colors";
import { SPACING } from '../../../styles/spacing';
import { FONTS } from '../../../styles/fonts';
import Button from '../../Button';

declare module 'styled-components' {
  export interface DefaultTheme {}
}

interface StageProps {
  stageList?: StageList[];
  onSeatSelect?: (seatId: string) => void;
}

interface StageList {
  id: string;
  isSelected: boolean;
  isAvailable?: boolean;
}

const StageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
`;

const Stage = styled.div`
  width: 80%;
  height: 60px;
  background-color: ${COLORS.brandPrimary};
  color: ${COLORS.textInvert};
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  margin-bottom: 20px;
  border-radius: 4px;
`;

const SeatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(15, 1fr);
  gap: 8px;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
`;

const Seat = styled.div<{ $isSelected: boolean; $isAvailable: boolean }>`
  width: 30px;
  height: 30px;
  border-radius: 4px;
  background-color: ${(props: { $isAvailable: boolean; $isSelected: boolean }) => 
    !props.$isAvailable ? '#cccccc' : 
    props.$isSelected ? COLORS.brandPrimary : '#f0f0f0'};
  cursor: ${(props: { $isAvailable: boolean }) => (props.$isAvailable ? 'pointer' : 'not-allowed')};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 10px;
  user-select: none;
  transition: background-color 0.2s;

  &:hover {
    opacity: ${(props: { $isAvailable: boolean }) => (props.$isAvailable ? 0.8 : 1)};
  }
`;

const RowLabel = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
  font-weight: bold;
  min-width: 20px;
`;



const SeatsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

interface StageProps {
  stageData: any;
}

export default function StageComponent({ 
  stageList = [],
  onSeatSelect ,
  stageData, //여기로 base64 인코딩된 값 들어오니깐, 이거 디코딩해서 저장하셈
}: StageProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState('a6'); // Default to a6 as initially selected

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSeat('');
  };

  const handleConfirm = () => {
    console.log(`Confirmed selection for seat ${selectedSeat}`);
    closeModal();
    //여기다가 내 예약한 그거 추가하는거 추가
  };
  
  const [seats, setSeats] = useState<StageList[]>(() => {
    // If stageList is provided, use it, otherwise create default seats
    if (stageList.length > 0) {
      return stageList;
    }
    
    // Create default seats from a1 to o7
    const defaultSeats: StageList[] = [];
    const rows = 7;
    const columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o'];
    
    for (let row = 1; row <= rows; row++) {
      for (const col of columns) {
        const seatId = `${col}${row}`;
        defaultSeats.push({
          id: seatId,
          isSelected: seatId === 'a6', // Set a6 as selected by default
          isAvailable: true,
        });
      }
    }
    return defaultSeats;
  });

  const handleSeatClick = (seatId: string) => {
    setSeats(prevSeats => 
      prevSeats.map(seat => 
        seat.id === seatId 
          ? { ...seat, isSelected: !seat.isSelected } 
          : seat
      )
    );
    
    if (onSeatSelect) {
      onSeatSelect(seatId);
    }
  };

  // Group seats by row
  const seatsByRow: {[key: number]: StageList[]} = {};
  seats.forEach(seat => {
    const row = parseInt(seat.id.substring(1));
    if (!seatsByRow[row]) {
      seatsByRow[row] = [];
    }
    seatsByRow[row].push(seat);
  });

  return (
    <>
    <StageContainer>
      <Stage>무대</Stage>
      
      {/* <ColumnLabels>
        <div></div>
        {columns.map(col => (
          <ColumnLabel key={col}>{col.toUpperCase()}</ColumnLabel>
        ))}
      </ColumnLabels> */}
      
      <SeatsContainer>
        {Object.entries(seatsByRow).map(([row, rowSeats]) => (
          <div key={row} style={{ display: 'flex', alignItems: 'center' }}>
            <RowLabel>{row}</RowLabel>
            <SeatsGrid>
              {rowSeats.map(seat => (
                <Seat
                  key={seat.id}
                  $isSelected={seat.isSelected}
                  $isAvailable={seat.isAvailable !== false}
                  onClick={() => seat.isAvailable !== false && handleSeatClick(seat.id)}
                >
                  {seat.id}
                </Seat>
              ))}
            </SeatsGrid>
          </div>
        ))}
      </SeatsContainer>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: SPACING.medium }}>
        <Button
            onClick={() => {setIsModalOpen(true)}}
            text="예약"
            paddingVertical={SPACING.medium}
            paddingHorizontal={SPACING.huge}
            fontSize={FONTS.size.body}
        />  
      </div>
    </StageContainer>
    {isModalOpen && (
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1000,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px'
        }}
        onClick={closeModal}
      >
        <div 
          style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '32px',
            width: '100%',
            maxWidth: '400px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)'
          }}
          onClick={e => e.stopPropagation()}
        >
          <p style={{
            fontSize: FONTS.size.title,
            fontWeight: 600,
            marginBottom: SPACING.medium,
            textAlign: 'center',
            marginTop: 0
          }}>
            선택한 좌석
          </p>
          <div style={{
            textAlign: 'center',
            marginBottom: SPACING.medium,
            minHeight: '24px',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '8px'
          }}>
            {seats.filter(seat => seat.isSelected).length > 0 ? (
              seats
                .filter(seat => seat.isSelected)
                .map(seat => (
                  <span 
                    key={seat.id}
                    style={{
                      display: 'inline-block',
                      padding: '4px 8px',
                      backgroundColor: COLORS.brandPrimary,
                      color: 'white',
                      borderRadius: '4px',
                      fontSize: FONTS.size.body,
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {seat.id}
                  </span>
                ))
            ) : (
              <span style={{ color: COLORS.textSecond }}>선택된 좌석이 없습니다</span>
            )}
          </div>
          <p style={{
            fontSize: FONTS.size.body,
            textAlign: 'center',
            marginBottom: SPACING.medium,
            marginTop: SPACING.medium
          }}>
            예약하시겠습니까?
          </p>
          
          <div style={{
            display: 'flex',
            gap: SPACING.medium,
            marginTop: SPACING.huge,
            justifyContent: 'center'
          }}>
            <Button
              onClick={() => closeModal()}
              text="취소"
              paddingVertical={SPACING.medium}
              paddingHorizontal={SPACING.huge}
              fontSize={FONTS.size.body}
            />
            <Button
              onClick={() => handleConfirm()}
              text="확인"
              paddingVertical={SPACING.medium}
              paddingHorizontal={SPACING.huge}
              fontSize={FONTS.size.body}
            />
          </div>
        </div>
      </div>
    )}
  </>
);
}
