import type { InferGetServerSidePropsType, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import NavBar from '../components/NavBar';
import { table, minifyRecords } from '@/api/utils/Airtable';
import { GetServerSideProps } from 'next';
import Todo from 'src/components/Todo';
import { TodosRecord } from '@/types/airtable';

interface HomeProps {
  initialTodos: TodosRecord[];
}

const Home = ({ initialTodos }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  console.log(initialTodos);
  return (
    <div>
      <Head>
        <title>Auth0 Todo App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <main>
        <h1>Todo App</h1>
        {initialTodos &&
          initialTodos.map((todo: TodosRecord) => <Todo key={todo.id} todo={todo} />)}
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
