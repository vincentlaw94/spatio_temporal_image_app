const initialSelectList = {
    typeSTI: undefined
};

const selectReducer = (state = initialSelectList, action) => {
    switch (action.type) {
        case "SET_STI":
            return { ...state, typeSTI: action.payload };
    default:
        return state;
    }
};

export default selectReducer;