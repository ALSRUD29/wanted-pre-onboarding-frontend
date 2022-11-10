import { useState } from 'react';
import styled from 'styled-components';

const Todo = () => {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);

  const handleChange = (e) => {
    setTodo(e.target.value);
  };
  const handleClick = () => {
    if (todo === '') {
      return;
    }
    setTodos((current) => [todo, ...current]);
    setTodo('');
  };
  return (
    <Container>
      <div>
        <input value={todo} onChange={handleChange}></input>
        <button onClick={handleClick}>추가</button>
      </div>
      <div>
        {todos.map((ele, index) => (
          <ListContainer key={index}>
            <div>
              <input type="checkbox"></input>
              <span key={index}>{ele}</span>
            </div>
            <div>
              <button>수정</button>
              <button>삭제</button>
            </div>
          </ListContainer>
        ))}
      </div>
    </Container>
  );
};

export default Todo;

const Container = styled.div`
  > div {
    > input {
      width: 400px;
    }
  }
`;

const ListContainer = styled.div`
  width: 450px;
  display: flex;
  justify-content: space-between;
  padding: 5px;
  > div {
    > input {
      margin-right: 15px;
    }
    > span {
      background-color: pink;
    }
  }
`;
