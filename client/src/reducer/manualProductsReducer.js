import {
  FETCH_PRODUCT,
  FETCH_PRODUCT_LIST,
  CREATE_PRODUCT,
  EDIT_PRODUCT,
  DELETE_PRODUCT,
} from '../action/type';

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_PRODUCT:
      return [...state, action.payload];
    case CREATE_PRODUCT:
    case FETCH_PRODUCT_LIST:
    case EDIT_PRODUCT:
    case DELETE_PRODUCT:
      return [...action.payload];
    default:
      return state;
  }
};
