import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isEmpty } from 'lodash';

import { fetchProductList } from '../action';
import ModalProductForm from './ModalProductFrom';

function Products(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProductList());
    // eslint-disable-next-line
  }, []);

  const defaultProduct = {
    name: '',
    price: 0,
    productid: '',
    type: '',
    _id: '',
  };
  const [modalState, setModalState] = useState(false);
  const [quarry, setQuarry] = useState(defaultProduct);

  const storeData = useSelector((state) => ({
    Products: state.Product,
  }));

  let handleModalClick = (input) => {
    setModalState(true);
    setQuarry(input);
  };

  let DataList = () => {
    if (!isEmpty(storeData.Products)) {
      return storeData.Products.map((data, i) => {
        return (
          <div
            className='ui attached four item menu'
            key={i}
            onClick={() => {
              handleModalClick(data);
            }}
          >
            <div className='item'>{data.productid}</div>
            <div className='item'>{data.name}</div>
            <div className='item'>{data.type}</div>
            <div className='item'>{data.price}</div>
          </div>
        );
      });
    }
  };

  return (
    <div className='ui container'>
      <h1
        style={{ paddingTop: '2em', paddingBottom: '1em' }}
        className='ui center aligned header'
      >
        Products List
      </h1>

      <button
        className='ui right floated primary button'
        onClick={() => handleModalClick(defaultProduct)}
      >
        Add Product
      </button>
      <br />

      <ModalProductForm
        quarry={quarry}
        data={storeData.Products}
        show={modalState}
        onHide={() => setModalState(false)}
        defaultproduct={defaultProduct}
      />
      <div className='ui grey inverted four item menu'>
        <div className='item'>Product ID</div>
        <div className='item'>Product Name</div>
        <div className='item'>Type</div>
        <div className='item'>Price</div>
      </div>
      {DataList()}
    </div>
  );
}

export default Products;
