const router = require("express").Router();
const ProductsModel = require("../models/Product");

router.route("/").get(async (req, res) => {
  try {
    let temp = await ProductsModel.find({});
    res.status(200).json(temp);
  } catch (err) {
    console.log(err);
    res.status(400).json("Error: " + err);
  }
});

router.route("/add").post(async (req, res) => {
  try {
    const productid = req.body.productid;
    const name = req.body.name;
    const price = req.body.price;
    const type = req.body.type;

    let newProduct = new ProductsModel({
      productid,
      name,
      price,
      type
    });

    await newProduct.save();
    res.status(200).send(newProduct);
  } catch (err) {
    console.log(err);
    res.status(400).json("Error: " + err);
  }
});

router.route("/:id").get(async (req, res) => {
  try {
    let temp = await ProductsModel.findOne({ productid: req.params.id });
    res.status(200).json(temp);
  } catch {
    console.log(err);
    res.status(400).json("Error: " + err);
  }
});

router.route("/:id").delete(async (req, res) => {
  try {
    await ProductsModel.findOneAndDelete({ _id: req.params.id });
    res.status(204);
  } catch {
    console.log(err);
    res.status(400).json("Error: " + err);
  }
});

router.route("/:id").post(async (req, res) => {
  try {
    let temp = await ProductsModel.findOne({ _id: req.params.id });
    try {
      temp.productid = req.body.productid;
      temp.name = req.body.name;
      temp.price = req.body.price;
      temp.type = req.body.type;

      await temp.save();
      res.status(200).send(temp);
    } catch (err) {
      console.log(err);
      res.status(400).json("#1 Error: " + err);
    }
  } catch {
    console.log(err);
    res.status(400).json("#2 Error: " + err);
  }
});

module.exports = router;
