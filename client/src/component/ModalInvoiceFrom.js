import React, { useState, useEffect } from "react";
import { Modal, Button, Col, Form, Row } from "react-bootstrap";
import _ from "lodash";
import { useDispatch } from "react-redux";

import { editInvoice, createInvoice } from "../action";

import Order from "./Order";

const ModalProductForm = props => {
  let emptyInvoice = {
    invoiceid: "",
    order: [],
    status: "Unfinish"
  };
  console.log({ ...props });
  let dispatch = useDispatch();
  useEffect(() => {
    setInvoiceId(quarryData.invoiceid);
    setOrder(quarryData.order);
    setStatus(quarryData.status);
  }, [props.quarry]);

  const [validated, setValidated] = useState(false);
  const [invoiceId, setInvoiceId] = useState();
  const [order, setOrder] = useState([]);
  const [status, setStatus] = useState();

  const quarryData = _.isNumber(props.quarry)
    ? props.invoicedata[props.quarry]
    : emptyInvoice;

  const handleSubmit = event => {
    const form = event.currentTarget;
    let output = {
      invoiceid: invoiceId,
      order: order,
      status: status
    };
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else if (_.isNumber(props.quarry)) {
      console.log(props.invoicedata[props.quarry]._id);
      event.preventDefault();
      dispatch(editInvoice(props.invoicedata[props.quarry]._id, output));
    } else {
      event.preventDefault();
      dispatch(createInvoice(output));
    }

    setValidated(true);
    event.preventDefault();
  };

  const Title = () => {
    if (_.isNumber(props.quarry)) {
      return <div>Invoice: {quarryData.invoiceid}</div>;
    } else return quarryData.invoiceid;
  };

  return (
    <Modal
      {...props}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <Title />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Row>
              <Form.Group as={Col} md="6" controlId="validationCustom01">
                <Form.Label>Invoice ID</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Invoice ID"
                  value={invoiceId}
                  onChange={e => setInvoiceId(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Must provide a Invoice ID
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="validationCustom02">
                <Form.Label>Status</Form.Label>
                <Form.Control
                  required
                  as="select"
                  value={status}
                  onChange={e => setStatus(e.target.value)}
                >
                  <option>Unfinish</option>
                  <option>Finish</option>
                </Form.Control>
              </Form.Group>
            </Form.Row>

            <Order
              productdata={props.productdata}
              order={order}
              setOrder={setOrder}
            />
            <Row className="d-flex justify-content-between">
              <Button className="mx-2"
              type="submit">Submit form</Button>
              <div>
                <Button
                  onClick={() => {
                    console.log(status);
                  }}
                >
                  Debug
                </Button>

                <Button
                className="mx-2" 
                onClick={props.onHide}>Close</Button>
              </div>
            </Row>
          </Form>
        </>
      </Modal.Body>
    </Modal>
  );
};

export default ModalProductForm;
