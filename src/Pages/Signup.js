import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

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
        let access_token = res.data.access_token;
        //   localStorage.setItem('access_token', access_token);
        if (access_token) {
          navigate('/');
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <Container>
      <div>원티드 프리온보딩 프론트엔드</div>
      <StyledSignupWrapper>
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
      </StyledSignupWrapper>
    </Container>
  );
};

export default Signup;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 5rem 10rem;
  background-color: rgb(58, 88, 255);
  border-radius: 1rem;
  color: white;
  > div {
    margin: 1rem;
  }
`;

const StyledSignupWrapper = styled.div`
  button {
    width: 100%;
    margin-top: 0.5rem;
  }
  > form > div {
    display: flex;
    justify-content: space-between;
  }
`;
