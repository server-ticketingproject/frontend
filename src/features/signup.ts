interface FormData {
  username: string;
  email: string;
  password: string;
  phone: string;
  role: string;
  access: string;
}

export default function signUp(data: FormData) {
  fetch('http://127.0.0.1:8000/api/users/signup/', {
    method: 'POST',
    headers: {  
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: data.username,
      email: data.email,
      password: data.password,
      phone: data.phone,
      role: data.role || 'user', // 기본 역할은 'user'
        access: data.access || 'saadsdsadasadsdsa',
    }),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('회원가입에 실패했습니다.');
      }
      return response.json();
    })
    .then(() => {
      alert('회원가입이 완료되었습니다!');
      console.log('회원가입 성공:', data);
    })
    .catch(error => {
      alert(error.message);
    });
}
