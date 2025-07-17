import { useState, useEffect } from 'react';
import { VStack } from "../../components/VStack";
import { SPACING } from "../../styles/spacing";
import { HStack } from "../../components/HStack";
import testImage from "../../assets/testBandImage.jpeg";
import ProfileHeader from "./profileHeader";
import Button from "../../components/Button";
import { FONTS } from "../../styles/fonts";
import TextArea from "../../components/TextArea";

// 간단한 Input 컴포넌트
const Input = ({
  value,
  onChange,
  placeholder,
  className = '',
  ...props
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  [key: string]: any;
}) => (
  <input
    type="text"
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className={`p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full ${className}`}
    {...props}
  />
);

interface BandMember {
  img: string;
  name: string;
  introduce: string;
}

interface Performance {
  id: string;
  title: string;
  when: string;
  text: string;
  where: string;
  tags: string[];
  img: string;
}

interface BandData {
  img: string;
  name: string;
  introduce: string;
  memberList: BandMember[];
  performances: Performance[];
  imgList: string[];
}

export default function BandProfilePage() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editableData, setEditableData] = useState<BandData>({
    img: testImage,
    name: "",
    introduce: "",
    memberList: [],
    performances: [],
    imgList: Array(6).fill(testImage)
  });
  const [originalData, setOriginalData] = useState<BandData>({ ...editableData });
  const [showPerformanceForm, setShowPerformanceForm] = useState(false);
  const [newPerformance, setNewPerformance] = useState<Omit<Performance, 'id' | 'img'>>({
    title: '',
    when: '',
    text: '',
    where: '',
    tags: [],
  });
  const [performData, setPerformData] = useState<any>();
  const [tagInput, setTagInput] = useState('');

  // performer/detail에서 프로필 정보 받아오기(GET)
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    // fetch('http://127.0.0.1:8000/api/performer/add/', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     ...(token && { Authorization: `Bearer ${token}` }),
    //   },
    // })
    //   .then(res => res.ok ? res.json() : Promise.reject())
    //   .then(data => {
    //     setEditableData(prev => ({
    //       ...prev,
    //       name: data.name || "",
    //       introduce: data.introduce || "",
    //       // 필요하다면 멤버, 이미지 등도 data에서 받아서 세팅
    //     }));
    //     setOriginalData(prev => ({
    //       ...prev,
    //       name: data.name || "",
    //       introduce: data.introduce || "",
    //     }));
    //     // performer id 저장 (업데이트/삭제용)
    //     setPerformerId(data.id);
    //     console.log("프로필 정보:", data);
    //   })
    //   .catch(() => {
    //     // 실패 시 기본값 유지
    //   });
      fetch('http://127.0.1:8000/api/users/profile', {
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      })
        .then(res => res.ok ? res.json() : Promise.reject())
        .then(data => {
          console.log("사용자 정보:", data);
          performerId && setPerformerId(data.id);
        })
        .catch(() => {
          // 실패 시 기본값 유지
        });
  }, []);

  // performer id 상태 추가
  const [performerId, setPerformerId] = useState<string | null>(null);

  // 프로필 저장: performer/detail/{id}로 name, introduce 전송(PUT)
  const handleSave = async () => {
    //@ts-ignore
    if (!performData.id) {
      alert('프로필 ID를 찾을 수 없습니다.');
      return;
    }
    try {
      const token = localStorage.getItem('access_token');
      console.log(token);
      const payload = {
        name: performData.name,
        introduce: performData.introduce,
      };  
      const performerIda = localStorage.getItem('performer_id');
      //@ts-ignore
      const response = await fetch(`http://127.0.0.1:8000/api/performer/update/${performerIda}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const err = await response.json();
        alert(err.detail || '프로필 저장 실패');
        return;
      }

      alert('프로필이 성공적으로 저장되었습니다!');
      setIsEditMode(false);
      setOriginalData({ ...editableData });
    } catch (error) {
      alert('서버 에러 발생');
      console.error(error);
    }
  };

  // 프로필 삭제: performer/detail/{id}로 DELETE
  const handleDelete = async () => {
    if (!performerId) {
      alert('프로필 ID를 찾을 수 없습니다.');
      return;
    }
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`http://127.0.0.1:8000/api/performer/detail/${performerId}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      if (!response.ok) {
        const err = await response.json();
        alert(err.detail || '프로필 삭제 실패');
        return;
      }

      alert('프로필이 삭제되었습니다.');
      // 삭제 후 원하는 동작(예: 메인 페이지 이동) 추가
    } catch (error) {
      alert('서버 에러 발생');
      console.error(error);
    }
  };

  const handleEditClick = () => {
    setOriginalData({ ...editableData });
    setIsEditMode(true);
  };

  const handleCancel = () => {
    setEditableData({ ...originalData });
    setIsEditMode(false);
  };

  const handleInputChange = (field: keyof BandData, value: string) => {
    setEditableData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleMemberChange = (index: number, field: keyof BandMember, value: string) => {
    setEditableData(prev => {
      const updated = [...prev.memberList];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, memberList: updated };
    });
  };

  const addNewMember = () => {
    setEditableData(prev => ({
      ...prev,
      memberList: [...prev.memberList, { img: testImage, name: '', introduce: '' }]
    }));
  };

  const removeMember = (index: number) => {
    setEditableData(prev => ({
      ...prev,
      memberList: prev.memberList.filter((_, i) => i !== index)
    }));
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!newPerformance.tags.includes(tagInput.trim())) {
        setNewPerformance(prev => ({
          ...prev,
          tags: [...prev.tags, tagInput.trim()]
        }));
      }
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setNewPerformance(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };

  const handleCreatePerformance = async () => {
    try {
      const token = localStorage.getItem('access_token');
      console.log(token);
      const formatDate = (str: string) => str.replace(/\./g, '-');
      const payload = {
        stage: "1",
        title: newPerformance.title,
        description: newPerformance.text,
        date: formatDate(newPerformance.when),
        where: newPerformance.where,
      };

      const response = await fetch("http://127.0.0.1:8000/api/events/create/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const err = await response.json();
        console.error("Failed:", err);
        alert("공연 생성 실패");
        return;
      }

      const result = await response.json();
      setEditableData(prev => ({
        ...prev,
        performances: [...prev.performances, {
          id: result.id || `${Date.now()}`,
          title: newPerformance.title,
          when: payload.date,
          text: newPerformance.text,
          where: newPerformance.where,
          tags: newPerformance.tags,
          img: testImage,
          start_time: "",
          end_time: "",
          tag_ids: [],
          stage: payload.stage,
        }]
      }));

      setNewPerformance({ title: '', when: '', text: '', where: '', tags: [] });
      setTagInput('');
      setShowPerformanceForm(false);
    } catch (err) {
      console.error("Error:", err);
      alert("서버 에러 발생");
    }
  };

  // 이미지 업로드 핸들러
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setEditableData(prev => ({
        ...prev,
        img: reader.result as string,
      }));
    };
    reader.readAsDataURL(file);
  };

  // 밴드 추가 폼 상태
  const [showAddBandForm, setShowAddBandForm] = useState(false);
  const [addBandData, setAddBandData] = useState({
    name: "",
    introduce: "",
    img: null as File | null,
    preview: "",
  });

  // 이미지 미리보기 핸들러
  const handleAddBandImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAddBandData(prev => ({ ...prev, img: file }));
    const reader = new FileReader();
    reader.onloadend = () => {
      setAddBandData(prev => ({ ...prev, preview: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  // 밴드 추가 요청
  const handleAddBand = async () => {
    if (!addBandData.name || !addBandData.introduce || !addBandData.img) {
      alert("모든 필드를 입력해주세요.");
      return;
    }
    try {
      const token = localStorage.getItem('access_token');
      const formData = new FormData();
      formData.append("name", addBandData.name);
      formData.append("introduce", addBandData.introduce);
      formData.append("img", addBandData.img);

      const response = await fetch("http://127.0.0.1:8000/api/performer/add/", {
        method: "POST",
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: formData,
      });

      if (!response.ok) {
        const err = await response.json();
        alert(err.detail || "밴드 추가 실패");
        return;
      }

      // 여기서 한 번만 await response.json() 호출!
      const perforsmData = await response.json();

      alert("밴드가 성공적으로 추가되었습니다!");
      setShowAddBandForm(false);
      setAddBandData({ name: "", introduce: "", img: null, preview: "" });
      setPerformData(perforsmData);

      console.log("밴드 추가 성공:", perforsmData);
      //@ts-ignore
      localStorage.setItem('performer_id', perforsmData.id); // 밴드 ID 저장
      // 필요하다면 밴드 목록 새로고침 등 추가
    } catch (error) {
      alert("서버 에러 발생");
      console.error(error);
    }
  };

  return (
    <VStack align="center" justify="flex-start" gap={SPACING.medium} style={{ width: "100vw", height: "100vh", overflowY: "auto", padding: `${SPACING.medium}px` }}>
      <ProfileHeader />

      {/* 밴드 추가 버튼 */}
      <Button onClick={() => setShowAddBandForm(true)} text="밴드 추가" fontSize={FONTS.size.body} />

      {/* 밴드가 추가되어 있으면 밴드 정보 표시 */}
      {performData && (
        <div style={{ width: '100%', maxWidth: 400, margin: '16px 0', padding: 16, border: '1px solid #e5e7eb', borderRadius: 8, background: '#fafbfc' }}>
          <h3 style={{ marginBottom: 8 }}>내 밴드 정보</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {performData.img && (
              <img src={typeof performData.img === "string" ? performData.img : URL.createObjectURL(performData.img)} alt="밴드 이미지" style={{ width: 60, height: 60, borderRadius: '50%', objectFit: 'cover' }} />
            )}
            <div>
              <div style={{ fontWeight: 'bold', fontSize: '1.1em' }}>{performData.name}</div>
              <div style={{ color: '#666', fontSize: '0.95em', marginTop: 4, whiteSpace: 'pre-line' }}>{performData.introduce}</div>
            </div>
          </div>
        </div>
      )}

      {/* 밴드 추가 폼 */}
      {showAddBandForm && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1200 }}>
          <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '10px', width: '90%', maxWidth: '400px' }}>
            <h3>새 밴드 추가</h3>
            <VStack gap={SPACING.small}>
              <input
                type="text"
                value={addBandData.name}
                onChange={e => setAddBandData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="밴드명"
                style={{ padding: 8, border: '1px solid #ccc', borderRadius: 4 }}
              />
              <TextArea
                value={addBandData.introduce}
                onChange={e => setAddBandData(prev => ({ ...prev, introduce: e.target.value }))}
                placeholder="소개글"
                rows={3}
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleAddBandImgChange}
                style={{ marginTop: 8 }}
              />
              {addBandData.preview && (
                <img src={addBandData.preview} alt="미리보기" style={{ width: 100, height: 100, borderRadius: '50%', objectFit: 'cover', marginTop: 8 }} />
              )}
              <HStack gap={SPACING.small} justify="flex-end">
                <Button onClick={() => setShowAddBandForm(false)} text="취소" fontSize={FONTS.size.body} />
                <Button onClick={handleAddBand} text="추가" fontSize={FONTS.size.body} />
              </HStack>
            </VStack>
          </div>
        </div>
      )}

      {isEditMode ? (
        <VStack gap={SPACING.small} style={{ width: '100%', maxWidth: '500px' }}>
          {/* <Input value={editableData.name} onChange={(e) => handleInputChange('name', e.target.value)} placeholder="밴드 이름" />
          <TextArea value={editableData.introduce} onChange={(e) => handleInputChange('introduce', e.target.value)} placeholder="밴드 소개" rows={4} /> */}
          <HStack gap={SPACING.small} justify="center">
            <Button onClick={handleSave} text="저장" fontSize={FONTS.size.body} />
            <Button onClick={handleCancel} text="취소" fontSize={FONTS.size.body} />
          </HStack>

          <div style={{ width: '100%', marginTop: '20px' }}>
            <h3>밴드 멤버</h3>
            {editableData.memberList.map((member, index) => (
              <VStack key={index} gap={SPACING.small} style={{ border: '1px solid #e5e7eb', padding: '15px', borderRadius: '8px', marginBottom: '10px' }}>
                <Input value={member.name} onChange={(e) => handleMemberChange(index, 'name', e.target.value)} placeholder="멤버 이름" />
                <TextArea value={member.introduce} onChange={(e) => handleMemberChange(index, 'introduce', e.target.value)} placeholder="멤버 소개" rows={2} />
                <Button onClick={() => removeMember(index)} text="멤버 삭제" fontSize={FONTS.size.small} />
              </VStack>
            ))}
            <Button onClick={addNewMember} text="+ 멤버 추가" fontSize={FONTS.size.body} />
          </div>
        </VStack>
      ) : (
        <VStack gap={SPACING.small} style={{ width: '100%', maxWidth: '500px' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{editableData.name}</h2>
          <p style={{ whiteSpace: 'pre-line', lineHeight: '1.6' }}>{editableData.introduce}</p>
          <div style={{ width: '100%', marginTop: '20px' }}>
            <h3>밴드 멤버</h3>
            <HStack gap={SPACING.medium} wrap="wrap" justify="flex-start">
              {editableData.memberList.map((member, index) => (
                <VStack key={index} gap={SPACING.small} style={{ alignItems: 'center', width: '200px', padding: '15px', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
                  <img src={member.img} alt={member.name} style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover' }} />
                  <h4>{member.name}</h4>
                  <p style={{ fontSize: '0.9em', textAlign: 'center', color: '#666', lineHeight: '1.4', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {member.introduce}
                  </p>
                </VStack>
              ))}
            </HStack>
          </div>
          <HStack gap={SPACING.small} justify="center" style={{ marginTop: '20px' }}>
            <Button onClick={handleEditClick} text="프로필 수정" fontSize={FONTS.size.body} />
            <Button onClick={() => setShowPerformanceForm(true)} text="공연 추가" fontSize={FONTS.size.body} />
          </HStack>
        </VStack>
      )}

      {showPerformanceForm && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', width: '90%', maxWidth: '500px', maxHeight: '90vh', overflowY: 'auto' }}>
            <h3>새 공연 추가</h3>
            <VStack gap={SPACING.small}>
              <Input value={newPerformance.title} onChange={(e) => setNewPerformance({ ...newPerformance, title: e.target.value })} placeholder="공연 제목" />
              <Input value={newPerformance.when} onChange={(e) => setNewPerformance({ ...newPerformance, when: e.target.value })} placeholder="예: 2025.06.30" />
              <Input value={newPerformance.where} onChange={(e) => setNewPerformance({ ...newPerformance, where: e.target.value })} placeholder="공연 장소" />
              <TextArea value={newPerformance.text} onChange={(e) => setNewPerformance({ ...newPerformance, text: e.target.value })} placeholder="공연 설명" rows={3} />
              <Input value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={handleAddTag} placeholder="태그 입력 후 엔터" />
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {newPerformance.tags.map(tag => (
                  <div key={tag} style={{ backgroundColor: '#f3f4f6', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    {tag}
                    <button onClick={() => handleRemoveTag(tag)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0 4px', color: '#6b7280' }}>×</button>
                  </div>
                ))}
              </div>
              <HStack gap={SPACING.small} justify="flex-end">
                <Button onClick={() => setShowPerformanceForm(false)} text="취소" fontSize={FONTS.size.body} />
                <Button onClick={handleCreatePerformance} text="추가" fontSize={FONTS.size.body} />
              </HStack>
            </VStack>
          </div>
        </div>
      )}
    </VStack>
  );
}