import StageComponent from "../../components/PerfomrReservePage/Stage";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

export default function PerformReservePage() {
    const { encoded } = useParams();
    const [performData, setPerformData] = useState<any>(null);

    useEffect(() => {
        try {
            const decoded = decodeURIComponent(atob(encoded || ''));
            const data = JSON.parse(decoded);
            setPerformData(data);
        } catch (e) {
            console.error("공연 데이터 디코딩 실패", e);
        }
    }, [encoded]);
    
    return (
        <div>
            <StageComponent stageData={performData}/>
        </div>
    );
}