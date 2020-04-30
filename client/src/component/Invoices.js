import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import { isEmpty } from 'lodash';

import { fetchProductList, fetchInvoiceList } from '../action';
import ModalInvoiceFrom from './ModalInvoiceFrom';

function Invoices(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProductList());
    dispatch(fetchInvoiceList());
    // eslint-disable-next-line
  }, []);

  const defaultInvoice = {
    invoiceid: '',
    order: [],
    status: 'Unfinish',
    _id: '',
  };

  const [modalState, setModalState] = useState(false);
  const [quarry, setQuarry] = useState(defaultInvoice);

  const storeData = useSelector((state) => ({
    Products: state.Product,
    Invoices: state.Invoice,
  }));

  let handleModalClick = (input) => {
    setModalState(true);
    setQuarry(input);
  };

  return (
    <div className='ui container'>
      <h1
        style={{ paddingTop: '2em', paddingBottom: '1em' }}
        className='ui center aligned header'
      >
        Invoices List
      </h1>

      <button
        className='ui right floated primary button'
        onClick={(e) => {
          handleModalClick(defaultInvoice);
        }}
      >
        Create New Invoice
      </button>
      {/* <button className='ui right floated primary button' onClick={() => {}}>
        Debug
      </button> */}
      <br />

      <ModalInvoiceFrom
        quarry={quarry}
        productdata={storeData.Products}
        invoicedata={storeData.Invoices}
        show={modalState}
        onHide={() => {
          setModalState(false);
        }}
      />
      <div className='ui grey inverted four item menu'>
        <div className='item'>Product ID</div>
        <div className='item'>Product Name</div>
        <div className='item'>Type</div>
        <div className='item'>Price</div>
      </div>
      <div className='container'>
        <DataList
          storeInvoices={storeData.Invoices}
          handleClick={handleModalClick}
        />
      </div>
    </div>
  );
}

function DataList({ storeInvoices, handleClick }) {
  let renderOrderList = (data) => {
    return data.map((value, i) => {
      return (
        <div className='list-group text-left' key={i}>
          <div className='list-group-item '>
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

  if (!isEmpty(storeInvoices)) {
    return storeInvoices.map((data, i) => {
      const createdDate = dayjs(data.createdAt).format(
        'ddd DD-MMM-YY hh:mm:ss a'
      );
      let sum = 0;
      data.order.forEach((e) => {
        sum += e.number * e.price;
      });
      return (
        <div className='list-group-item' key={i}>
          <div className='row text-center' onClick={() => handleClick(data)}>
            <div className='col-1'>{data.invoiceid}</div>
            <div className='col-6'>{renderOrderList(data.order)}</div>
            <div className='col-3'>{createdDate}</div>
            <div className='col-1'>${sum}</div>
            <div className='col-1'>{data.status}</div>
          </div>
        </div>
      );
    });
  } else {
    return null;
  }
}

export default Invoices;
