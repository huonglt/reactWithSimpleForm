import React from 'react';
import styles from '../css/DialogWithOverlay.css';
import classNames from 'classnames/bind';
import FaClose from 'react-icons/lib/fa/close';
const cx = classNames.bind(styles);
const KEY_ESCAPE = 27;

export default class DialogWithOverlay extends React.Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
    this.handleClickOverlay = this.handleClickOverlay.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.setRef = this.setRef.bind(this);
    this.state = {show: props.show};
  }
  setRef(dlg) {
    this.dlg = dlg;
  }
  handleKeyUp(event) {
    if(this.state.show && event.keyCode === KEY_ESCAPE) {
      this.close();
    }
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.show != this.state.show) {
      this.setState({show: nextProps.show});
    }
  }
  handleClickOverlay(event) {
    if(this.state.show) {
      this.close();
    }
  }
  componentDidUpdate() {
    this.dlg.focus();
  }
  close() {
    this.setState({show: false});
  }
  render() {
    let overlayCss = cx('overlay', {'show': this.state.show});
    return (
        <div className={overlayCss} onClick={this.handleClickOverlay} onKeyUp={this.handleKeyUp} tabIndex="1" ref={this.setRef}>
          <div className={styles.container}>
            <div className={styles.heading}>
              <div>{this.props.title}</div>
              <div className={styles.closeIcon}>
                <FaClose size={23} onClick={this.close}/>
              </div>
            </div>
            <div className={styles.content}>
              {this.props.children}
            </div>
          </div>
        </div>
    );
  }
}
