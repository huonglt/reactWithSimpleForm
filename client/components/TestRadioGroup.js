import React from 'react';
import TestRadio from './TestRadio';
import styles from '../css/TestRadioGroup.css';

export default class TestRadioGroup extends React.Component {
    constructor(props) {
      super(props);
      this.handleClick = this.handleClick.bind(this);
      this.state = { value: this.props.value };

    }
    handleClick(value) {
      this.setState( (prevState) => ({value: value}));

    }
    render() {
      const makeRadioButton = (item) => <TestRadio
                                          key={item.value}
                                          handleClick={this.handleClick}
                                          label={item.label}
                                          value={item.value}
                                          checked={item.value == this.state.value}
                                          disabled={this.props.disabled}/>
      return (
        <div className={styles.container}>
          {this.props.items.map(makeRadioButton)}
        </div>

      );
    }
}
