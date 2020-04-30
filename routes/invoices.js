const router = require('express').Router();
const InvoiceModel = require('../models/invoice');

router.route('/').get(async (req, res) => {
  try {
    let temp = await InvoiceModel.find({});
    res.status(200).json(temp);
  } catch (err) {
    console.log(err);
    res.status(400).json('Error: ' + err);
  }
});

router.route('/add').post(async (req, res) => {
  try {
    const search = await InvoiceModel.findOne({
      invoiceid: req.body.invoiceid,
    });
    let newInvoice = new InvoiceModel({
      invoiceid: req.body.invoiceid,
      order: req.body.order,
      status: req.body.status,
    });

    if (search !== null) {
      res.status(400).json({
        Error: `This invoiceid(${req.body.invoiceid}) had been used. Please use another one`,
      });
    } else if (req.body.order.length == 0) {
      res.status(400).json({
        Error: 'You can not create a invoice without any order',
      });
    } else {
      await newInvoice.save();
      res.status(200).json(newInvoice);
    }
  } catch (err) {
    console.log(err);
    res.status(400).json('Error: ' + err);
  }
});

router.route('/:id').get(async (req, res) => {
  try {
    let temp = await InvoiceModel.findOne({ _id: req.params.id });
    res.status(200).json(temp);
  } catch (err) {
    console.log(err);
    res.status(400).json('Error: ' + err);
  }
});

router.route('/:id').delete(async (req, res) => {
  try {
    await InvoiceModel.findOneAndDelete({ _id: req.params.id });
    res.status(204);
  } catch (err) {
    console.log(err);
    res.status(400).json('Error: ' + err);
  }
});

router.route('/:id').post(async (req, res) => {
  try {
    let temp = await InvoiceModel.findOne({ _id: req.params.id });
    const search = await InvoiceModel.findOne({
      invoiceid: req.body.invoiceqid,
    });
    temp.invoiceid = req.body.invoiceid;
    temp.order = req.body.order;
    temp.status = req.body.status;

    if (search !== null && String(temp._id) !== String(search._id)) {
      res.status(400).json({
        Error: `This invoiceid(${req.body.invoiceid}) had been used. Please use another one`,
      });
    } else if (req.body.order.length == 0) {
      res.status(400).json({
        Error: 'You can not create a invoice without any order',
      });
    } else {
      await temp.save();
      res.status(200).json(temp);
    }
  } catch (err) {
    console.log(err);
    res.status(400).json('#2 Error: ' + err);
  }
});

module.exports = router;
