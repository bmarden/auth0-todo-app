import '../styles/globals.css';
import { TodosProvider } from '@/contexts/TodosContext';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <TodosProvider>
      <div className="container mx-auto my-10 max-w-xl">
        <Component {...pageProps} />
      </div>
    </TodosProvider>
  );
}

export default MyApp;
