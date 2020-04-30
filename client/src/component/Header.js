import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="ui menu">
      <Link className="active item" to="/">
        Home
      </Link>
      <Link className="item" to="/product">
        Products
      </Link>
      {/* <Link className="item" to="/createinvioce">
        New Invoice
      </Link> */}
      <Link className="item" to="/invoice">
        Invoices List
      </Link>
      <Link className="item" to="/report">
        Report
      </Link>
    </div>
  );
};

export default Header;
