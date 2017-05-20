import React from 'react';
import styles from '../css/App.css';
import AppInfoContainer from '../containers/AppInfoContainer';

export default class App extends React.Component {
  render() {
    let { container } = styles;

    return (
      <div className={container}>
        <h1>A simple React + Redux app</h1>
        <AppInfoContainer/>
      </div>
    );
  }
}
