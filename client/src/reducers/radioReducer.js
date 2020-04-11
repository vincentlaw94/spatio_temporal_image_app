const initialSelectList = {
  STIRadio: "col",
  IBMRadio: "rbg",
  threshold: true
};

const radioReducer = (state = initialSelectList, action) => {
  switch (action.type) {
    case "SET_STI_RADIO":
      return { ...state, STIRadio: action.payload };
    case "SET_IBM_RADIO":
      return { ...state, IBMRadio: action.payload };
    case "TOGGLE_THRESHOLD":
      return { ...state, threshold: !state.threshold };
    default:
      return state;
  }
};

export default radioReducer;
