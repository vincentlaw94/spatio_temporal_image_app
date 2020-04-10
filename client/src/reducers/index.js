import videoReducer from "./videoReducer";
import selectReducer from "./selectReducer";
import radioReducer from "./radioReducer";
import { combineReducers } from "redux";

export default combineReducers({
  videoList: videoReducer,
  selection: selectReducer,
  radio: radioReducer
});
