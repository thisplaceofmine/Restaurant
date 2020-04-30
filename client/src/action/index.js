import axios from 'axios';
import { isUndefined } from 'lodash';

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
  FETCH_REPORT,
} from './type';

export const fetchProductList = () => async (dispatch) => {
  try {
    const response = await axios.get('/products/');
    dispatch({ type: FETCH_PRODUCT_LIST, payload: response.data });
  } catch (error) {
    console.log(error);
  }
};

export const fetchProduct = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`/products/${id}`);
    dispatch({ type: FETCH_PRODUCT, payload: response.data });
  } catch (error) {
    console.log(error);
  }
};

export const createProduct = (
  productinfo,
  handleErrRes,
  handleSuccess
) => async (dispatch) => {
  try {
    await axios.post('/products/add', productinfo);
    const response = await axios.get('/products/');
    dispatch({ type: CREATE_PRODUCT, payload: response.data });
    handleSuccess();
  } catch (error) {
    errorHandleHelper(error, handleErrRes);
  }
};

export const editProduct = (
  id,
  productinfo,
  handleErrRes,
  handleSuccess
) => async (dispatch) => {
  try {
    await axios.post(`/products/${id}`, productinfo);
    const response = await axios.get('/products/');
    dispatch({ type: EDIT_PRODUCT, payload: response.data });
    handleSuccess();
  } catch (error) {
    errorHandleHelper(error, handleErrRes);
  }
};

export const deleteProduct = (id, handleSuccess) => async (dispatch) => {
  try {
    await axios.delete(`/products/${id}`);
    const response = await axios.get('/products/');
    dispatch({ type: DELETE_PRODUCT, payload: response.data });
    handleSuccess();
  } catch (error) {
    console.log(error);
  }
};

export const fetchInvoiceList = () => async (dispatch) => {
  try {
    const response = await axios.get('/invoices/');
    dispatch({ type: FETCH_INVOICE_LIST, payload: response.data });
  } catch (error) {
    console.log(error);
  }
};

export const fetchInvoice = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`/invoices/${id}`);
    dispatch({ type: FETCH_INVOICE, payload: response.data });
  } catch (error) {
    console.log(error);
  }
};

export const createInvoice = (
  invoiceInfo,
  handleErrRes,
  handleSuccess
) => async (dispatch) => {
  try {
    await axios.post('/invoices/add', invoiceInfo);
    const response = await axios.get('/invoices/');
    dispatch({ type: CREATE_INVOICE, payload: response.data });
    handleSuccess();
  } catch (error) {
    errorHandleHelper(error, handleErrRes);
  }
};

export const editInvoice = (
  id,
  invoiceInfo,
  handleErrRes,
  handleSuccess
) => async (dispatch) => {
  try {
    await axios.post(`/invoices/${id}`, invoiceInfo);
    const response = await axios.get('/invoices/');
    dispatch({ type: EDIT_INVOICE, payload: response.data });
    handleSuccess();
  } catch (error) {
    errorHandleHelper(error, handleErrRes);
  }
};

export const deleteInvoice = (id, handleSuccess) => async (dispatch) => {
  try {
    await axios.delete(`/invoices/${id}`);
    const response = await axios.get('/invoices/');
    dispatch({ type: DELETE_INVOICE, payload: response.data });
    console.log("Success 2")
    handleSuccess();
  } catch (error) {
    console.log(error);
  }
};

export const fetchReport = () => async (dispatch) => {
  try {
    console.log("T1")
    const response = await axios.get('/report/invoices');
    dispatch({ type: FETCH_REPORT, payload: response.data });
  } catch (error) {
    console.log(error);
  }
};

const errorHandleHelper = (error, handleErrRes) => {
  if (error.response) {
    // Check the error are expected or not?
    isUndefined(error.response.data.Error)
      ? console.log(error.response)
      : handleErrRes(error.response.data.Error);
  } else if (error.request) {
    console.log(error.request);
  } else {
    console.log('Error', error.message);
  }
  // console.log(error.config);
};
