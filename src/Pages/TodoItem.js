import { useState } from 'react';

const TodoItem = ({ todoItem, setTodoList, todoList }) => {
  const [edited, setEdited] = useState(false);
  const [newText, setNewText] = useState(todoItem.text);

  const handleEdit = () => {
    setEdited(true);
  };
  const onChangeEditInput = (e) => {
    setNewText(e.target.value);
  };

  const handleConfirm = () => {
    const editedTodoList = todoList.map((ele) => ({
      ...ele,
      text: ele.id === todoItem.id ? newText : ele.text,
    }));
    setTodoList(editedTodoList);
    setEdited(false);
  };

  return (
    <div key={todoItem.id}>
      <input type="checkbox" />
      {edited ? (
        <input value={newText} onChange={onChangeEditInput} />
      ) : (
        <span>{todoItem.text}</span>
      )}
      <div>
        {edited ? (
          <button onClick={handleConfirm}>👌</button>
        ) : (
          <button value={todoItem.id} onClick={handleEdit}>
            수정
          </button>
        )}
        <button>삭제</button>
      </div>
    </div>
  );
};

export default TodoItem;
