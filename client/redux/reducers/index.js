import { combineReducers } from 'redux';
import appInfo from './appInfo';
import countryOfTaxResidence from './countryOfTaxResidence';

export default combineReducers({
  appInfo,
  countryOfTaxResidence
})
