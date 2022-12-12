import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const URL = `https://pre-onboarding-selection-task.shop`;

const TodoItem = ({ todoItem, setTodoList }) => {
  const [edited, setEdited] = useState(false);
  const [newText, setNewText] = useState(todoItem.todo);

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
    //여기서 axios요청이 이루어져야 함
    const access_token = localStorage.getItem('access_token');

    axios
      .put(
        `${URL}/todos/${todoItem.id}`,
        {
          isCompleted: todoItem.isCompleted,
          todo: newText,
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            'Content-Type': 'application/json',
          },
        }
      )
      .then((res) => {
        //겟요청
        if (res) {
          axios
            .get(`${URL}/todos`, {
              headers: {
                Authorization: `Bearer ${access_token}`,
              },
            })
            .then((res) => {
              console.log(res.data);
              setTodoList(res.data.reverse());
            });
        }
        setEdited(false);
      });
  };

  const handleCancel = () => {
    setNewText(todoItem.text);
    setEdited(false);
  };

  const handleRemove = () => {
    const access_token = localStorage.getItem('access_token');

    axios
      .delete(`${URL}/todos/${todoItem.id}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => {
        if (res) {
          console.log('성공');
          axios
            .get(`${URL}/todos`, {
              headers: {
                Authorization: `Bearer ${access_token}`,
              },
            })
            .then((res) => {
              setTodoList(res.data.reverse());
            });
        }
      });
  };

  const handleCheck = () => {
    const access_token = localStorage.getItem('access_token');

    axios
      .put(
        `${URL}/todos/${todoItem.id}`,
        {
          isCompleted: !todoItem.isCompleted,
          todo: todoItem.todo,
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            'Content-Type': 'application/json',
          },
        }
      )
      .then((res) => {
        if (res) {
          console.log('성공');
          axios
            .get(`${URL}/todos`, {
              headers: {
                Authorization: `Bearer ${access_token}`,
              },
            })
            .then((res) => {
              setTodoList(res.data.reverse());
            });
        }
      });
    // const editedTodoList = todoList.map((ele) => ({
    //   ...ele,
    //   isCompleted: ele.id === todoItem.id ? checked : ele.isCompleted,
    // }));
    // setTodoList(editedTodoList);
    // console.log(todoList);
  };

  return (
    <Container key={todoItem.id}>
      {todoItem.isCompleted ? (
        <button type={'checkbox'} onClick={handleCheck}>
          완료
        </button>
      ) : (
        <button type={'checkbox'} onClick={handleCheck}>
          미완료
        </button>
      )}
      {edited ? (
        <input
          value={newText}
          onChange={onChangeEditInput}
          ref={editInputRef}
        />
      ) : (
        <span className={todoItem.isCompleted ? 'check' : ''}>
          {todoItem.todo}
        </span>
      )}
      <div>
        {edited ? (
          <>
            <button onClick={handleConfirm}>제출</button>
            <button onClick={handleCancel}>취소</button>
          </>
        ) : (
          <button
            value={todoItem.id}
            onClick={handleEdit}
            className={todoItem.isCompleted ? 'none' : ''}
          >
            수정
          </button>
        )}
        {edited ? (
          ''
        ) : (
          <button
            onClick={handleRemove}
            value={todoItem.id}
            className={todoItem.isCompleted ? 'none' : ''}
          >
            삭제
          </button>
        )}
      </div>
    </Container>
  );
};

export default TodoItem;

const Container = styled.div`
  > span.check {
    text-decoration: line-through;
  }
  > div > button.none {
    display: none;
  }
`;
