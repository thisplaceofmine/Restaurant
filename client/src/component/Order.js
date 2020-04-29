import React from 'react';

const Order = ({
  productdata,
  setInvoiceInfo,
  invoice,
  setModalError,
  setIsLoading,
}) => {
  const handleSetState = (newState) => {
    if (invoice.status === 'Finish') {
      setModalError({
        status: true,
        message: 'Finish order can not be changed',
      });
    } else {
      setModalError({ status: false, message: '' });
      setInvoiceInfo((prevState) => ({ ...prevState, order: newState }));
    }
  };

  const handleProListClick = (data) => {
    let tempArray = [...invoice.order];

    let orderedProduct = {
      ...data,
      number: 1,
    };
    let index = tempArray.findIndex(
      (element) => element._id === orderedProduct._id
    );

    if (index !== -1) {
      tempArray[index].number = tempArray[index].number + 1;
      handleSetState(tempArray);
    } else {
      tempArray.push(orderedProduct);
      handleSetState(tempArray);
    }
  };

  const handleOrdListClick = (value, index) => {
    let tempArray = [...invoice.order];

    if (invoice.order[index].number === 1) {
      tempArray.splice(index, 1);
      handleSetState(tempArray);
    } else {
      invoice.order[index].number = invoice.order[index].number - 1;
      handleSetState([...tempArray]);
    }
  };

  const RenderProductList = () => {
    return productdata.map((value, i) => {
      return (
        <div
          className='list-group text-left'
          key={i}
          value={i}
          onClick={() => {
            handleProListClick(value);
          }}
        >
          <div className='list-group-item list-group-item-action flex-column align-items-start'>
            <div className='row'>
              <div className='d-flex w-100 justify-content-between'>
                <h5 className='col'>Product: {value.name}</h5>
                <p className='col text-right'>Price: ${value.price}</p>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  const RenderOrderList = () => {
    return invoice.order.map((value, i) => {
      return (
        <div
          className='list-group text-left'
          key={i}
          onClick={() => handleOrdListClick(value, i)}
        >
          <div className='list-group-item align-items-start'>
            <div className='row'>
              <h5 className='col-6'>Product: {value.name}</h5>
              <p className='col-3'>Price: ${value.price}</p>
              <p className='col-3'>Number: {value.number}</p>
            </div>
          </div>
        </div>
      );
    });
  };

  const renderTotal = () => {
    let sum = 0;
    invoice.order.forEach((e) => {
      sum += e.number * e.price;
    });
    return sum;
  };

  return (
    <div>
      <div className='list-group'>
        <div className='row text-center'>
          <div className='col my-3'>
            <h3>Order</h3>
          </div>
          <div className='col my-3'>
            <h3>Product List</h3>
          </div>
        </div>
        <div id='list' className='row'>
          <div id='Order' className='col-sm'>
            <RenderOrderList />
          </div>
          <br />
          <div id='ProductList' className='col-sm'>
            <RenderProductList />
          </div>
        </div>

        <div className='row my-3 text-right'>
          <div className='col'>
            <h4>Total: {renderTotal()}</h4>
          </div>
          <div className='col'></div>
        </div>
      </div>
    </div>
  );
};

export default Order;
