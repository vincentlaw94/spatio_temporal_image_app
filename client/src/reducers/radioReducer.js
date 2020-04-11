const initialSelectList = {
  STIRadio: "col",
  IBMRadio: "rbg"
};

const radioReducer = (state = initialSelectList, action) => {
  switch (action.type) {
    case "SET_STI_RADIO":
      return { ...state, STIRadio: action.payload };
    case "SET_IBM_RADIO":
      return { ...state, IBMRadio: action.payload };
    default:
      return state;
  }
};

export default radioReducer;