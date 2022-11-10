import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const URL = `https://pre-onboarding-selection-task.shop`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const disabled = !email.includes('@') || password.length < 8;
  const navigate = useNavigate();

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
      .post(`${URL}/auth/signin`, loginData, loginConfig)
      .then((res) => {
        console.log(res);
        let access_token = res.data.access_token;
        if (access_token) {
          localStorage.setItem('access_token', access_token);
          navigate('/todo');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSignup = () => {
    navigate('/signup');
  };

  useEffect(() => {
    console.log('로컬스토리지 토큰', localStorage.getItem('access_token'));
  }, []);

  return (
    <Container>
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
        <button disabled={disabled}>로그인</button>
      </form>
      <button onClick={handleSignup}>회원가입</button>
    </Container>
  );
};

export default Login;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
