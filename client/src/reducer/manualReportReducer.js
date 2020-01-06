import { FETCH_REPORT } from "../action/type";

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_REPORT:
      return [...action.payload];
    default:
      return state;
  }
};
