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
        console.log('리스트받아오기', res.data);
        setTodoList(res.data.reverse());
      });
  }, []);

  // input 값 가져오기
  const handleChangeTodo = (e) => {
    setText(e.target.value);
  };

  const onClickAddButton = async () => {
    // 빈문자열이거나 띄어쓰기만 있을 때는 추가 안됨.
    if (text.trim().length === 0) {
      return;
    }
    const access_token = localStorage.getItem('access_token');
    console.log(access_token);

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
        console.log(res.data);
        const newTodo = res.data;
        setTodoList((current) => [newTodo, ...current]);
        console.log(todoList);
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
      {/* ToDo Item을 추가할 수 있는 input 박스 */}
      {/* 아이템 내용 입력 input */}
      <StyledInputWrapper>
        <input
          value={text}
          placeholder="할 일을 입력해주세요"
          onChange={handleChangeTodo}
          onKeyUp={handleEnter}
        />
        {/* 입력 후 아이템 추가 버튼 */}
        <button onClick={onClickAddButton}>추가</button>
      </StyledInputWrapper>
      {/* 입력 후 아이템 리스트 */}
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
