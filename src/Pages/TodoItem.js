import { useState } from 'react';

const TodoItem = ({ todoItem }) => {
  const [edited, setEdited] = useState(false);
  const [newText, setNewText] = useState(todoItem.text);

  const handleEdit = () => {
    setEdited(true);
  };
  const onChangeEditInput = (e) => {
    setNewText(e.target.value);
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
          <button>👌</button>
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
