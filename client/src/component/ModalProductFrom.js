import React, { useState, useEffect } from 'react';
import { Modal, Button, Col, Form, Spinner } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import { createProduct, editProduct, deleteProduct } from '../action';

const ModalProductForm = (props) => {
  const dispatch = useDispatch();
  const initErrorState = {
    status: false,
    message: '',
  };

  const [validated, setValidated] = useState(false);
  const [productInfo, setProductInfo] = useState(props.quarry);
  const [modalError, setModalError] = useState(initErrorState);
  const [isLoading, setIsLoading] = useState(0);

  useEffect(() => {
    setProductInfo(props.quarry);
    setModalError(initErrorState);
    // eslint-disable-next-line
  }, [props.quarry, props.show]);

  const handleSubmit = (event) => {
    const form = event.currentTarget;

    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else if (JSON.stringify(props.quarry) === JSON.stringify(productInfo)) {
      event.stopPropagation();
      setModalError((prevState) => ({
        ...prevState,
        status: true,
        message: 'Nothing has Changed, this will not be submitted',
      }));
    } else if (props.quarry._id !== '') {
      setValidated(true);
      setIsLoading(1);
      console.log('editted');
      dispatch(
        editProduct(productInfo._id, productInfo, handleErrRes, handleSuccess)
      );
    } else {
      setValidated(true);
      setIsLoading(1);
      console.log('created');
      dispatch(createProduct(productInfo, handleErrRes, handleSuccess));
    }
  };

  const handleErrRes = (message) => {
    setIsLoading(0);
    setModalError({ status: true, message: message });
  };

  const handleSuccess = () => {
    setIsLoading(2);
    setTimeout(() => {
      setIsLoading(0);
      props.onHide();
    }, 2000);
  };

  const renderLoadingHelper = () => {
    switch (isLoading) {
      case 1:
        return (
          <div className='mx-1 my-auto'>
            <h5>
              Loading....{' '}
              <Spinner animation='border' role='status' size='sm'>
                <span className='sr-only'>Loading...</span>
              </Spinner>
            </h5>
          </div>
        );
      case 2:
        return (
          <div className='mx-1 my-auto'>
            <h5>Successfully Submit. Close in 2 sec</h5>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Modal
      {...props}
      dialogClassName='modal-90w'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          Product Info
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>{props.quarry.name === '' ? 'Product' : props.quarry.name}</h4>
        <h5>{modalError.status ? modalError.message : ''}</h5>
        <>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Row>
              <Form.Group as={Col} md='6' controlId='validationCustom01'>
                <Form.Label>Product ID</Form.Label>
                <Form.Control
                  required
                  type='text'
                  placeholder='Product ID'
                  onChange={(e) => {
                    const tempValue = e.target.value;
                    setProductInfo((prevState) => ({
                      ...prevState,
                      productid: tempValue,
                    }));
                    setModalError(initErrorState);

                
                  }}
                  value={productInfo.productid}
                />
                <Form.Control.Feedback type='invalid'>
                  Must provide a Product ID
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md='6' controlId='validationCustom02'>
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  required
                  type='text'
                  placeholder='Product Name'
                  onChange={(e) => {
                    const tempValue = e.target.value;
                    setProductInfo((prevState) => ({
                      ...prevState,
                      name: tempValue,
                    }));
                    setModalError(initErrorState);

                  }}
                  value={productInfo.name}
                />
                <Form.Control.Feedback type='invalid'>
                  Must provide a Product Name
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} md='6' controlId='validationCustom03'>
                <Form.Label>Type</Form.Label>
                <Form.Control
                  required
                  type='text'
                  placeholder='Type'
                  onChange={(e) => {
                    const tempValue = e.target.value;
                    setProductInfo((prevState) => ({
                      ...prevState,
                      type: tempValue,
                    }));
                    setModalError(initErrorState);

                  }}
                  value={productInfo.type}
                />
                <Form.Control.Feedback type='invalid'>
                  Please provide a valid Type.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md='6' controlId='validationCustom04'>
                <Form.Label>Price</Form.Label>
                <Form.Control
                  required
                  type='number'
                  placeholder='Price'
                  onChange={(e) => {
                    const tempValue = e.target.value;
                    if (Number(tempValue) === -1) {
                      return null
                    } else {
                      setProductInfo((prevState) => ({
                        ...prevState,
                        price: tempValue,
                      }));
                      setModalError(initErrorState);

                    }
                  }}
                  value={productInfo.price}
                />
                <Form.Control.Feedback type='invalid'>
                  Please provide a valid state.
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Button type='submit' disabled={isLoading === 0 ? false : true}>
                Submit form
              </Button>
              {renderLoadingHelper()}
            </Form.Row>
          </Form>
        </>
      </Modal.Body>
      <Modal.Footer>
        <Button
          disabled={isLoading === 0 ? false : true}
          onClick={() => {
            if (props.quarry._id === '') {
              setModalError({
                status: true,
                message: 'There are nothing to delete',
              });
            } else {
              setIsLoading(1);
              dispatch(deleteProduct(productInfo._id, handleSuccess));
            }
          }}
        >
          Delete
        </Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalProductForm;
