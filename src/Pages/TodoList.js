import { useState } from 'react';
import styled from 'styled-components';
import TodoItem from './TodoItem';

const TodoList = () => {
  const [text, setText] = useState('');
  const [todoList, setTodoList] = useState([]);

  // input 값 가져오기
  const handleChangeTodo = (e) => {
    setText(e.target.value);
  };

  const onClickAddButton = () => {
    // 빈문자열이거나 띄어쓰기만 있을 때는 추가 안됨.
    if (text.trim().length === 0) {
      console.log('빈문자');
      return;
    }
    // todoItemList에 값 추가 //위에서부터 추가로 변경
    //버전1
    setTodoList((current) => [
      {
        id: todoList.length,
        text,
        checked: false,
      },
      ...current,
    ]);

    // input 값 초기화 및 포커싱
    setText('');
  };

  return (
    <div>
      {/* ToDo Item을 추가할 수 있는 input 박스 */}
      {/* 아이템 내용 입력 input */}
      <input
        value={text}
        placeholder="할 일을 입력해주세요"
        onChange={handleChangeTodo}
      />
      {/* 입력 후 아이템 추가 버튼 */}
      <button onClick={onClickAddButton}>추가</button>
      {/* 입력 후 아이템 리스트 */}
      <StyledTodoList>
        {todoList.map((todoItem) => (
          <TodoItem todoItem={todoItem} key={todoItem.id} />
        ))}
      </StyledTodoList>
    </div>
  );
};

export default TodoList;

const StyledTodoList = styled.div`
  display: flex;
  flex-direction: column;
  > div {
    width: 235px;
    display: flex;
    justify-content: space-between;
  }
`;
