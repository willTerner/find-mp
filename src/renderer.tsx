import React from 'react';
import { createRoot } from 'react-dom/client';
import Layout from './layout';

document.documentElement.style.fontSize = 100 * (document.documentElement.clientWidth || document.body.clientWidth) / 1442 + 'px';

function App() {
  return (
    <Layout>
      
    </Layout>
  )
}

createRoot(document.querySelector('#main')).render(<App ></App>)

