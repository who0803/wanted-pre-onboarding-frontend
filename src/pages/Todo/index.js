import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {getTodos, createTodo, updateTodo, deleteTodo} from '../../apis'

function Todo() {
  const [todos, setTodos] = useState([]); 
  const [newTodo, setNewTodo] = useState(''); 
  const [isEditMode, setIsEditMode] = useState(false);  
  const [modifiedTodo, setModifiedTodo] = useState(''); 
  const [modifiedTodoId, setModifiedTodoId] = useState(''); 
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('access_token')) navigate("/signin");
    else {
      const getData = async () => {
        const response = await getTodos();
        setTodos(response.data);
      }
      getData()
    }
  }, []);

  const handleCheckboxChange = async (id, isChecked) => {
    const updatedTodo = todos.find(todo => todo.id === id);
    updatedTodo.isCompleted = isChecked;
    const response = await updateTodo(id, updatedTodo);
    const updatedTodos = todos.map(todo => (todo.id === modifiedTodoId ? response.data : todo)); 
    setTodos(updatedTodos);
  };

  const handleAddButtonClick = async () => {  
    const response = await createTodo(newTodo);
    setTodos([...todos, response.data]);
    setNewTodo(''); 
  };

  const handleModifyButtonClick = (id, todo) => { 
    setIsEditMode(true);    
    setModifiedTodoId(id);  
    setModifiedTodo(todo);
  };

  const handleSubmitClick = async (isCompleted) => {
    if (modifiedTodo.trim() === '') {
      console.error('isCompleted should not be empty');
      return;
    }
    const updatedTodo = {
      todo: modifiedTodo,
      isCompleted,
    };
    const response = await updateTodo(modifiedTodoId, updatedTodo);
    const updatedTodos = todos.map(todo => (todo.id === modifiedTodoId ? response.data : todo)); 
    setTodos(updatedTodos);
    setIsEditMode(false);
    setModifiedTodo('');
    setModifiedTodoId('');
  };

  const handleCancelButtonClick = () => {
    setIsEditMode(false);
    setModifiedTodo('');
    setModifiedTodoId('');
  };
 
  const handleDeleteButtonClick = async (id) => {
    await deleteTodo(id);
    console.log(id)
    const updatedTodos = todos.filter(todo => todo.id !== id);  
    setTodos(updatedTodos);
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
        {todos?.map(todo => (
          <li key={todo.id}>
            {isEditMode && modifiedTodoId === todo.id ? (
              <div>
                <input
                  type="checkbox"
                  checked={todo.isCompleted}
                  onChange={e => handleCheckboxChange(todo.id, e.target.checked)}
                />
                <input
                  data-testid="modify-input"
                  value={modifiedTodo}
                  onChange={e => setModifiedTodo(e.target.value)}
                />
                <button data-testid="submit-button" onClick={e => handleSubmitClick(todo.isCompleted)}>
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
                  onClick={() => handleModifyButtonClick(todo.id, todo.todo)}
                >
                  수정
                </button>
                <button data-testid="delete-button" onClick={() => handleDeleteButtonClick(todo.id)}>
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