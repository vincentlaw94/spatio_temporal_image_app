export const addVideo = fileName => {
  return {
    type: "ADD_VIDEO",
    newItem: fileName
  };
};

export const setURL = URL => {
  return {
    type: "SET_URL",
    payload: URL
  };
};
