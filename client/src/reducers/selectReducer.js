const initialSelectList = {
  typeSTI: undefined,
  threshold: 255
};

const selectReducer = (state = initialSelectList, action) => {
  switch (action.type) {
    case "SET_STI":
      return { ...state, typeSTI: action.payload };
    case "SET_THRESHOLD":
      return { ...state, threshold: action.payload };
    default:
      return state;
  }
};

export default selectReducer;
