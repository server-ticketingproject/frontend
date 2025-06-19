import { useState } from 'react';
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
    name: "오이스터즈 어게인",
    introduce: "오이스터즈 어게인은 2015년에 설립된 한국의 랜드로프밴드입니다.",
    memberList: [
      { img: testImage, name: "김보컬", introduce: "보컬을 맡고 있습니다." },
      { img: testImage, name: "이기타", introduce: "기타리스트입니다." },
      { img: testImage, name: "박드럼", introduce: "드러머입니다." },
      { img: testImage, name: "정베이스", introduce: "베이시스트입니다." }
    ],
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
    tags: []
  });
  const [tagInput, setTagInput] = useState('');

  const handleEditClick = () => {
    setOriginalData({ ...editableData });
    setIsEditMode(true);
  };

  // 프로필 저장: performer/profile로 name, introduce 전송
  const handleSave = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const payload = {
        name: editableData.name,
        introduce: editableData.introduce,
      };

      const response = await fetch('http://127.0.0.1:8000/api/performer/profile/', {
        method: 'POST', // 또는 'POST' (백엔드에 맞게)
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
    } catch (error) {
      alert('서버 에러 발생');
      console.error(error);
    }
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
      const formatDate = (str: string) => str.replace(/\./g, '-');
      const payload = {
        stage: "1",
        title: newPerformance.title,
        description: newPerformance.text,
        date: formatDate(newPerformance.when),
        tag_ids: Array.from(new Set(newPerformance.tags)),
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
          img: testImage
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

  return (
    <VStack align="center" justify="flex-start" gap={SPACING.medium} style={{ width: "100vw", height: "100vh", overflowY: "auto", padding: `${SPACING.medium}px` }}>
      <ProfileHeader />
      <HStack>
        <img src={editableData.img} alt={editableData.name} style={{ width: "100px", height: "100px", borderRadius: '50%' }} />
      </HStack>

      {isEditMode ? (
        <VStack gap={SPACING.small} style={{ width: '100%', maxWidth: '500px' }}>
          <Input value={editableData.name} onChange={(e) => handleInputChange('name', e.target.value)} placeholder="밴드 이름" />
          <TextArea value={editableData.introduce} onChange={(e) => handleInputChange('introduce', e.target.value)} placeholder="밴드 소개" rows={4} />
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