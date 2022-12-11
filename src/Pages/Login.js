import axios from 'axios';
import { useState } from 'react';
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
  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = {
      email: email,
      password: password,
    };
    const loginConfig = {
      headers: { 'Content-Type': `application/json` },
    };

    await axios
      .post(`${URL}/auth/signin`, loginData, loginConfig)
      .then((res) => {
        let access_token = res.data.access_token;
        if (access_token) {
          localStorage.setItem('access_token', access_token);
          navigate('/todo');
          window.location.reload(); //새로고침을 하지 않으면 navigate이동이 안됨
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSignup = () => {
    navigate('/signup');
  };

  return (
    <Container>
      <div>원티드 프리온보딩 프론트엔드</div>
      <StyledLoginWrapper>
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
      </StyledLoginWrapper>
      <StyledSignupWrapper>
        <div>아이디가 없으신가요?</div>
        <button onClick={handleSignup}>회원가입하러 가기</button>
      </StyledSignupWrapper>
    </Container>
  );
};

export default Login;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 5rem 10rem;
  background-color: rgb(58, 88, 255);
  border-radius: 1rem;
  > div {
    margin: 1rem;
    color: white;
  }
`;

const StyledLoginWrapper = styled.div`
  margin: 1rem 0;
  > form > div {
    display: flex;
    justify-content: space-between;
  }
  button {
    width: 100%;
    margin-top: 0.5rem;
  }
`;

const StyledSignupWrapper = styled.div`
  margin: 1rem 0;

  > div {
    text-align: center;
  }
  > button {
    width: 13rem;
    margin-top: 0.5rem;
  }
`;
