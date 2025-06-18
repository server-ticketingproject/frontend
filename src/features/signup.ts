interface formData {
  username: string;
  email: string;
  password: string;
  phone: string;
  role: string;
}

export default function signIn(data : formData) {
  fetch('http://127.0.0.1:8000/api/users/signup/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('회원가입에 실패했습니다.');
            }
            return response.json();
        })
        .then(() => {
            alert('회원가입이 완료되었습니다!');
            
        })
        .catch(error => {
            alert(error.message);
        });
}
