export const RENAME_APP = 'RENAME_APP';
export const SELECT_COUNTRY_OF_TAX_RESIDENCE = 'SELECT_COUNTRY_OF_TAX_RESIDENCE';

export const renameAppAction = (appName) => ({ type: RENAME_APP, appName });

export const selectCountryOfTaxResidenceAction = (countryOfTaxResidence) => ({ type: SELECT_COUNTRY_OF_TAX_RESIDENCE, countryOfTaxResidence });
