import { RENAME_APP } from './actions.js';

const initialState = { appName: 'blankReact', author: 'helen.le' };

export default function appInfo (state = initialState, action) {
    switch(action.type) {
      case RENAME_APP:
        return { ...state, appName: action.appName };
      default:
        return state;
    }

}
