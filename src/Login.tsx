const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID as string;
const REDIRECT_URI = 'http://localhost:5173';

function Login() {
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
