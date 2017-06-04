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
    this.openSuggestion = this.openSuggestion.bind(this);
    this.closeSuggestion = this.closeSuggestion.bind(this);
    this.toggleSuggestion = this.toggleSuggestion.bind(this);
    this.handleChange = debounce(this.handleChange.bind(this), 200);
    this.setRef = this.setRef.bind(this);
    this.setRefSuggestion = this.setRefSuggestion.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleSelect = this.handleSelect.bind(this);

    this.isInViewPort = this.isInViewPort.bind(this);
    this.scrollDropDownIfNeeded = this.scrollDropDownIfNeeded.bind(this);
    this.state = { displaySuggestion: false, selectedIndex: -1};
    this.valueItems = this.props.items.map((item) => item.toLowerCase());
  }

  clickOutside(event) {
    if(event.target != this.input) {
      this.closeSuggestion();
    }
  }
  handleClick(event) {
    event.nativeEvent.stopPropagation();
    this.openSuggestion();
  }
  openSuggestion(event) {
    if(!this.state.displaySuggestion) {
      this.setState((prevState) => ({ ...prevState, displaySuggestion: true }));
    }
  }
  closeSuggestion(event) {
    if(this.state.displaySuggestion) {
      this.setState((prevState) => ({ ...prevState, displaySuggestion: false }));
    }
  }
  toggleSuggestion() {
    this.setState((prevState) => ({ ...prevState, displaySuggestion: !this.state.displaySuggestion }));
  }
  handleChange() {
    const value = this.input.value.toLowerCase();
    let selectedIndex = -1;
    if(value !== '') {
      selectedIndex = this.valueItems.findIndex((item) => item.startsWith(value));
    }
    if(selectedIndex > -1) {
      this.setState((prevState) => ({ ...prevState, selectedIndex}));
      this.scrollDropDownIfNeeded(selectedIndex);
    } else {
      this.setState((prevState) => ({ ...prevState, selectedIndex}));
      // scroll to the top if no matching found
      this.scrollDropDownIfNeeded(0);
    }

  }
  setRef(input) {
    // make this as an uncontrolled element due to using debounce to handleChange
    this.input = input;
  }
  setRefSuggestion(dropDown) {
    this.dropDown = dropDown;
  }

  handleMouseOver(event) {
    const selectedIndex = event.target.getAttribute("value");
    this.setState((prevState) => ({ ...prevState, selectedIndex }));
  }

  handleSelect(event) {
    const selectedIndex = event.target.getAttribute("value");
    this.input.value = this.props.items[selectedIndex];
    this.setState((prevState) => ({ ...prevState, displaySuggestion: false, selectedIndex}));
  }

  handleKeyUp(event) {
    const keyCode = event.keyCode;
    if(keyCode === KEY_UP) {
        let selectedIndex = parseInt(this.state.selectedIndex) - 1;
        if(selectedIndex < 0) {
          selectedIndex = 0;
        }
        this.setState((prevState) => ({ ...prevState, selectedIndex }));
        this.scrollDropDownIfNeeded(selectedIndex);

    } else if(keyCode === KEY_DOWN) {
      let selectedIndex = parseInt(this.state.selectedIndex) + 1;
      if(selectedIndex == this.props.items.length) {
        selectedIndex = this.props.items.length - 1;
      }
      this.setState((prevState) => ({ ...prevState, selectedIndex }));
      this.scrollDropDownIfNeeded(selectedIndex);
    } else if(keyCode === KEY_ESCAPE) {
      this.closeSuggestion();
    } else if(event.keyCode == KEY_ENTER) {
      console.log('selectedItem = ' + this.props.items[this.state.selectedIndex]);
      this.input.value = this.props.items[this.state.selectedIndex] || '';
      this.toggleSuggestion();
    } else {
      this.openSuggestion();
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
  scrollDropDownIfNeeded(index) {
    console.log('scrollDropDownIfNeeded: index = ' + index);
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
    let cnSuggestionList = cx('suggestion', { 'display': this.state.displaySuggestion });

    const makeSuggestionItem = (item, index) => {
        let cnSuggestionItem = cx({'highlight': index == this.state.selectedIndex});
        return (<div key={index} value={index} className={cnSuggestionItem} onClick={this.handleSelect} onMouseOver={this.handleMouseOver}>{item}</div>);
    };
    return (
      <div style={{marginTop:'10px'}}>
        <div className={styles.dropdown}>
          <input type="text" className={styles.input} autocomplete="off" spellcheck="false"
                onFocus={this.openSuggestion}
                onChange={this.handleChange}
                ref={this.setRef}
                onKeyUp={this.handleKeyUp}
                onClick={this.handleClick} autoComplete="off"/>
        </div>
        <div className={cnSuggestionList} ref={this.setRefSuggestion}>
            {this.props.items.map(makeSuggestionItem)}
        </div>
      </div>
    );
  }
}
