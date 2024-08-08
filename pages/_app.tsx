import React from 'react';
import _error from './_error';
import Index from './index';
import { Provider } from 'react-redux';
import store from '@components/component/store/Store';
import { ThemeProvider } from '@components/component/contexts/ThemeContext';
import '../styles/searchHero.css';

const _app: React.FC = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
        <ThemeProvider>
            <Component {...pageProps} />
        </ThemeProvider>

    </Provider>
  );
};

export default _app;
