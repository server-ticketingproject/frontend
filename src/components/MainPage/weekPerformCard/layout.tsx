import { useState } from 'react';
import WeekPerformCard from "./card";
import { VStack } from "../../VStack";
import { HStack } from "../../HStack";
import { SPACING } from "../../../styles/spacing";
import { FONTS } from "../../../styles/fonts";
import COLORS from "../../../styles/colors";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Performance } from "../../../interface/perfromance.ts"

interface WeekPerformCardLayoutProps {
    performances : Performance[];
}

export default function WeekPerformCardLayout({ performances }: WeekPerformCardLayoutProps) {
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
      }}>이주의 공연들</p>

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
    );
}