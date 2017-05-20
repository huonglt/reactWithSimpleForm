import React from 'react';

export default class AppInfo extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.setTextInputRef = this.setTextInputRef.bind(this);
  }
  setTextInputRef(input) {
    this.textInput = input;
  }
  handleClick() {
    const newAppName = this.textInput.value;
    this.props.renameApp(newAppName);
  }
  render() {
    const { appName, author } = this.props.appInfo;
    return (
      <div>
        <div>App name: {appName}</div>
        <div>Author: {author}</div>
        <div style={{marginTop: '20px'}}>
          <div>New app name: <input type="text" ref={this.setTextInputRef}/></div>
          <div><input type="button" value="Rename" onClick={this.handleClick}/></div>
        </div>
      </div>
    );
  }
}
