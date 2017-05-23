const initialState = null;

export default function countryOfTaxResidence(state = initialState, action) {
  switch(action.type) {
    case 'SELECT_COUNTRY_OF_TAX_RESIDENCE':
      const newState = { ...state, countryOfTaxResidence: action.countryOfTaxResidence};
      console.log('newState = ' + JSON.stringify(newState));
      return newState;
    default:
      return state;
  }
}
