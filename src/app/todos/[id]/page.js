'use client'; 
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function TodoDetails() {
  const [todo, setTodo] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      fetchTodo();
    }
  }, [id]);

  const fetchTodo = async () => {
    const res = await fetch(`/api/todos/${id}`);
    const data = await res.json();
    setTodo(data);
  };

  if (!todo) return <div>Loading...</div>;

  return (
    <div>
      <h2>{todo.title}</h2>
      <p>Completed: {todo.completed ? 'Yes' : 'No'}</p>
      <button onClick={() => router.back()}>Go Back</button>
    </div>
  );
}