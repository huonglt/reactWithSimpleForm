import React from 'react';
import ReactDOM from 'react-dom';
import styles from '../css/AutoComplete.css';
import classNames from 'classnames/bind';
import debounce from 'lodash.debounce';

const cx = classNames.bind(styles);

export default class AutoComplete extends React.Component {
  constructor(props) {
    super(props);
    this.openSuggestion = this.openSuggestion.bind(this);
    this.closeSuggestion = this.closeSuggestion.bind(this);
    this.toggleSuggestion = this.toggleSuggestion.bind(this);
    this.handleChange = debounce(this.handleChange.bind(this), 400);
    this.setRef = this.setRef.bind(this);
    this.setRefSuggestion = this.setRefSuggestion.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.state = { displaySuggestion: false, inputValue: '', selectedIndex: -1 };
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
      }, 100);
    }
  }
  toggleSuggestion() {
    this.setState((prevState) => ({ displaySuggestion: !this.state.displaySuggestion }));
  }
  handleChange() {
    //console.log('value = ' + this.input.value);
    const value = this.input.value;

    let foundItem = this.props.items.find((item) => item.toLowerCase().startsWith(value.toLowerCase()));
    let itemIndex = -1;
    let selectedValue = '';
    if(foundItem) {
      itemIndex = this.props.items.indexOf(foundItem);
      let domNode = ReactDOM.findDOMNode(this.dropDown);
      /*
      domNode.children[0].children[index].scrollIntoView();
      domNode.style.scrollTop = (30 * index) + 'px';*/

      const offsetTop = domNode.children[0].children[itemIndex].offsetTop;
      domNode.scrollTop = offsetTop;
    }
    this.setState((prevState) => ({ ...prevState, selectedIndex: itemIndex, selectedValue: foundItem}));
  }
  setRef(input) {
    this.input = input;
  }
  setRefSuggestion(dd) {
    this.dropDown = dd;
  }

  handleMouseOver(event) {

    const selectedIndex = event.target.value;
    this.setState((prevState) => ({ ...prevState, selectedIndex, selectedValue: this.props.items[selectedIndex] }));
  }

  handleSelect(event) {
    const selectedIndex = event.target.value;
    this.input.value = this.props.items[selectedIndex];

    this.setState((prevState) => ({ ...prevState, displaySuggestion: false, selectedIndex, selectedValue: this.props.items[selectedIndex] }));

  }
  handleKeyPress(event) {
    if(event.charCode === 13) {
      console.log('enter key');
      this.input.value = this.state.selectedValue || '';
      this.closeSuggestion();
    }
  }
  handleKeyDown(event) {
    if(!this.state.displaySuggestion) {
      this.openSuggestion();
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
                onKeyDown={this.handleKeyDown}/>
        </div>
        <div className={cn} ref={this.setRefSuggestion} style={{srollTop: '100px'}}>
          <ul style={{listStyleType:'none'}}>
            {this.props.items.map(makeLi)}
          </ul>
        </div>
        <div style={{height:'200px'}}>
          Some dummy here
        </div>
      </div>
    );
  }
}
