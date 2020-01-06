import server from "../api/backend";

import {
  CREATE_PRODUCT,
  EDIT_PRODUCT,
  FETCH_PRODUCT,
  FETCH_PRODUCT_LIST,
  DELETE_PRODUCT,
  CREATE_INVOICE,
  EDIT_INVOICE,
  FETCH_INVOICE,
  FETCH_INVOICE_LIST,
  DELETE_INVOICE,
  FETCH_REPORT
} from "./type";

export const fetchProductList = () => async dispatch => {
  const response = await server.get("/products/");
  dispatch({ type: FETCH_PRODUCT_LIST, payload: response.data });
};

export const fetchProduct = id => async dispatch => {
  const response = await server.get(`/products/${id}`);
  console.log(response);
  dispatch({ type: FETCH_PRODUCT, payload: response.data });
};

export const createProduct = productinfo => async dispatch => {
  const response = await server.post("/products/add", productinfo);
  dispatch({ type: CREATE_PRODUCT, payload: response.data });
  window.location.assign("/products");
};

export const editProduct = (id, productinfo) => async dispatch => {
  await server.post(`/products/${id}`, productinfo);
  const response = await server.get("/products/");
  dispatch({ type: EDIT_PRODUCT, payload: response.data });
  window.location.assign("/products");
};

export const deleteProduct = id => async dispatch => {
  await server.delete(`/products/${id}`);
  const response = await server.get("/products/");
  dispatch({ type: DELETE_PRODUCT, payload: response.data });
  window.location.assign("/products");
};

export const fetchInvoiceList = () => async dispatch => {
  const response = await server.get("/invoices/");
  dispatch({ type: FETCH_INVOICE_LIST, payload: response.data });
};

export const fetchInvoice = id => async dispatch => {
  const response = await server.get(`/invoices/${id}`);
  dispatch({ type: FETCH_INVOICE, payload: response.data });
};

export const createInvoice = productinfo => async dispatch => {
  await server.post("/invoices/add", { ...productinfo });
  const response = await server.get("/invoices/");
  dispatch({ type: CREATE_INVOICE, payload: response.data });
  window.location.assign("/invoices");
};

export const editInvoice = (id, productinfo) => async dispatch => {
  await server.post(`/invoices/${id}`, productinfo);
  const response = await server.get("/invoices/");
  dispatch({ type: EDIT_INVOICE, payload: response.data });
  window.location.assign("/invoices");
};

export const deleteInvoice = id => async dispatch => {
  await server.delete(`/invoices/${id}`);
  const response = await server.get("/invoices/");
  dispatch({ type: DELETE_INVOICE, payload: response.data });
  window.location.assign("/invoices");
};

export const fetchReport = () => async dispatch => {
  const response = await server.get("/report/invoices");
  dispatch({ type: FETCH_REPORT, payload: response.data });
};