const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InvoiceSchema = new Schema(
  {
    invoiceid: { type: String, required: true, unique: true, trim: true },
    order: [
      {
        productid: { type: String , sparse: true},
        name: { type: String, trim: true },
        price: { type: Number, default: 0 },
        type: { type: String, trim: true },
        number: { type: Number }
      }
    ],
    status: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model("invoices", InvoiceSchema);
