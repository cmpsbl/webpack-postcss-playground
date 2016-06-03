import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import CSSModules from 'react-css-modules';

import styles from './styles/entry.css';

@CSSModules(styles)
class App extends Component {
  render() {
    return (
      <div>
        <section>
          <div styleName="col">hahahaha</div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </section>
      </div>
    );
  }
};

ReactDOM.render(<App />, document.querySelector('#app'));
