import { useState } from 'react';
import styled from 'styled-components';

const Login = () => {
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
  };
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
        <button disabled={disabled}>버튼</button>
      </form>
    </Container>
  );
};

export default Login;

const Container = styled.div`
  display: flex;
`;
