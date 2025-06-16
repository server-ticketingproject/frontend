import Header from "../../components/Header";
import styles from "./style.module.css";
import testImage from "../../assets/testBandImage.jpeg"
import COLORS from "../../styles/colors";
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
    ]
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
                        <button className={styles.reserveButton} style={{background : COLORS.brandPrimary}}>예약하기</button>
                        <button className={styles.cancelButton} style={{background : COLORS.brandPrimary}}>취소하기</button>   
                    </div>
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