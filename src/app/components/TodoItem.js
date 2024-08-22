const TodoItem = ({ todo, onToggle, onDelete }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0' }}>
      <span
        onClick={() => onToggle(todo._id)}
        style={{ textDecoration: todo.completed ? 'line-through' : 'none', cursor: 'pointer' }}
      >
        {todo.title}
      </span>
      <button onClick={() => onDelete(todo._id)}>Delete</button>
    </div>
  );
};

export default TodoItem;