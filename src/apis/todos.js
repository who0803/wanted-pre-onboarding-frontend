import axios from 'axios';

const getTodos = async () => {
  try {
    const response = await axios.get('https://www.pre-onboarding-selection-task.shop/todos', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    });
    return response;
  } catch (error) {
    console.error('Error fetching todos:', error);
  }
};

const createTodo = async (newTodo) => {
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
    return response;
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
    return response;
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
  } catch (error) {
    console.error('Error deleting todo:', error);
  }
};

export {getTodos, createTodo, updateTodo, deleteTodo}