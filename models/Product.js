const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchena = new Schema({
  productid: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  name: { type: String, trim: true },
  price: { type: Number, default: 0 },
  type: { type: String, trim: true }
});

module.exports = mongoose.model("products", ProductSchena);
