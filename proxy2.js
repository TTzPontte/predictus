const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.options('*', function(req, res) {
    res.sendStatus(200);
});

app.use('/apiPJ', createProxyMiddleware({ 
  target: 'https://uat-api.serasaexperian.com.br',
  changeOrigin: true,
  pathRewrite: {
    '^/apiCNPJ': '/credit-services/business-information-report/v1/reports'
  }
}));

app.listen(3002, () => {
  console.log('Servidor proxy iniciado na porta 3002');
});
