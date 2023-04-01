import react from 'react';
import ReactDom from 'react-dom';

function App() {
    return 'hello, world';
}

ReactDom.render(document.querySelector('#main'), <App></App>);