/* eslint-disable @next/next/no-img-element */
import type { InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import NavBar from '@/nav/NavBar';
import { table, minifyRecords } from '@/api/utils/Airtable';
import Todo from '@/todos/Todo';
import { TodosRecord } from '@/types/airtable';
import { useTodosContext } from '@/contexts/TodosContext';
import { Fragment, useEffect } from 'react';
import NavDropdown from '@/nav/NavDropdown';
import { Menu, Transition } from '@headlessui/react';

const Home = ({ initialTodos }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { todos, setTodos } = useTodosContext();
  // set initialTodos to in memory todos

  useEffect(() => {
    if (initialTodos != null) {
      setTodos(initialTodos);
    }
  }, [initialTodos, setTodos]);

  return (
    <div>
      <Head>
        <title>Auth0 Todo App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <main>
        <h1>Todo App</h1>
        {todos && todos.map((todo: TodosRecord) => <Todo key={todo.id} todo={todo} />)}
      </main>
    </div>
  );
};

export const getServerSideProps = async () => {
  try {
    const todos = await table.select({}).firstPage();

    return {
      props: {
        initialTodos: minifyRecords(todos),
      },
    };
  } catch (err) {
    console.error(err);
    return {
      props: {
        err: 'Something went wrong',
      },
    };
  }
};

export default Home;
