import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import '../styles/index.css';

export default ({ Component, pageProps }) => (
  <Provider store={store}>
    <Component {...pageProps} />
  </Provider>
);
