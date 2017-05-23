import { connect } from 'react-redux';
import SelectCountryOfTaxResidence from '../components/SelectCountryOfTaxResidence';


const mapStateToProps = (state) => ({ countryOfTaxResidence: state.countryOfTaxResidence })

const mapDispatchToProps = (dispatch) => {
  return {
    selectCountryOfTaxResidence: (countryOfTaxResidence) => dispatch({ type: 'SELECT_COUNTRY_OF_TAX_RESIDENCE', countryOfTaxResidence})
  }
}


const SelectCountryOfTaxResidenceContainer = connect(mapStateToProps, mapDispatchToProps)(SelectCountryOfTaxResidence)

export default SelectCountryOfTaxResidenceContainer
