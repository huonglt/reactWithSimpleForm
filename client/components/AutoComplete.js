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
    this.state = { displaySuggestion: false };
  }
  openSuggestion() {
    this.setState((prevState) => ({ displaySuggestion: true }));
  }
  closeSuggestion() {
    this.setState((prevState) => ({ displaySuggestion: false }));
  }
  toggleSuggestion() {
    this.setState((prevState) => ({ displaySuggestion: !this.state.displaySuggestion }));
  }
  handleChange() {
    //console.log('value = ' + this.input.value);
    const value = this.input.value;

    let foundItem = this.props.items.find((item) => item.toLowerCase().startsWith(value.toLowerCase()));
    if(foundItem) {
      let index = this.props.items.indexOf(foundItem);
      let domNode = ReactDOM.findDOMNode(this.dropDown);
      domNode.children[0].children[index].scrollIntoView();
    }

  }
  setRef(input) {
    this.input = input;
  }
  setRefSuggestion(dd) {
    this.dropDown = dd;
  }
  render() {
    let cn = cx('suggestion', { 'display': this.state.displaySuggestion });
    const makeLi = (item, index) => <li key={index}>{item}</li>;
    return (
      <div style={{marginTop:'10px'}}>
        <div className={styles.dropdown}>
          <input type="text" className={styles.input} placeholder="Select a country"
                onFocus={this.openSuggestion}
                onBlur={this.closeSuggestion}
                onChange={this.handleChange}
                ref={this.setRef}/>
        </div>
        <div className={cn}  ref={this.setRefSuggestion} style={{srollTop: '100px'}}>
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
