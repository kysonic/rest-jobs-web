import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import AuthWrapper from '../components/AuthWrapper';
import { store } from '../store';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <AuthWrapper />
      <Component {...pageProps} />
      <AuthWrapper />
    </Provider>
  );
}

export default MyApp;
