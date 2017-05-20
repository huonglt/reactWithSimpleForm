import { createStore } from 'redux';
import reducer from './reducers/index';

const initialState = { };
let store = createStore(reducer, initialState);
console.log('store.getState = ', store.getState());

export default store
