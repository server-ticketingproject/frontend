import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { post } from "../../feature/https";
import styled from "styled-components";

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 20px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 12px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: #dc3545;
  margin-top: 10px;
`;

const SuccessMessage = styled.div`
  color: #28a745;
  margin-top: 10px;
`;

interface ReservationData {
  name: string;
  phone: string;
  email: string;
  memberCount: number;
  request?: string;
}

export default function PerformReservePage() {
  const { encoded } = useParams();
  const navigate = useNavigate();
  const [performData, setPerformData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [formData, setFormData] = useState<ReservationData>({
    name: '',
    phone: '',
    email: '',
    memberCount: 1,
    request: ''
  });

  useEffect(() => {
    try {
      if (encoded) {
        const decoded = decodeURIComponent(atob(encoded));
        const data = JSON.parse(decoded);
        setPerformData(data);
      }
    } catch (e) {
      console.error("공연 데이터 디코딩 실패", e);
      setError("공연 정보를 불러오는데 실패했습니다.");
    }
  }, [encoded]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'memberCount' ? parseInt(value, 10) || 1 : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      // API 엔드포인트는 실제 백엔드에 맞게 수정해주세요
      await post('/api/reservations', {
        ...formData,
        performanceId: performData?.id,
        performanceTitle: performData?.title
      });
      
      setIsSuccess(true);
      // 3초 후 메인 페이지로 리다이렉트
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (err) {
      console.error('예약 중 오류 발생:', err);
      setError('예약 처리 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!performData) {
    return <Container>공연 정보를 불러오는 중입니다...</Container>;
  }
    
  return (
    <Container>
      <h1>{performData.title} 예약하기</h1>
      <p>날짜: {performData.date}</p>
      <p>장소: {performData.location}</p>
      
      {isSuccess ? (
        <SuccessMessage>
          예약이 완료되었습니다! 잠시 후 메인 페이지로 이동합니다...
        </SuccessMessage>
      ) : (
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="이름"
            required
          />
          <Input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="전화번호"
            required
          />
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="이메일"
            required
          />
          <div>
            <label>인원 수: </label>
            <select 
              name="memberCount" 
              value={formData.memberCount}
              onChange={handleChange}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                <option key={num} value={num}>{num}명</option>
              ))}
            </select>
          </div>
          <Input
            as="textarea"
            name="request"
            value={formData.request}
            onChange={handleChange}
            placeholder="요청사항 (선택사항)"
            rows={3}
          />
          
          {error && <ErrorMessage>{error}</ErrorMessage>}
          
          <Button type="submit" disabled={isLoading}>
            {isLoading ? '처리 중...' : '예약하기'}
          </Button>
        </Form>
      )}
    </Container>
  );
}