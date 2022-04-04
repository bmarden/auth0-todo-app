import React from 'react';
import { TodosRecord } from '@/types/airtable';
import cn from 'classnames';
import { useTodosContext } from '@/contexts/TodosContext';

interface TodoProps {
  todo: TodosRecord;
}

const Todo = ({ todo }: TodoProps) => {
  const { updateTodo, deleteTodo } = useTodosContext();

  const handleToggleCompleted = async () => {
    const updatedFields = {
      ...todo.fields,
      completed: !todo.fields.completed,
    };
    const updatedTodo = { id: todo.id, fields: updatedFields };
    updateTodo(updatedTodo);
  };

  return (
    <li className="my-2 flex items-center rounded-lg bg-white py-2 px-2 shadow-lg">
      <input
        type="checkbox"
        name="completed"
        id={`${todo.id}-completed`}
        checked={todo.fields.completed}
        onChange={handleToggleCompleted}
        className="form-checkbox mr-2 rounded-sm"
      />
      <p className={cn({ 'line-through': todo.fields.completed }, 'flex-1 text-gray-800')}>
        {todo.fields.description}
      </p>
      <button
        type="button"
        className="rounded bg-red-500 py-1 px-2 text-sm text-white hover:bg-red-600"
        onClick={() => deleteTodo(todo.id)}>
        Delete
      </button>
    </li>
  );
};

export default Todo;
