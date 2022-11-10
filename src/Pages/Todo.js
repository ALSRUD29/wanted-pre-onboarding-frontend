import { useRef, useState } from 'react';
import styled from 'styled-components';

const Todo = () => {
  const ref = useRef();
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);

  const handleChange = (e) => {
    setTodo(e.target.value);
  };
  const handleCreate = () => {
    if (todo === '') {
      return;
    }
    setTodos((current) => [todo, ...current]);
    setTodo('');
  };
  const handleUpdate = () => {};
  const handleRemove = (event) => {
    setTodos(todos.filter((ele) => ele !== todos[event.target.value]));
  };
  return (
    <Container>
      <h2>TodoList</h2>
      <div>
        <input value={todo} onChange={handleChange}></input>
        <button onClick={handleCreate}>추가</button>
      </div>
      <div>
        {todos.map((ele, index) => (
          <ListContainer key={index}>
            <div>
              <input type="checkbox"></input>
              <span key={index} ref={ref}>
                {ele}
              </span>
            </div>
            <div>
              <button onClick={handleUpdate}>수정</button>
              <button onClick={handleRemove} value={index}>
                삭제
              </button>
            </div>
          </ListContainer>
        ))}
      </div>
    </Container>
  );
};

export default Todo;

const Container = styled.div`
  padding: 20px;
  > div {
    > input {
      width: 400px;
      margin-bottom: 20px;
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
