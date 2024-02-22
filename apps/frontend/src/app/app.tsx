import axios from 'axios';
import { Todo } from '@nx-monorepo/shared-types';
import { useEffect, useState, useCallback, useRef } from 'react';

export function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const textInput = useRef<HTMLInputElement>(null);

  const getTodos = useCallback(async () => {
    const res = await axios.get<Todo[]>('http://localhost:3333/api');
    setTodos(res.data);
  }, []);

  const onAddTodo = useCallback(async () => {
    if (textInput.current) {
      const res = await axios.post<Todo>('http://localhost:3333/api', { text: textInput.current.value });
      getTodos();
      textInput.current.value = '';
    }
  }, [todos]);

  const onToggleTodo = useCallback(async (id: number) => {
    const todo = todos.find((todo) => todo.id === id);
    if (todo) {
      await axios.post(`http://localhost:3333/api/setDone`, { ...todo, done: !todo.done });
      getTodos();
    }
  }, [todos]);

  useEffect(() => {
    getTodos()
  }, []);

  return (
    <div>
      <h1>Welcome to frontend!</h1>
      <div>
        {todos.map((todo) => (
          <div key={todo.id}>
            <input type="checkbox" checked={todo.done} onChange={() => onToggleTodo(todo.id)} />
            {todo.text}
          </div>
        ))}
      </div>
      <div>
        <input type="text" ref={textInput}/>
      </div>
      <div>
        <button onClick={onAddTodo}>
          Add Todo
        </button>
      </div>
    </div>
  );
}

export default App;
