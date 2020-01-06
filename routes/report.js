const router = require("express").Router();
const InvoiceModel = require("../models/invoice");

router.route("/invoices").get(async (req, res) => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  try {
    let quarry = await InvoiceModel.find({ createdAt: { $gte: today } });
    let dailyRenvenue = 0;
    let soldProduct = [];
    quarry.forEach((data, index) => {
      let Total = 0;
      data.order.forEach(product => {
        let object = {
          name: product.name,
          productid: product.productid,
          number: product.number,
          price: product.price
        };
        let index = soldProduct.findIndex(
          data => data.productid == product.productid
        );

        if (index === -1) {
          soldProduct.push(object);
        } else {
          soldProduct[index].number =
            soldProduct[index].number + product.number;
        }

        Total += product.price * product.number;
      });
      dailyRenvenue += Total;
    });
    let output = [{ dailyRenvenue: dailyRenvenue, soldProduct: soldProduct }];

    res.status(200).json(output);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;
