import { combineReducers } from "redux";
import Product from "./manualProductsReducer";
import Invoice from "./manualInvoiceReducer";
import Report from "./manualReportReducer"

export default combineReducers({
  Product: Product,
  Invoice: Invoice,
  Report: Report
});
