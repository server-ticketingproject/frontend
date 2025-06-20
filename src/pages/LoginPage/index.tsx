import React, { useState } from 'react';
import styles from './style.module.css';
import COLORS from '../../styles/colors';
import Logo from '../../components/Logo/certain-logo.svg';
import axios from 'axios';

// 역할에 따라 로그인 URL 반환
const getLoginUrl = (role: string) => {
    // switch (role) {
    //     case 'performer':
    //         return 'http://127.0.0.1:8000/api/performer/login/';
    //     case 'stage_manager':
    //         return 'http://127.0.0.1:8000/api/stage_manager/login/';
    //     default:
    //         return 'http://127.0.0.1:8000/api/users/login/';
    // }
    return 'http://127.0.0.1:8000/api/users/login/';
};

const fetchProtectedData = () => {
    const token = localStorage.getItem('access_token');
    if (token) {
        axios.get('http://127.0.0.1:8000/api/protected-endpoint', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(response => {
            console.log('요청 성공:', response);
        })
        .catch(error => {
            console.error('요청 실패:', error);
            console.error('인증 실패: 권한이 없습니다.');
        });
    } else {
        console.error('토큰이 없습니다. 다시 로그인 해주세요.');
    }
};

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !password) {
            setError('이메일과 비밀번호를 입력해주세요.');
            return;
        }
        setError('');

        // 회원가입 시 저장한 role을 localStorage에서 꺼냄
        const role = localStorage.getItem('signup_role') || 'user';

        fetch(getLoginUrl(role), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: email, password }),
        })
        .then(async response => {
            if (!response.ok) {
                const data = await response.json();
                setError(data.detail || '로그인에 실패했습니다.');
                return;
            }
            const data = await response.json();
            localStorage.setItem('id', data.id); // 사용자 ID 저장
            console.log('로그인 성공:', data);

            // JWT 토큰을 localStorage에 저장
            localStorage.setItem('access_token', data.access);

            // 토큰이 정상적으로 저장되면 홈 페이지로 리다이렉트
            window.location.href = '/';
        })
        .catch(() => {
            setError('서버와의 통신에 실패했습니다.');
        });
    };

    return (
        <div className={styles.container}>
            <img src={Logo} alt="Logo" className={styles.logo} />
            <form onSubmit={handleSubmit}>
                <div className={styles.loginBox}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="email">닉네임</label>
                        <input
                            id="email"
                            type="text"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className={styles.input}
                            placeholder="닉네임을 입력하세요."
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="password">비밀번호</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className={styles.input}
                            required
                            placeholder="비밀번호를 입력하세요."
                        />
                    </div>
                </div>
                {error && <div className={styles.error}>{error}</div>}
                <div className={styles.signinPrompt}>
                    계정이 없으신가요?{' '}
                    <a href="/signin" className={styles.signinLink}>
                        회원가입
                    </a>
                </div>
                <button type="submit" className={styles.button} style={{background : COLORS.brandPrimary}}>
                    로그인
                </button>
            </form>
        </div>
    );
};

export default LoginPage;