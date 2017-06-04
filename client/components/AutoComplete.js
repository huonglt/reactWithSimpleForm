import React from 'react';
import ReactDOM from 'react-dom';
import styles from '../css/AutoComplete.css';
import classNames from 'classnames/bind';
import debounce from 'lodash.debounce';

const cx = classNames.bind(styles);
const KEY_UP = 38;
const KEY_DOWN = 40;
const KEY_ENTER = 13;
const KEY_ESCAPE = 27;

export default class AutoComplete extends React.Component {
  constructor(props) {
    super(props);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.clickOutside = this.clickOutside.bind(this);
    this.showDropDown = this.showDropDown.bind(this);
    this.hideDropDown = this.hideDropDown.bind(this);
    this.toggleDropDown = this.toggleDropDown.bind(this);
    this.handleChange = debounce(this.handleChange.bind(this), 200);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.isInViewPort = this.isInViewPort.bind(this);
    this.scrollTo = this.scrollTo.bind(this);
    this.state = {show: false, selectedIndex: -1};
    this.valueItems = this.props.items.map((item) => item.toLowerCase());
  }

  clickOutside(event) {
    if(event.target != this.input) {
      this.hideDropDown();
    }
  }
  handleClick(event) {
    this.showDropDown();
  }
  showDropDown(event) {
    if(!this.state.show) {
      this.setState({show: true});
    }
  }
  hideDropDown(event) {
    if(this.state.show) {
      this.setState({show: false});
    }
  }
  toggleDropDown() {
    this.setState({show: !this.state.show});
  }
  handleChange() {
    const value = this.input.value.toLowerCase();
    let selectedIndex = -1;
    if(value !== '') {
      // find index of the first item that match the value
      selectedIndex = this.valueItems.findIndex((item) => item.startsWith(value));
    }
    if(selectedIndex > -1) {
      this.scrollTo(selectedIndex);
    } else {
      // scroll to the top if no matching found
      this.scrollTo(0);
    }
    this.setState({selectedIndex});
  }

  handleMouseOver(event) {
    const selectedIndex = parseInt(event.target.getAttribute("value"));
    this.setState({selectedIndex});
  }

  handleSelect(event) {
    const selectedIndex = parseInt(event.target.getAttribute("value"));
    this.input.value = this.props.items[selectedIndex];
    this.setState({show: false, selectedIndex});
  }

  handleKeyUp(event) {
    const keyCode = event.keyCode;
    if(keyCode === KEY_UP) {
        let selectedIndex = this.state.selectedIndex - 1;
        if(selectedIndex < 0) {
          selectedIndex = 0;
        }
        this.scrollTo(selectedIndex);
        this.setState({selectedIndex});
    } else if(keyCode === KEY_DOWN) {
      let selectedIndex = this.state.selectedIndex + 1;
      if(selectedIndex == this.props.items.length) {
        selectedIndex = this.props.items.length - 1;
      }
      this.scrollTo(selectedIndex);
      this.setState({selectedIndex});
    } else if(keyCode === KEY_ESCAPE) {
      this.hideDropDown();
    } else if(event.keyCode === KEY_ENTER) {
      this.input.value = this.props.items[this.state.selectedIndex] || '';
      this.toggleDropDown();
    } else {
      this.showDropDown();
    }
  }
  isInViewPort(parent, elem) {
    let parentTop = parent.scrollTop;
    // use offsetHeight to include border (clientHeight is without border)
    let parentBottom = parentTop + parent.offsetHeight;

    let elemTop = elem.offsetTop;
    let elemBottom = elemTop + elem.offsetHeight;
    return ((elemBottom <= parentBottom) && (elemTop >= parentTop));
  }
  scrollTo(index) {
    let domNode = ReactDOM.findDOMNode(this.dropDown);
    if(!this.isInViewPort(domNode, domNode.children[index])) {
      //domNode.children[index].scrollIntoView();
      domNode.scrollTop = domNode.children[index].offsetTop;
    }
  }
  componentDidMount() {
    document.addEventListener('click', this.clickOutside);
  }
  componentWillUnmount() {
    document.removeEventListener('click', this.clickOutside);
  }
  render() {
    let dropDownListCss = cx('dropdownList', {'show': this.state.show});

    const createDropDownItem = (item, index) => {
        let dropDownItemCss = cx({'highlight': index == this.state.selectedIndex});
        return (<div key={index} value={index}
                    className={dropDownItemCss}
                    onClick={this.handleSelect}
                    onMouseOver={this.handleMouseOver}>{item}</div>);
    };
    return (
      <div style={this.props.style}>
        <div className={styles.dropdownInput}>
          <input type="text" className={styles.input} autoComplete="off" spellCheck="false"
                onFocus={this.showDropDown}
                onChange={this.handleChange}
                ref={(input) => this.input = input}
                onKeyUp={this.handleKeyUp}
                onClick={this.handleClick}/>
        </div>
        <div className={dropDownListCss} ref={(input) => this.dropDown = input}>
            {this.props.items.map(createDropDownItem)}
        </div>
      </div>
    );
  }
}
