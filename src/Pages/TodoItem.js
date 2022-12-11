import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const TodoItem = ({ todoItem, setTodoList, todoList }) => {
  const [edited, setEdited] = useState(false);
  const [newText, setNewText] = useState(todoItem.text);
  const [checked, setChecked] = useState(true);

  const handleEdit = () => {
    setEdited(true);
  };
  const onChangeEditInput = (e) => {
    setNewText(e.target.value);
  };

  const editInputRef = useRef();

  useEffect(() => {
    if (edited) {
      editInputRef.current.focus();
    }
  }, [edited]);

  const handleConfirm = () => {
    const editedTodoList = todoList.map((ele) => ({
      ...ele,
      text: ele.id === todoItem.id ? newText : ele.text,
    }));
    setTodoList(editedTodoList);
    setEdited(false);
  };

  const handleCancel = () => {
    setNewText(todoItem.text);
    setEdited(false);
  };

  const handleRemove = (id) => {
    console.log('id', id.target.value);
    setTodoList(todoList.filter((ele) => ele.id !== Number(id.target.value)));
  };

  const handleCheck = () => {
    setChecked(!checked);
    console.log('checked', checked);
    const editedTodoList = todoList.map((ele) => ({
      ...ele,
      checked: ele.id === todoItem.id ? checked : ele.checked,
    }));
    setTodoList(editedTodoList);
  };

  return (
    <Container key={todoItem.id}>
      <input type={'checkbox'} onClick={handleCheck} />
      {edited ? (
        <input
          value={newText}
          onChange={onChangeEditInput}
          ref={editInputRef}
        />
      ) : (
        <span className={todoItem.checked ? 'check' : ''}>{todoItem.text}</span>
      )}
      {checked ? (
        <div>
          {edited ? (
            <>
              <button onClick={handleConfirm}>제출</button>
              <button onClick={handleCancel}>취소</button>
            </>
          ) : (
            <button value={todoItem.id} onClick={handleEdit}>
              수정
            </button>
          )}
          {edited ? (
            ''
          ) : (
            <button onClick={handleRemove} value={todoItem.id}>
              삭제
            </button>
          )}
        </div>
      ) : (
        ''
      )}
    </Container>
  );
};

export default TodoItem;

const Container = styled.div`
  > span.check {
    text-decoration: line-through;
  }
`;
