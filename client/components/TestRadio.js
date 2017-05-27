import React from 'react';
import classNames from 'classnames/bind';

import styles from '../css/TestRadio.css';

export default class TestRadio extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.getRadioButtonStyle = this.getRadioButtonStyle.bind(this);
    this.state = { checked: this.props.checked };
    this.cx = classNames.bind(styles);
  }
  handleClick() {
    if(this.props.disabled) {
      return;
    }
    if(this.props.handleClick) {
      this.props.handleClick(this.props.value);
    } else {
      this.setState({ checked: !this.state.checked});
    }
  }
  getRadioButtonStyle() {
    /*
     * if the radio button is managed through the RadioGroup control, its checked property is determined by its props
     * If the radio button is a stand-alone one, its checked property is determined by its own state
    */
    const propertyController = (this.props.handleClick) ? this.props : this.state;

    return this.cx({
      oval: true,
      checked: propertyController.checked,
      disabled: this.props.disabled,
    });
  }
  render() {
    const radioButton = this.getRadioButtonStyle();
    return (
      <div onClick={this.handleClick}>
        <div className={radioButton} ></div>
        <div className={styles.label}>{this.props.label}</div>
      </div>
    );
  }
}
