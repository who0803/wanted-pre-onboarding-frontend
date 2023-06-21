import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Todo() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [modifiedTodo, setModifiedTodo] = useState('');
  const [modifiedTodoId, setModifiedTodoId] = useState('');
  const [modifiedTodoIsCompleted, setModifiedTodoIsCompleted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('access_token')) navigate("/signin")
    getTodos();
  }, []);

  const getTodos = async () => {
    try {
      const response = await axios.get('https://www.pre-onboarding-selection-task.shop/todos', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const createTodo = async () => {
    try {
      const response = await axios.post(
        'https://www.pre-onboarding-selection-task.shop/todos',
        { todo: newTodo },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setTodos([...todos, response.data]);
      setNewTodo('');
    } catch (error) {
      console.error('Error creating todo:', error);
    }
  };

  const updateTodo = async (id, updatedTodo) => {
    try {
      const response = await axios.put(
        `https://www.pre-onboarding-selection-task.shop/todos/${id}`,
        updatedTodo,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            'Content-Type': 'application/json',
          },
        }
      );
      const updatedTodos = todos.map(todo => (todo.id === id ? response.data : todo));
      setTodos(updatedTodos);
      setIsEditMode(false);
      setModifiedTodo('');
      setModifiedTodoId('');
      setModifiedTodoIsCompleted(false);
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const deleteTodo = async id => {
    try {
      await axios.delete(`https://www.pre-onboarding-selection-task.shop/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      const updatedTodos = todos.filter(todo => todo.id !== id);
      setTodos(updatedTodos);
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleCheckboxChange = async (id, isChecked) => {
    const updatedTodo = todos.find(todo => todo.id === id);
    updatedTodo.isCompleted = isChecked;
    await updateTodo(id, updatedTodo);
  };

  const handleAddButtonClick = () => {
    createTodo();
  };

  const handleModifyButtonClick = (id, todo, isCompleted) => {
    setIsEditMode(true);
    setModifiedTodoId(id);
    setModifiedTodo(todo);
    setModifiedTodoIsCompleted(isCompleted);
  };

  const handleSubmitClick = async () => {
    if (modifiedTodo.trim() === '') {
      console.error('isCompleted should not be empty');
      return;
    }
    const updatedTodo = {
      todo: modifiedTodo,
      isCompleted: modifiedTodoIsCompleted,
    };
    await updateTodo(modifiedTodoId, updatedTodo);
  };

  const handleCancelButtonClick = () => {
    setIsEditMode(false);
    setModifiedTodo('');
    setModifiedTodoId('');
    setModifiedTodoIsCompleted(false);
  };

  return (
    <div>
      <div>
        <input
          data-testid="new-todo-input"
          value={newTodo}
          onChange={e => setNewTodo(e.target.value)}
        />
        <button data-testid="new-todo-add-button" onClick={handleAddButtonClick}>
          추가
        </button>
      </div>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {isEditMode && modifiedTodoId === todo.id ? (
              <div>
                <input
                  type="checkbox"
                  checked={modifiedTodoIsCompleted}
                  onChange={e => setModifiedTodoIsCompleted(e.target.checked)}
                />
                <input
                  data-testid="modify-input"
                  value={modifiedTodo}
                  onChange={e => setModifiedTodo(e.target.value)}
                />
                <button data-testid="submit-button" onClick={handleSubmitClick}>
                  제출
                </button>
                <button data-testid="cancel-button" onClick={handleCancelButtonClick}>
                  취소
                </button>
              </div>
            ) : (
              <div>
                <label>
                  <input
                    type="checkbox"
                    checked={todo.isCompleted}
                    onChange={e => handleCheckboxChange(todo.id, e.target.checked)}
                  />
                  {todo.todo}
                </label>
                <button
                  data-testid="modify-button"
                  onClick={() => handleModifyButtonClick(todo.id, todo.todo, todo.isCompleted)}
                >
                  수정
                </button>
                <button data-testid="delete-button" onClick={() => deleteTodo(todo.id)}>
                  삭제
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
export {Todo};