import '../styles/globals.css';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="container mx-auto my-10 max-w-xl">
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
