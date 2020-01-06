const router = require("express").Router();
const InvoiceModel = require("../models/invoice");

router.route("/").get(async (req, res) => {
  try {
    let temp = await InvoiceModel.find({});
    res.status(200).json(temp);
  } catch (err) {
    console.log(err);
    res.status(400).json("Error: " + err);
  }
});

router.route("/add").post(async (req, res) => {
  console.log(req.body);
  try {
    let newInvoice = new InvoiceModel({
      invoiceid: req.body.invoiceid,
      order: req.body.order,
      status: req.body.status
    });

    await newInvoice.save();
    res.status(200).send("success");
  } catch (err) {
    console.log(err);
    res.status(400).json("Error: " + err);
  }
});

router.route("/:id").get(async (req, res) => {
  try {
    let temp = await InvoiceModel.findOne({ _id: req.params.id });
    res.status(200).json(temp);
  } catch (err) {
    console.log(err);
    res.status(400).json("Error: " + err);
  }
});

router.route("/:id").delete(async (req, res) => {
  try {
    let temp = await InvoiceModel.findOneAndDelete({ _id: req.params.id });
    res.status(200).json("Target eliminated");
  } catch (err) {
    console.log(err);
    res.status(400).json("Error: " + err);
  }
});

router.route("/:id").post(async (req, res) => {
  try {
    let temp = await InvoiceModel.findOne({ _id: req.params.id });
    try {
      (temp.invoiceid = req.body.invoiceid),
        (temp.order = req.body.order),
        (temp.status = req.body.status);

      await temp.save();
      res.status(200).send("success Edit");
    } catch (err) {
      console.log(err);
      res.status(400).json("#1 Error: " + err);
    }
  } catch (err) {
    console.log(err);
    res.status(400).json("#2 Error: " + err);
  }
});


module.exports = router;
