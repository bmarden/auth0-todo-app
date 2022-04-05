import '@/styles/globals.css';
import { TodosProvider } from '@/contexts/TodosContext';
import type { AppProps } from 'next/app';
import { UserProvider } from '@auth0/nextjs-auth0';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <TodosProvider>
        <div className="container mx-auto my-10">
          <Component {...pageProps} />
        </div>
      </TodosProvider>
    </UserProvider>
  );
}

export default MyApp;
