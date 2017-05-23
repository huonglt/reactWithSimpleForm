import { connect } from 'react-redux';
import CountryOfTaxResidenceInfo from '../components/CountryOfTaxResidenceInfo';


const mapStateToProps = (state) => ({...state.countryOfTaxResidence })


const CountryOfTaxResidenceInfoContainer = connect(mapStateToProps)(CountryOfTaxResidenceInfo)

export default CountryOfTaxResidenceInfoContainer
