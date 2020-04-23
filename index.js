const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

require('dotenv').config();

mongoose.connect(process.env.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

// mongodb connection check
mongoose.connection.once('open', () => {
  console.log('Mongodb connected');
});

const app = express();

app.use(cors());
app.use(bodyParser.json());

const productsRouter = require('./routes/products');
const invoicesRouter = require('./routes/invoices');
const reportRouter = require('./routes/report');

app.use('/products', productsRouter);
app.use('/invoices', invoicesRouter);
app.use('/report', reportRouter);

const port = process.env.PORT || 5000;

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(port, function () {
  console.log('app listening on port ' + port);
});
