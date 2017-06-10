import React from 'react';
import ReactDOM from 'react-dom';
import styles from '../css/Dialog.css';
import classNames from 'classnames/bind';
import FaClose from 'react-icons/lib/fa/close';
const cx = classNames.bind(styles);

export default class Dialog extends React.Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
    this.state = {show: this.props.show};
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.setDialog = this.setDialog.bind(this);

  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.show != this.state.show) {
        this.setState({show: nextProps.show});
    }
  }
  
  setDialog(dlg) {
    this.dlg = dlg;
  }
  close() {
    this.setState({show: false});
  }
  handleKeyUp(event) {
    if(this.state.show && event.keyCode === 27) {
      this.close();
    }
  }
  componentDidUpdate() {
    this.dlg.focus();
  }
  render() {
    let dialogCss = cx('container', {'show': this.state.show});
    return (
      <div className={dialogCss} tabIndex="1" onKeyUp={this.handleKeyUp} ref={this.setDialog}>
        <div className={styles.heading}>
          <div>{this.props.title}</div>
          <div className={styles.closeIcon}>
            <FaClose size={20}  onClick={this.close}/>
          </div>
        </div>
        <div className={styles.content}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
