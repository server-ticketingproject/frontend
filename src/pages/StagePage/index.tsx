import Header from "../../components/Header";
import styles from "./style.module.css";
import testImage from "../../assets/testBandImage.jpeg"
import COLORS from "../../styles/colors";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function StagePage() {
    const dummyPerformData = [
        {
          img: testImage,
          title: "밴드 전문 공연장",
          text: "홍대 근처의 여유로운 공연장 쾌적한 시설, 좋은 음향장비",
          when: "2023.12.01 ~ 2023.12.31",
          where: "서울시 용산구 청파동 12길",
          price: "무료",
        },
    ];

    const [showOverlay, setShowOverlay] = useState(false);
    return (
        <div>
            <Header/>
            <div className={styles.container}>
                <div className={styles.stageDetail}>
                    <div className={styles.preview}>
                        <img src={dummyPerformData[0].img} alt={dummyPerformData[0].title} className={styles.previewImg} />
                    </div>
                    <div className={styles.stageDescription}>
                        <h1 className={styles.stageTitle}>{dummyPerformData[0].title}</h1>
                        <p className={styles.stageText}>{dummyPerformData[0].text}</p>
                        <p className={styles.stageWhen}>일시 : {dummyPerformData[0].when}</p>
                        <p className={styles.stageWhere}>장소 : {dummyPerformData[0].where}</p>
                    </div>
                    <div className={styles.price}>
                        <p className={styles.stagePrice}>가격 : {dummyPerformData[0].price}</p>
                    </div>
                    <div className={styles.button}>
                        <button
                            className={styles.reserveButton}
                            style={{ background: COLORS.brandPrimary }}
                            onClick={() => setShowOverlay(true)}
                        >
                            예약하기
                        </button>
                        <button className={styles.chatButton} style={{ background: COLORS.brandPrimary }}>
                            채팅하기
                        </button>
                    </div>
                    {showOverlay && (
                        <div className={styles.overlay}>
                            <div className={styles.overlayContent}>
                                <Calendar
                                    className={styles.calendar}
                                />
                                <div className={styles.timePickerContainer}>
                                    <label className={styles.timePickerLabel}>시간 선택:</label>
                                    <div className={styles.timePicker}>
                                        <input
                                            type="time"
                                            id="reservation-start-time"
                                            className={styles.timePickerInput}
                                        />
                                        <span>~</span>
                                        <input
                                            type="time"
                                            id="reservation-end-time"
                                            className={styles.timePickerInput}
                                        />
                                    </div>
                                </div>
                                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                    <div style={{ display: "flex", gap: "8px" }}>
                                        <button onClick={() => setShowOverlay(false)} style={{ background: COLORS.brandPrimary }}>닫기</button>
                                        <button
                                            onClick={() => {
                                                const startInput = document.getElementById("reservation-start-time") as HTMLInputElement;
                                                const endInput = document.getElementById("reservation-end-time") as HTMLInputElement;
                                                if (!startInput.value || !endInput.value) {
                                                    alert("시작 시간과 종료 시간을 모두 선택해주세요.");
                                                    return;
                                                }
                                                if (startInput.value >= endInput.value) {
                                                    alert("시작 시간은 종료 시간보다 빨라야 합니다.");
                                                    return;
                                                }
                                                alert(`예약이 완료되었습니다. (${startInput.value} ~ ${endInput.value})`);
                                                setShowOverlay(false);
                                            }}
                                            style={{ background: COLORS.brandPrimary }}
                                        >
                                            예약하기
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className={styles.stageInside}>
                    <h2 className={styles.stageInsideTitle}>공연장 내부 사진</h2>
                    <div className={styles.stageInsideImages}>
                        <img src={dummyPerformData[0].img} alt="Stage Inside 1" className={styles.stageInsideImage} />
                        <img src={dummyPerformData[0].img} alt="Stage Inside 2" className={styles.stageInsideImage} />
                        <img src={dummyPerformData[0].img} alt="Stage Inside 3" className={styles.stageInsideImage} />
                        <img src={dummyPerformData[0].img} alt="Stage Inside 3" className={styles.stageInsideImage} />
                        <img src={dummyPerformData[0].img} alt="Stage Inside 3" className={styles.stageInsideImage} />
                        <img src={dummyPerformData[0].img} alt="Stage Inside 3" className={styles.stageInsideImage} />

                    </div>
                </div>
            </div>
        </div>
    );
}   