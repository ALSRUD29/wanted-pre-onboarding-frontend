import styled from 'styled-components';

const Login = () => {
  return (
    <Container>
      <form>
        <div>
          <label htmlFor="email">이메일</label>
          <input type="email" htmlFor="email"></input>
        </div>
        <div>
          <label htmlFor="password">비밀번호</label>
          <input type="password" htmlFor="password"></input>
        </div>
        <button>버튼</button>
      </form>
    </Container>
  );
};

export default Login;

const Container = styled.div`
  display: flex;
`;
