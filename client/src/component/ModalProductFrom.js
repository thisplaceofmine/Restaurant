import React, { useState, useEffect } from "react";
import { Modal, Button, Col, Form } from "react-bootstrap";
import { isUndefined, isNumber } from "lodash";
import { useDispatch } from "react-redux";

import { createProduct, editProduct, deleteProduct } from "../action";

const ModalProductForm = props => {
  let dispatch = useDispatch();
  let quarryData = isUndefined(props.data[props.quarry])
    ? "Product"
    : props.data[props.quarry];
  let defaultProductid = isNumber(props.quarry) ? quarryData.productid : "";
  let defaultName = isNumber(props.quarry) ? quarryData.name : "";
  let defaultType = isNumber(props.quarry) ? quarryData.type : "";
  let defaultPrice = isNumber(props.quarry) ? quarryData.price : 0;

  useEffect(() => {
    setProductid(defaultProductid);
    setName(defaultName);
    setType(defaultType);
    setPrice(defaultPrice);
    setNoSaveWarning(false);
    // eslint-disable-next-line
  }, [props.quarry]);

  const [validated, setValidated] = useState(false);
  const [productid, setProductid] = useState();
  const [name, setName] = useState();
  const [type, setType] = useState();
  const [price, setPrice] = useState();
  const [noSaveWarning, setNoSaveWarning] = useState(false);

  const handleSubmit = event => {
    const form = event.currentTarget;
    let output = {
      productid: productid,
      name: name,
      type: type,
      price: Number(price)
    };
    let original =
      defaultProductid === productid &&
      defaultName === name &&
      defaultType === type &&
      defaultPrice === price;

    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else if (original) {
      event.stopPropagation();
      setNoSaveWarning(true);
    } else if (isNumber(props.quarry)) {
      setValidated(true);
      dispatch(editProduct(quarryData._id, output));
    } else {
      dispatch(createProduct(output));
    }
  };

  let HandleHeader = () => {
    if (isNumber(props.quarry)) {
      return <>{quarryData.name}</>;
    } else {
      return <>{props.quarry}</>;
    }
  };

  let HandleWarning = () => {
    if (noSaveWarning) {
      return <h3>Nothing was updated, this will not be update</h3>;
    } else return <></>;
  };

  return (
    <Modal
      {...props}
      dialogClassName="modal-90w"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Product Info
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>
          <HandleHeader />
        </h4>
        <HandleWarning />
        <>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Row>
              <Form.Group as={Col} md="6" controlId="validationCustom01">
                <Form.Label>Product ID</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Product ID"
                  onChange={e => {
                    setProductid(e.target.value);
                    setNoSaveWarning(false);
                  }}
                  value={productid}
                />
                <Form.Control.Feedback type="invalid">
                  Must provide a Product ID
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="validationCustom02">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Product Name"
                  onChange={e => {
                    setName(e.target.value);
                    setNoSaveWarning(false);
                  }}
                  value={name}
                />
                <Form.Control.Feedback type="invalid">
                  Must provide a Product Name
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} md="6" controlId="validationCustom03">
                <Form.Label>Type</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Type"
                  onChange={e => {
                    setType(e.target.value);
                    setNoSaveWarning(false);
                  }}
                  value={type}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid Type.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="validationCustom04">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  required
                  type="number"
                  placeholder="Price"
                  onChange={e => {
                    setPrice(e.target.value);
                    setNoSaveWarning(false);
                  }}
                  value={price}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid state.
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>

            <Button type="submit">Submit form</Button>
          </Form>
        </>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => dispatch(deleteProduct(quarryData._id))}>
          Delete
        </Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalProductForm;
