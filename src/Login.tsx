import { GoogleLogin } from '@react-oauth/google';

function Login() {
  const handleSuccess = async (credentialResponse : any) => {
    const { credential } = credentialResponse;

    const response = await fetch('http://localhost:8000/api/auth/google-login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id_token: credential }),
    });

    const data = await response.json();
    console.log('백엔드 응답:', data);
    localStorage.setItem('access_token', data.access_token);
  };

  return (
    <div>
      <h1>Google 로그인</h1>
      <GoogleLogin onSuccess={handleSuccess} onError={() => console.log('실패')} />
    </div>
  );
}

export default Login;
