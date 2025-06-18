import { useState } from 'react';
import styles from './style.module.css';
import signUp from '../../features/signup'; 
import COLORS from '../../styles/colors';

export default function SigninPage() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    role: '',
    phone: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('회원가입 데이터:', formData);
    console.log('회원가입 요청을 보냅니다...');

    const data = signUp(formData); 
    //@ts-ignore
    if (data) {
      alert('회원가입이 완료되었습니다!');
      // 추가 동작(예: 리디렉션) 가능
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2>회원가입</h2>

        <label>
          닉네임
          <input
            type="text"
            autoComplete="off"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            placeholder="닉네임을 입력해주세요."
          />
        </label>

        <label>
          이메일
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="이메일을 입력해주세요."
          />
        </label>

        <label>
          비밀번호
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="비밀번호를 입력해주세요."
          />
        </label>

        <label>
          전화번호
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="전화번호를 입력해주세요."
          />
        </label>

        <label>
          역할
          <select name="role" value={formData.role} onChange={handleChange} required>
            <option value="">선택하세요.</option>
            <option value="performer">공연자</option>
            <option value="user">일반 사용자</option>
            <option value="stage_manager">무대 관리자</option>
          </select>
        </label>
        <div className={styles.loginPrompt}>
                계정이 없으신가요?{' '}
                <a href="/login" className={styles.loginLink}>
                    로그인
                </a>
        </div>
        <button type="submit" style={{background : COLORS.brandPrimary}}>가입하기</button>
      </form>
    </div>
  );
}
