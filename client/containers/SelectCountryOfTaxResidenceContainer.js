import { connect } from 'react-redux';
import SelectCountryOfTaxResidence from '../components/SelectCountryOfTaxResidence';
import { selectCountryOfTaxResidenceAction } from '../redux/reducers/actions';

const mapStateToProps = (state) => ({ countryOfTaxResidence: state.countryOfTaxResidence })

const mapDispatchToProps = (dispatch) => {
  return {
    selectCountryOfTaxResidence: (countryOfTaxResidence) => dispatch(selectCountryOfTaxResidenceAction(countryOfTaxResidence))
  }
}


const SelectCountryOfTaxResidenceContainer = connect(mapStateToProps, mapDispatchToProps)(SelectCountryOfTaxResidence)

export default SelectCountryOfTaxResidenceContainer
