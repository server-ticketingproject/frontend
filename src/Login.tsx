import { useEffect } from 'react';

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID as string;
const REDIRECT_URI = 'http://localhost:5173';

function parseAccessTokenFromHash() {
  const hash = window.location.hash;
  const params = new URLSearchParams(hash.replace('#', ''));
  return params.get('access_token');
}

function Login() {
  useEffect(() => {
    const token = parseAccessTokenFromHash();
    if (token) {
      console.log('Access Token:', token);

      // access_token을 localStorage에 저장
      localStorage.setItem('access_token', token);

      // Django 백엔드로 토큰 전달
      fetch('http://localhost:8000/api/auth/google/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log('백엔드 응답:', data);
          // 예: 메인 페이지로 이동하거나 유저 상태 저장
        })
        .catch((err) => {
          console.error('로그인 실패:', err);
        });

      // 해시 지우기 (보안 + 깔끔한 URL)
      window.history.replaceState(null, '', window.location.pathname);
    }
  }, []);

  const handleGoogleLogin = () => {
    const oauthUrl =
      `https://accounts.google.com/o/oauth2/v2/auth?` +
      `client_id=${CLIENT_ID}` +
      `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
      `&response_type=token` + // token을 바로 받는 implicit 방식
      `&scope=profile email` +
      `&state=random123`;

    window.location.href = oauthUrl;
  };

  return (
    <div>
      <h1>Google OAuth 로그인</h1>
      <button onClick={handleGoogleLogin}>Google 로그인</button>
    </div>
  );
}

export default Login;
