const axios = require('axios');

exports.handler = (event, context, callback) => {

  const body = JSON.parse(event.body);
  let url, method;

  let endpoint = body.env === 'prod' ? 'https://srv1.aztronic.com.br/az/apicollect/api': 'https://dev.aztronic.com.br/AZ/APICollect/api'

  if (body.action === 'setContract') {
    method = 'POST'
    url = `${endpoint}/contrato/set`;
  } else if (body.action === 'getClient') {
    method = 'GET'
    url = `${endpoint}/cliente/GetCliente/` + body.cpf;
    delete body.cpf
  } else if (body.action === 'getContracts') {
    method = 'GET'
    url = `${endpoint}/cliente/GetContratos/` + body.cpf;
    delete body.cpf
  } else if (body.action === 'getFinances') {
    method = 'GET'
    url = `${endpoint}/cliente/GetPosicaoFinanceira/` + body.idContract;
    delete body.idContract
  } else if (body.action === 'getRenegParcelas') {
    method = 'GET'
    url = `${endpoint}/cliente/GetRenegParcelas/` + body.idContract;
    delete body.idContract
  } else if (body.action === 'get2Via') {
    method = 'GET'
    url = `${endpoint}/cliente/Get2Via/` + body.idContract;
    delete body.idContract
  } else if (body.action === 'set2Via') {
    method = 'GET'
    url = `${endpoint}/cliente/Set2Via/` + body.idInstalment;
    delete body.idInstalment
  }


  const config = {
    url: url,
    method: method,
    headers: {
      'Content-Type': 'application/json'
    },
    timeout: 15000,
    auth: {
      username: 'AZ-APIKEY',
      password: body.env === 'prod' ? '6BF4C489-1BDA-477A-9108-3FEF45FBE589' : 'C8519A2B-2F66-4282-BE43-D02CA5167171'
    }
  };

  delete body.action;

  if(body && body !== {}) {
    config.data = JSON.stringify(body);
  }

  console.log(config);

  if(!config.url || !config.method) {
    throw new Error('Configuração errada');
  }

  axios(config)
      .then(result => {
        let body;
        console.log('Success')

        if(result.data.erro === 'ERRO') {
          body = {
            statusCode: 400,
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify({data: result.data })
          };
        }else {
          body = {
            statusCode: 200,
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify({data: result.data })
          };
        }

        console.log(body);

        callback(null,body)
      })
      .catch(e => {
        console.log('Error')
        console.log(e.request);
        console.log(e.response.data);
        console.log(e.response.status);
        console.log(e.response.headers);
        const body = {
          statusCode: e.response.status,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
          },
          body: JSON.stringify({data: e.response.data })
        };
        callback(null,body)
      });

};

