'use client';
import { useState } from 'react';
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function TodoForm({onAdd}) {
  const [title, setTitle] = useState('');

  const addTodo = async (title) => {
    const res = await fetch(`${API_URL}/api/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title }), 
    });
    const newTodo = await res.json();
    onAdd(newTodo);
    setTitle(''); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    addTodo(title);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter todo"
      />
      <button type="submit">Add Todo</button>
    </form>
  );
}