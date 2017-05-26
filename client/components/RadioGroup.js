import React from 'react';
import RadioButton from './RadioButton';

export default class RadioGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: this.props.defaultValue };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(value) {
    this.setState((prev) => ({ value }));
  }
  render() {
    const makeRadioButton = (item) => <RadioButton
                                          disabled={this.props.disabled}
                                          handleClick={this.handleClick}
                                          key={item.value}
                                          checked={item.value == this.state.value}
                                          label={item.label}
                                          value={item.value}/>;
    return (
      <div style={{display:'flex'}}>
        {this.props.items.map(makeRadioButton)}
      </div>
    );
  }
}
