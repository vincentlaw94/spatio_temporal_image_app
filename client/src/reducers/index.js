import videoReducer from './videoReducer'
import selectReducer from './selectReducer'
import {combineReducers} from 'redux';

export default combineReducers({
   videoList: videoReducer,
   selection: selectReducer
});