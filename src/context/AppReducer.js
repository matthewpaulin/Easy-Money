const AppReducer = (state, action) => {
  switch (action.type) {
    case "SET_ACCOUNT":
      return {
        ...state,
        currentAcc: action.payload,
      };
    case "SET_DISPLAY":
      return {
        ...state,
        display: action.payload,
      };
    case "SET_BUDGET":
      return {
        ...state,
        currentBudget: action.payload,
      };
    default:
      return state;
  }
};
export default AppReducer;
