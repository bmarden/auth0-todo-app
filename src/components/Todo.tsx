import { TodosRecord } from '@/types/airtable';
import React from 'react';
import cn from 'classnames';

interface TodoProps {
  todo: TodosRecord;
}

const Todo = ({ todo }: TodoProps) => {
  return (
    <li className="my-2 flex items-center rounded-lg bg-white py-2 px-2 shadow-lg">
      <input
        type="checkbox"
        name="completed"
        id={`${todo.id}-completed`}
        checked={todo.fields.completed}
        className="form-checkbox mr-2"
      />
      <p className={cn({ 'line-through': todo.fields.completed }, 'flex-1 text-gray-800')}>
        {todo.fields.description}
      </p>
      <button
        type="button"
        className="bg-red-500 py-1 text-sm text-white hover:bg-red-600 px-2 rounded">Delete</button>
    </li>
  );
};

export default Todo;
