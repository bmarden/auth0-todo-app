import { TodosRecord } from '@/types/airtable';
import { Dispatch, ReactNode, SetStateAction, useState, useContext } from 'react';
import { createCtx } from 'src/common/contexts/contextHelper';

interface Context {
  todos: TodosRecord[];
  setTodos: Dispatch<SetStateAction<TodosRecord[]>>;
  refreshTodos: () => void;
  updateTodo: (updatedTodo: TodosRecord) => void;
  deleteTodo: (id: string) => void;
  addTodo: (description: string) => void;
}

interface TodosProviderProps {
  children: ReactNode;
}

export const [useTodosContext, CurTodosProvider] = createCtx<Context>();

export const TodosProvider = ({ children }: TodosProviderProps) => {
  const [todos, setTodos] = useState<TodosRecord[]>([]);

  const refreshTodos = async () => {
    try {
      const res = await fetch('/api/get-todos');
      const latestTodos = await res.json();
      setTodos(latestTodos);
    } catch (err) {
      console.error(err);
    }
  };

  const addTodo = async (description: string) => {
    try {
      const res = await fetch('/api/create-todo', {
        method: 'POST',
        body: JSON.stringify({ description }),
        headers: { 'Content-Type': 'application/json' },
      });
      const newTodo = await res.json();
      setTodos((prevTodos) => {
        return [newTodo, ...prevTodos];
      });
    } catch (err) {
      console.error(err);
    }
  };

  const updateTodo = async (updatedTodo: TodosRecord) => {
    try {
      const res = await fetch('/api/update-todo', {
        method: 'PUT',
        body: JSON.stringify(updatedTodo),
        headers: { 'Content-Type': 'application/json' },
      });
      await res.json();
      setTodos((prevTodos) => {
        const existingTodos = [...prevTodos];
        const existingTodo = existingTodos.find((todo) => todo.id === updatedTodo.id);
        if (existingTodo == null) return existingTodos;

        existingTodo.fields = updatedTodo.fields;
        return existingTodos;
      });
    } catch (err) {}
  };

  const deleteTodo = async (id: string) => {
    try {
      await fetch('/api/delete-todo', {
        method: 'DELETE',
        body: JSON.stringify({ id }),
        headers: { 'Content-Type': 'application/json' },
      });

      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (error) {}
  };
  return (
    <CurTodosProvider
      value={{
        todos,
        setTodos,
        refreshTodos,
        updateTodo,
        deleteTodo,
        addTodo,
      }}>
      {children}
    </CurTodosProvider>
  );
};
