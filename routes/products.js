const router = require('express').Router();
const ProductsModel = require('../models/Product');

router.route('/').get(async (req, res) => {
  try {
    let temp = await ProductsModel.find({});
    res.status(200).json(temp);
  } catch (err) {
    console.log(err);
    res.status(400).json('Error: ' + err);
  }
});

router.route('/add').post(async (req, res) => {
  try {
    const search = await ProductsModel.findOne({
      productid: req.body.productid,
    });
    let newProduct = new ProductsModel({
      productid: req.body.productid,
      name: req.body.name,
      price: req.body.price,
      type: req.body.type,
    });

    if (search === null) {
      await newProduct.save();
      res.status(200).send(newProduct);
    } else {
      res.status(400).json({
        Error: `This productid(${productid}) had been used. Please use another one`,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json('Error: ' + err);
  }
});

router.route('/:id').get(async (req, res) => {
  try {
    let temp = await ProductsModel.findOne({ productid: req.params.id });
    res.status(200).json(temp);
  } catch (err) {
    console.log(err);
    res.status(400).json('Error: ' + err);
  }
});

router.route('/:id').delete(async (req, res) => {
  try {
    await ProductsModel.findOneAndDelete({ _id: req.params.id });
    res.sendStatus(204);
  } catch (err) {
    console.log(err);
    res.status(400).json('Error: ' + err);
  }
});

router.route('/:id').post(async (req, res) => {
  try {
    let temp = await ProductsModel.findOne({ _id: req.params.id });
    let search = await ProductsModel.findOne({ productid: req.body.productid });
    temp.productid = req.body.productid;
    temp.name = req.body.name;
    temp.price = req.body.price;
    temp.type = req.body.type;

    if (search === null || String(temp._id) == String(search._id)) {
      await temp.save();
      res.status(200).send(temp);
    } else {
      res.status(400).json({
        Error: `This productid(${req.body.productid}) had been used. Please use another one`,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json('Error: ' + err);
  }
});

module.exports = router;
