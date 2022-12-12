import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import TodoItem from './TodoItem';

const URL = `https://pre-onboarding-selection-task.shop`;
const TodoList = () => {
  const [text, setText] = useState('');
  const [todoList, setTodoList] = useState([]);
  useEffect(() => {
    const access_token = localStorage.getItem('access_token');

    axios
      .get(`${URL}/todos`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => {
        setTodoList(res.data.reverse());
      });
  }, []);

  const handleChangeTodo = (e) => {
    setText(e.target.value);
  };

  const onClickAddButton = async () => {
    if (text.trim().length === 0) {
      return;
    }
    const access_token = localStorage.getItem('access_token');

    await axios
      .post(
        `${URL}/todos`,
        { todo: text },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            'Content-Type': 'application/json',
          },
        }
      )
      .then((res) => {
        const newTodo = res.data;
        setTodoList((current) => [newTodo, ...current]);
        setText('');
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      onClickAddButton();
    }
  };

  return (
    <Container>
      <StyledInputWrapper>
        <input
          value={text}
          placeholder="할 일을 입력해주세요"
          onChange={handleChangeTodo}
          onKeyUp={handleEnter}
        />
        <button onClick={onClickAddButton}>추가</button>
      </StyledInputWrapper>
      <StyledTodoList>
        {todoList.map((todoItem) => (
          <TodoItem
            todoItem={todoItem}
            key={todoItem.id}
            todoList={todoList}
            setTodoList={setTodoList}
          />
        ))}
      </StyledTodoList>
    </Container>
  );
};

export default TodoList;

const Container = styled.div`
  width: 30rem;
  margin: 5rem 10rem;
`;

const StyledInputWrapper = styled.div`
  display: flex;
  flex-direction: row;

  > input {
    width: 100%;
  }
  margin-bottom: 1rem;
`;

const StyledTodoList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  > div {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
  }
`;
