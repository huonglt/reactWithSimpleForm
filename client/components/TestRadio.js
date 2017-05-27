import React from 'react';
import classNames from 'classnames/bind';
import styles from '../css/TestRadio.css';

const cx = classNames.bind(styles);

export default class TestRadio extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.getRadioBtnCss = this.getRadioBtnCss.bind(this);
    this.state = { checked: this.props.checked };
  }
  /*
   * Handle click event on the radio button or its label
   * If disbled, do nothing
   * If it belongs to a group of radio button, delegates the handler to the RadioGroup Component
   * If it is a single, independent radio button, toggle its state if it is unchecked. Once checked, cannot toggle off
   */
  handleClick() {
    if(this.props.disabled) {
      return;
    }
    if(this.props.handleClick) {
      this.props.handleClick(this.props.value);
    } else {
      // once the radio button is selected, cannot toggle off
      if(!this.state.checked) {
        this.setState({ checked: !this.state.checked});
      }
    }
  }
  /*
   * find the css class for the radio button
   * default, checked, disabled, or combination of checked & disabled, and default & disabled
   */
  getRadioBtnCss() {
    /*
     * if the radio button is managed through the RadioGroup control, its checked property is determined by its props
     * If the radio button is a stand-alone one, its checked property is determined by its own state
    */
    const checked = (this.props.handleClick) ? this.props.checked : this.state.checked;
    const disabled = this.props.disabled;
    return cx('radio', { checked, disabled });
  }
  render() {
    const radioBtnCss = this.getRadioBtnCss();
    return (
      <div onClick={this.handleClick} className={styles.container} style={this.props.style}>
        <div className={radioBtnCss}></div>
        <div className={styles.label}>{this.props.label}</div>
      </div>
    );
  }
}
