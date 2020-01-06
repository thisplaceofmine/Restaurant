import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Header from "./component/Header";
import Dashboard from "./component/Dashboard";
import Products from "./component/Products";
import Invoices from "./component/Invoices";
// import CreateInvoice from "./component/CreateInvoice";
import Report from "./component/Report";

function App() {
  return (
    <div className="ui container">
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/" exact component={Dashboard} />
          <Route path="/products" exact component={Products} />
          <Route path="/invoices" exact component={Invoices} />
          {/* <Route path="/createinvioce" exact component={CreateInvoice} /> */}
          <Route path="/report" exact component={Report} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
