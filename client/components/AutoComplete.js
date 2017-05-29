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
    this.openSuggestion = this.openSuggestion.bind(this);
    this.closeSuggestion = this.closeSuggestion.bind(this);
    this.toggleSuggestion = this.toggleSuggestion.bind(this);
    this.handleChange = debounce(this.handleChange.bind(this), 300);
    this.setRef = this.setRef.bind(this);
    this.setRefSuggestion = this.setRefSuggestion.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.isInViewPort = this.isInViewPort.bind(this);
    this.scrollDropDownIfNeeded = this.scrollDropDownIfNeeded.bind(this);
    this.state = { displaySuggestion: false, selectedIndex: -1};
  }

  openSuggestion() {
    if(!this.state.displaySuggestion) {
      this.setState((prevState) => ({ ...prevState, displaySuggestion: true }));
    }
  }
  closeSuggestion(event) {
    if(this.state.displaySuggestion) {
      setTimeout(() => {
        this.setState((prevState) => ({ ...prevState, displaySuggestion: false }));
      }, 200);
    }

  }
  toggleSuggestion() {
    this.setState((prevState) => ({ ...prevState, displaySuggestion: !this.state.displaySuggestion }));
  }
  handleChange() {
    const value = this.input.value;
    let foundItem = null;
    let selectedIndex = -1;
    if(value !== '') {
      foundItem = this.props.items.find((item) => item.toLowerCase().startsWith(value.toLowerCase()));
    }
    if(foundItem) {
      selectedIndex = this.props.items.indexOf(foundItem);

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
    const selectedIndex = event.target.value;
    this.setState((prevState) => ({ ...prevState, selectedIndex }));
  }

  handleSelect(event) {
    const selectedIndex = event.target.value;
    this.input.value = this.props.items[selectedIndex];
    this.closeSuggestion();
    this.setState((prevState) => ({ ...prevState, displaySuggestion: false, selectedIndex}));
  }
  handleKeyPress(event) {
    if(event.charCode == KEY_ENTER) {
      this.input.value = this.props.items[this.state.selectedIndex] || '';
      this.toggleSuggestion();
    }
  }
  handleKeyDown(event) {
    console.log('keyDown: keyCode = ' + event.keyCode);

    if(event.keyCode == KEY_UP) {
        let selectedIndex = this.state.selectedIndex - 1;
        if(selectedIndex < 0) {
          selectedIndex = 0;
        }
        this.setState((prevState) => ({ ...prevState, selectedIndex }));
        this.scrollDropDownIfNeeded(selectedIndex);

    } else if(event.keyCode == KEY_DOWN) {
      let selectedIndex = this.state.selectedIndex + 1;
      if(selectedIndex == this.props.items.length) {
        selectedIndex = this.props.items.length - 1;
      }
      this.setState((prevState) => ({ ...prevState, selectedIndex }));
      this.scrollDropDownIfNeeded(selectedIndex);
    } else if(event.keyCode == KEY_ESCAPE) {
      this.closeSuggestion();
    } else if(event.keyCode != KEY_ENTER) {
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
    let domNode = ReactDOM.findDOMNode(this.dropDown);

    if(!this.isInViewPort(domNode, domNode.children[0].children[index])) {
      //domNode.children[0].children[index].scrollIntoView();
      domNode.scrollTop = domNode.children[0].children[index].offsetTop;
    }
  }
  render() {
    let cn = cx('suggestion', { 'display': this.state.displaySuggestion });

    const makeLi = (item, index) => {
        let cn = cx({'highlight': index == this.state.selectedIndex});
        return (<li key={index} value={index} className={cn} onClick={this.handleSelect} onMouseOver={this.handleMouseOver}>{item}</li>);
    };
    return (
      <div style={{marginTop:'10px'}}>
        <div className={styles.dropdown}>
          <input type="text" className={styles.input}
                onFocus={this.openSuggestion}
                onBlur={this.closeSuggestion}
                onChange={this.handleChange}
                ref={this.setRef}
                onKeyPress={this.handleKeyPress}
                onKeyDown={this.handleKeyDown}
                onClick={this.openSuggestion} autoComplete="off"/>
        </div>
        <div className={cn} ref={this.setRefSuggestion}>
          <ul style={{listStyleType:'none'}}>
            {this.props.items.map(makeLi)}
          </ul>
        </div>
        <div style={{height:'200px'}}>
          Some dummy here. Feel free to remove
        </div>
      </div>
    );
  }
}
