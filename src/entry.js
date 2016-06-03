import React from 'react';
import ReactDOM from 'react-dom';

import './styles/entry.css';

const App = () => {
  return (
    <div>
      <section>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </section>
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector('#app'));
