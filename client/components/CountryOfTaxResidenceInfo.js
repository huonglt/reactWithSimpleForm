import React from 'react';
export default class CountryOfTaxResidenceInfo extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    if(!this.props.countryOfTaxResidence) {
      return null;
    }

    return (
      <div style={{marginTop:'30px'}}>
        <div style={{borderBottom: '1px solid green', width:'500px'}}>Your tax details</div>
        <div style={{display:'flex'}}>
          <div>Country Name:</div>
          <div style={{marginLeft:'10px'}}>{this.props.countryOfTaxResidence.name}</div>
        </div>
        {
          this.props.countryOfTaxResidence.tin &&
          <div style={{display:'flex'}}>
            <div>Tin</div>
            <div style={{marginLeft: '10px'}}>{this.props.countryOfTaxResidence.tin}</div>
          </div>
        }
      </div>
    );
  }
}
