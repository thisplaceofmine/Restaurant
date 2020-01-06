import {
  FETCH_INVOICE,
  FETCH_INVOICE_LIST,
  CREATE_INVOICE,
  EDIT_INVOICE,
  DELETE_INVOICE
} from "../action/type";

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_INVOICE:
      return [...state, action.payload];
    case CREATE_INVOICE:
    case FETCH_INVOICE_LIST:
    case EDIT_INVOICE:
    case DELETE_INVOICE:
      return [...action.payload];

    default:
      return state;
  }
};
