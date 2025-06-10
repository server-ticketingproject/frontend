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
        // 로그인 처리 로직
        alert('로그인 성공!');
    };

    return (
        <div className={styles.container}>
            <img src={Logo} alt="Logo" className={styles.logo} />
            <form onSubmit={handleSubmit}>
                <div className={styles.loginBox}>
                    <div className={styles.inputGroup}>
                    <label htmlFor="email">이메일</label>
                    <input
                        id="email"
                        type="email"
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