const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/products',
    createProxyMiddleware({ target: 'http://localhost:5000' })
  );
  app.use(
    '/invoices',
    createProxyMiddleware({ target: 'http://localhost:5000' })
  )
  app.use(
    '/report',
    createProxyMiddleware({ target: 'http://localhost:5000' })
  )
};
