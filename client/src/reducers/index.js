import videoReducer from './videoReducer'
import {combineReducers} from 'redux';

export default combineReducers({
   videoList: videoReducer
});