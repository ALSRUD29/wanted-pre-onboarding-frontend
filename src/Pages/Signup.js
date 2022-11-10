import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const URL = `https://pre-onboarding-selection-task.shop`;

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const disabled = !email.includes('@') || password.length < 8;

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const loginData = {
      email: email,
      password: password,
    };
    const loginConfig = {
      headers: { 'Content-Type': `application/json` },
    };

    axios
      .post(`${URL}/auth/signup`, loginData, loginConfig)
      .then((res) => {
        console.log(res);
        let access_token = res.data.access_token;
        //   localStorage.setItem('access_token', access_token);
        if (access_token) {
          navigate('/');
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">이메일</label>
          <input
            type="email"
            htmlFor="email"
            onChange={handleEmailChange}
          ></input>
        </div>
        <div>
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            htmlFor="password"
            onChange={handlePasswordChange}
          ></input>
        </div>
        <button disabled={disabled}>회원가입</button>
      </form>
    </div>
  );
};

export default Signup;
