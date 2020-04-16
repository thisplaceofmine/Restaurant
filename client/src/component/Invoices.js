import React, { useState, useEffect, createRef, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { isEmpty, isUndefined } from "lodash";

import { fetchProductList, fetchInvoiceList } from "../action";
import ModalInvoiceFrom from "./ModalInvoiceFrom";

function Invoices(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProductList());
    dispatch(fetchInvoiceList());
    // eslint-disable-next-line
  }, []);

  const [modalState, setModalState] = useState(false);
  const [quarry, setQuarry] = useState();

  const storeData = useSelector(state => ({
    Products: state.Product,
    Invoices: state.Invoice
  }));

  let handleModalClick = input => {
    setModalState(true);
    setQuarry(input);
  };

  let handelListClick = e => {
    let quarryid = Number(e.currentTarget.getAttribute("value"));
    console.log(quarryid);
    handleModalClick(quarryid);
  };

  let DataList = () => {
    if (!isEmpty(storeData.Products)) {
      return storeData.Invoices.map((data, i) => {
        const date = new Date(data.createdAt).toUTCString();
        let sum = 0;
        data.order.forEach(e => {
          sum += e.number * e.price;
        });
        return (
          <div className="list-group-item" key={i}>
            <div
              className="row text-center"
              value={i}
              onClick={handelListClick}
            >
              <div className="col-1">{data.invoiceid}</div>
              <div className="col-6">{renderOrderList(data.order)}</div>
              <div className="col-3">{date}</div>
              <div className="col-1">${sum}</div>
              <div className="col-1">{data.status}</div>
            </div>
          </div>
        );
      });
    }
  };

  let renderOrderList = data => {
    if (!isUndefined(data)) {
      return data.map((value, i) => {
        return (
          <div className="list-group text-left" key={i}>
            <div className="list-group-item ">
              <div className="row">
                <h5 className="col-6">Product: {value.name}</h5>
                <p className="col-3">Price: ${value.price}</p>
                <p className="col-3">Number: {value.number}</p>
              </div>
            </div>
          </div>
        );
      });
    }
  };

  return (
    <div className="ui container">
      <h1
        style={{ paddingTop: "2em", paddingBottom: "1em" }}
        className="ui center aligned header"
      >
        Invoices List
      </h1>

      <button
        className="ui right floated primary button"
        onClick={e => {
          handleModalClick("New Invoice");
          console.log(e.currentTarget);
        }}
      >
        Create New Invoice
      </button>
      <button
        className="ui right floated primary button"
        onClick={() => {
        }}
      >
        Debug
      </button>
      <br />

      <ModalInvoiceFrom
        quarry={quarry}
        productdata={storeData.Products}
        invoicedata={storeData.Invoices}
        show={modalState}
        onHide={() => setModalState(false)}
      />
      <div className="ui grey inverted four item menu">
        <div className="item">Product ID</div>
        <div className="item">Product Name</div>
        <div className="item">Type</div>
        <div className="item">Price</div>
      </div>
      <div className="container">{DataList()}</div>
    </div>
  );
}

export default Invoices;
