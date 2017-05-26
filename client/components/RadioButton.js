import React from 'react';
import styles from '../css/RadioButton.css';

export default class RadioButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    if(!this.props.disabled) {
      this.props.handleClick(this.props.value);
    }
  }
  render() {
    const disabled = (this.props.disabled) ? styles.disabled : '';
    const checked = (this.props.checked) ? styles.checked : '';
    const radioButton = styles.radioButton + ' ' + checked + ' ' + disabled;
    return (
      <div className={radioButton} onClick={this.handleClick}>
        <div className={styles.oval}>
          <div className={styles.oval}></div>
          <div className={styles.label}>{this.props.label}</div>
        </div>
      </div>
    );

  }
}
