import React from "react";
import _ from "lodash";

const Order = props => {
  let handleProListClick = e => {
    let tempArray = [...props.order];
    let reqProduct =
      props.productdata[parseInt(e.currentTarget.getAttribute("value"))];

    let orderedProduct = {
      productid: reqProduct.productid,
      name: reqProduct.name,
      price: reqProduct.price,
      type: reqProduct.type,
      number: 0
    };

    let index = tempArray.findIndex(
      data => data.productid === orderedProduct.productid
    );

    if (index !== -1) {
      tempArray[index].number = tempArray[index].number + 1;

      props.setOrder(tempArray);
    } else {
      let output = { ...orderedProduct, number: orderedProduct.number + 1 };
      props.setOrder([...props.order, output]);
    }
  };

  let handleOrdListClick = e => {
    let tempArray = [...props.order];
    let reqProduct = parseInt(e.currentTarget.getAttribute("value"));

    if (props.order[reqProduct].number === 1) {
      tempArray.splice(reqProduct, 1);
      props.setOrder(tempArray);
    } else {
      props.order[reqProduct].number = props.order[reqProduct].number - 1;
      props.setOrder([...tempArray]);
    }
  };

  const RenderProductList = () => {
    return props.productdata.map((value, i) => {
      return (
        <div
          className="list-group text-left"
          key={i}
          value={i}
          onClick={handleProListClick}
        >
          <div className="list-group-item list-group-item-action flex-column align-items-start">
            <div className="row">
              <div className="d-flex w-100 justify-content-between">
                <h5 className="col">Product: {value.name}</h5>
                <p className="col text-right">Price: ${value.price}</p>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  const RenderOrderList = () => {
    return props.order.map((value, i) => {
      return (
        <div
          className="list-group text-left"
          key={i}
          value={i}
          onClick={handleOrdListClick}
        >
          <div className="list-group-item align-items-start">
            <div className="row">
              <h5 className="col-6">Product: {value.name}</h5>
              <p className="col-3">Price: ${value.price}</p>
              <p className="col-3">Number: {value.number}</p>
            </div>
          </div>
        </div>
      );
    });
  };

  const renderTotal = () => {
    let sum = 0;
    props.order.forEach(e => {
      sum += e.number * e.price;
    });
    return sum;
  };

  return (
    <div>
      <div className="list-group">
        <div className="row text-center">
          <div className="col my-3">
            <h3>Order</h3>
          </div>
          <div className="col my-3">
            <h3>Product List</h3>
          </div>
        </div>
        <div id="list" className="row">
          <div id="Order" className="col-sm">
            <RenderOrderList />
          </div>
          <br />
          <div id="ProductList" className="col-sm">
            <RenderProductList />
          </div>
        </div>

        <div className="row my-3 text-right">
          <div className="col">
            <h4>Total: {renderTotal()}</h4>
          </div>
          <div className="col"></div>
        </div>
      </div>
    </div>
  );
};

export default Order;
