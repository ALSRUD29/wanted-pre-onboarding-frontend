import { useRef, useState } from 'react';
import styled from 'styled-components';

const Todo = () => {
  const [text, setText] = useState('');
  const [todoList, setTodoList] = useState([]);
  const inputRef = useRef(null);
  // input 값 가져오기
  const handleChangeTodo = (e) => {
    setText(e.target.value);
  };

  const onPressSubmitButton = (e) => {
    e.preventDefault();
    // 빈문자열이거나 띄어쓰기만 있을 때는 추가 안됨.
    if (text.trim().length === 0) {
      return;
    }
    // todoItemList에 값 추가 //위에서부터 추가로 변경
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
    inputRef.current.focus();
  };

  const handleDelete = (e) => {
    setTodoList(todoList.filter((ele) => ele.id !== Number(e.target.value)));
  };

  return (
    <div>
      {/* ToDo Item을 추가할 수 있는 input 박스 */}
      <form onSubmit={onPressSubmitButton}>
        {/* 아이템 내용 입력 input */}
        <input
          value={text}
          ref={inputRef}
          placeholder="할 일을 입력해주세요"
          onChange={handleChangeTodo}
        />
        {/* 입력 후 아이템 추가 버튼 */}
        <button type="submit">추가</button>
      </form>

      <TodoList>
        {todoList.map((todoItem) => (
          <div key={todoItem.id}>
            <div>{todoItem.text}</div>
            <div>
              <button>수정</button>
              <button onClick={handleDelete} value={todoItem.id}>
                삭제
              </button>
            </div>
          </div>
        ))}
      </TodoList>
    </div>
  );
};

export default Todo;

const TodoList = styled.div`
  display: flex;
  flex-direction: column;
  > div {
    width: 235px;
    display: flex;
    justify-content: space-between;
  }
`;
