const initialVideoList = {
  videoList: [],
  URL: undefined
};
const videoReducer = (state = initialVideoList, action) => {
  switch (action.type) {
    case "ADD_VIDEO":
      return { ...state, videoList: [...state.videoList, action.newItem] };
    case "SET_URL":
      return { ...state, URL: action.payload };
    default:
      return state;
  }
};

export default videoReducer;
