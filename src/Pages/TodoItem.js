import { useState } from 'react';

const TodoItem = ({ todoItem }) => {
  const [edited, setEdited] = useState(false);

  const handleEdit = () => {
    setEdited(true);
  };

  return (
    <div key={todoItem.id}>
      <input type="checkbox" />
      <span>{todoItem.text}</span>
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
