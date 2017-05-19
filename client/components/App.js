import React from 'react';
import styles from '../css/App.css';

export default class App extends React.Component {
  render() {
    let { container } = styles;
    return (
      <div className={container}>
        <h1>A blank React + Webpack 2 + Yarn app</h1>
      </div>
    );
  }
}
