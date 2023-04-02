import { Provider } from 'mobx-react';
import React from 'react';
import { createRoot } from 'react-dom/client';
import Layout from './layout';
import Router from './router';
import { PageStore } from './store';

document.documentElement.style.fontSize = 100 * (document.documentElement.clientWidth || document.body.clientWidth) / 1442 + 'px';

function App() {
  return (
    <Provider store={new PageStore()}>
      <Layout>
        <Router></Router>
      </Layout>
    </Provider>
  )
}

createRoot(document.querySelector('#main')).render(<App ></App>)

