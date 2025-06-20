import { useEffect, useState } from "react";

export default function StageManagerPage() {
    const [stageData, setStageData] = useState<any>(null);

    useEffect(() => {
        try {
             const token = localStorage.getItem("access_token");
            if (!token) {
                console.error("No access token found.");
                return;
            }
            fetch('http://127.0.0.1:8000/api/users/profile/', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            })
                .then(res => res.ok ? res.json() : Promise.reject())
                .then(data => {
                    setStageData(data);
                    console.log("Stage data:", data);
                })
                .catch(error => {
                    console.error("Error fetching stage data:", error);
                });
        }
        catch (error) {
            console.error("Error fetching stage data:", error);
        }
    }, []);

    return (
        <div style={{
            maxWidth: 480,
            margin: "40px auto",
            background: "#fff",
            borderRadius: 16,
            boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
            padding: 32,
            fontFamily: "inherit"
        }}>
            <h2 style={{ marginBottom: 24, textAlign: "center", color: "#222" }}>스테이지 관리자 정보</h2>
            {stageData ? (
                <div>
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 16
                    }}>
                        {"stage_name" in stageData && (
                            <div>
                                <span style={{ fontWeight: 600, color: "#555" }}>이름: </span>
                                <span style={{ color: "#222" }}>{stageData.stage_name}</span>
                            </div>
                        )}
                        {"location" in stageData && (
                            <div>
                                <span style={{ fontWeight: 600, color: "#555" }}>위치: </span>
                                <span style={{ color: "#222" }}>{stageData.location}</span>
                            </div>
                        )}
                        {"capacity" in stageData && (
                            <div>
                                <span style={{ fontWeight: 600, color: "#555" }}>수용 인원: </span>
                                <span style={{ color: "#222" }}>{stageData.capacity}</span>
                            </div>
                        )}
                        {/* 기타 데이터도 자동으로 보여주기 */}
                        {Object.entries(stageData).map(([key, value]) => {
                            if (["stage_name", "location", "capacity", "id"].includes(key)) return null; // id는 표시하지 않음
                            return (
                                <div key={key}>
                                    <span style={{ fontWeight: 600, color: "#555" }}>{key}: </span>
                                    <span style={{ color: "#222" }}>{String(value)}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            ) : (
                <div style={{ textAlign: "center", color: "#888" }}>스테이지 정보를 불러오는 중...</div>
            )}
        </div>
    );
}