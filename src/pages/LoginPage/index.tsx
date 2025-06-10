import React, { useState } from 'react';
import styles from './style.module.css';
import COLORS from '../../styles/colors';
import Logo from '../../components/Logo/certain-logo.svg';
const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Replace with real authentication logic
        if (!email || !password) {
            setError('이메일과 비밀번호를 입력해주세요.');
            return;
        }
        setError('');
        fetch('http://127.0.0.1:8000/api/users/login/', {
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
            console.log('로그인 성공:', data);
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
                    <label htmlFor="email">이름</label>
                    <input
                        id="email"
                        type="text"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className={styles.input}
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