'use client';
import { useEffect, useState } from 'react';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function TodoList() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await fetch(`${API_URL}/api/todos`);
    const data = await res.json();
    setTodos(data);
  };
  const addTodo = (newTodo) => {
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = async (id) => {
    const todo = todos.find((todo) => todo._id === id);
    const updatedTodo = { ...todo, completed: !todo.completed };

    await fetch(`${API_URL}/api/todos/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTodo),
    });

    setTodos(todos.map((todo) => (todo._id === id ? updatedTodo : todo)));
  };

  const deleteTodo = async (id) => {
    await fetch(`${API_URL}/api/todos/${id}`, {
      method: 'DELETE',
    });

    setTodos(todos.filter((todo) => todo._id !== id));
  };

  return (
    <div>
       <TodoForm onAdd={addTodo} />
      {todos.map((todo) => (
        <TodoItem key={todo._id} todo={todo} onToggle={toggleTodo} onDelete={deleteTodo} />
      ))}
    </div>
  );
}