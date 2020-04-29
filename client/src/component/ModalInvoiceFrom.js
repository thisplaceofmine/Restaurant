import React, { useState, useEffect } from 'react';
import { Modal, Button, Col, Form, Row, Spinner } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import { editInvoice, createInvoice, deleteInvoice } from '../action';

import Order from './Order';

const ModalProductForm = (props) => {
  const dispatch = useDispatch();
  const initErrorState = { status: false, message: '' };

  const [validated, setValidated] = useState(false);
  const [invoiceInfo, setInvoiceInfo] = useState(props.quarry);
  const [isLoading, setIsLoading] = useState(0);
  const [modalError, setModalError] = useState(initErrorState);

  useEffect(() => {
    setInvoiceInfo(props.quarry);
    setModalError(initErrorState);
    // eslint-disable-next-line
  }, [props.quarry, props.show]);

  const handleSubmit = (event) => {
    const form = event.currentTarget;

    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else if (JSON.stringify(props.quarry) === JSON.stringify(invoiceInfo)) {
      setModalError({
        status: true,
        message: 'Nothing has Changed, this will not be submitted',
      });
    } else if (props.quarry._id !== '') {
      setIsLoading(1);
      dispatch(
        editInvoice(props.quarry._id, invoiceInfo, handleErrRes, handleSuccess)
      );
    } else {
      setIsLoading(1);
      dispatch(createInvoice(invoiceInfo, handleErrRes, handleSuccess));
    }
    setValidated(true);
  };

  const handleErrRes = (mg) => {
    setIsLoading(0)
    setModalError({ status: true, message: mg });
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
          <div className='mx-2 my-auto'>
            <h5>
              <Button className='mx-2' type='submit'>
                Submit form
              </Button>
              Loading....{' '}
              <Spinner animation='border' role='status' size='sm'>
                <span className='sr-only'>Loading...</span>
              </Spinner>
            </h5>
          </div>
        );
      case 2:
        return (
          <div className='mx-2 my-auto'>
            <h5>
              <Button className='mx-2' type='submit'>
                Submit form
              </Button>
              Successfully Submit. Close in 2 sec
            </h5>
          </div>
        );
      default:
        return (
          <div className='mx-2 my-auto'>
            <Button className='mx-2' type='submit'>
              Submit form
            </Button>
          </div>
        );
    }
  };

  return (
    <Modal
      {...props}
      size='xl'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          {invoiceInfo.invoiceid === ''
            ? 'New Invoice'
            : 'Invoice: ' + invoiceInfo.invoiceid}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Row>
              <h5 className='my-auto mx-auto text-danger'>
                {modalError.status ? modalError.message : null}
              </h5>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} md='6' controlId='validationCustom01'>
                <Form.Label>Invoice ID</Form.Label>
                <Form.Control
                  required
                  type='text'
                  placeholder='Invoice ID'
                  value={invoiceInfo.invoiceid}
                  onChange={(e) => {
                    const tempValue = e.target.value;
                    setInvoiceInfo((c) => ({ ...c, invoiceid: tempValue }));
                    modalError.status && setModalError(initErrorState);
                  }}
                />
                <Form.Control.Feedback type='invalid'>
                  Must provide a Invoice ID
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md='6' controlId='validationCustom02'>
                <Form.Label>Status</Form.Label>
                <Form.Control
                  required
                  as='select'
                  value={invoiceInfo.status}
                  onChange={(e) => {
                    const tempValue = e.target.value;
                    setInvoiceInfo((c) => ({ ...c, status: tempValue }));
                    modalError.status && setModalError(initErrorState);
                  }}
                >
                  <option>Unfinish</option>
                  <option>Finish</option>
                </Form.Control>
              </Form.Group>
            </Form.Row>

            <Order
              productdata={props.productdata}
              setModalError={setModalError}
              invoice={invoiceInfo}
              setInvoiceInfo={setInvoiceInfo}
              setIsLoading={setIsLoading}
            />
            <Row className='d-flex justify-content-between'>
              <div>{renderLoadingHelper()}</div>
              <div>
                <Button
                  onClick={() => {
                    const temp = JSON.stringify(props.quarry);
                    const temp2 = JSON.stringify(invoiceInfo);
                    console.log(temp === temp2);
                  }}
                >
                  Debug
                </Button>
                <Button
                  className='mx-2'
                  onClick={() => {
                    if (props.quarry._id === '') {
                      setModalError({
                        status: true,
                        message: 'There are nothing to delete',
                      });
                    } else {
                      setIsLoading(1);
                      dispatch(deleteInvoice(props.quarry._id, handleSuccess));
                    }
                  }}
                >
                  Delete
                </Button>
                <Button className='mx-2' onClick={props.onHide}>
                  Close
                </Button>
              </div>
            </Row>
          </Form>
        </>
      </Modal.Body>
    </Modal>
  );
};

export default ModalProductForm;
