const axios = require('axios');

async function gerarRelatorio() {
  const url = 'https://uat-api.serasaexperian.com.br/credit-services/business-information-report/v1/reports';
  const reportName = 'PACOTE_BASICO_FINTECH';
  const optionalFeatures = 'QSA';
  const documentId = '17997596000149';
  const token = 'eyJhbGciOiJSUzUxMiJ9.eyJqdGkiOiI1ODdhZTY3OC05M2M5LTRmYWEtOWE1ZC1lOTgwMGVmNzU0MWMiLCJpYXQiOjE2ODMwNTYwNjgsInNjb3BlIjpbIlJFQUQiLCJXUklURSJdLCJsb2dvbiI6IjM0OTg5MDAzIiwiY2xpZW50X2lkIjoiNjQ0YzJhNzU2ZjNlNGEzZTUzNTQyN2Y3IiwiYXBwX2lkIjoiNjEzOGFiMjY0OWJkY2MyZGM1YjI4YmI3IiwiYnVzaW5lc3NfaWQiOiI2NDA4ZGJlMGIzMTY1MjZiYzAxYWFlNGIiLCJzZXJ2aWNlX2lkIjoiNjQ0YzJhNzVjNzE1OWY1YjVjY2I2MDJjIiwiYnVzaW5lc3NfdW5pdF9pZCI6IjYzN2I4NzFhMTBkNGZiNzA3MzczZjUyZiIsIm9yZ2FuaXphdGlvbl9pZCI6IjYyMzRiZjAzYWIxNDYyNGQ0ODA3ZDZhNSIsImF1dGhvcml0aWVzIjpbIlJPTEVfQ0xJLUFVVEgtQkFTSUMiLCJST0xFX0NMSS1BVVRILUlERU5USUZJRUQiLCJST0xFX0NMSS0zUkRQQVJUWSJdLCJleHAiOjE2ODMwNTk2NjgsInN1YiI6IjY0NGMyYTc1NmYzZTRhM2U1MzU0MjdmNyJ9.aUiFQpQhdUpjs2qFsMROk1k-fcVq2yT7nvYue7ygW48ao9fOQbRpvyjTG891LObUbjn7zKpTnlAn7AphQEgkDSVAmxz8ejoexF4H5J3VymsQrDYCKyEs0y5dZRnKjVPZOHCBRbFosu_roiBNy3CYC1-dcVwORGzWb1wc7RFrxMP3LlQ3DKe22JFcnJUZE13mfzdbN6SZ65o7yjTKUXPs5hs7AV6bbychcC5zgSERbXKnfSibEVb61iWHBZ8frSCRXE6AlhNaXyI_w21RFti546f2EWZ-OmwIxSAiEmRSQdV21rqgunxagy-oGXdbB0-d8jigfdqW6CuQrs7AzNTpUg';

  const headers = {
    'X-Document-id': documentId,
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };

  const params = {
    reportName: reportName,
    optionalFeatures: optionalFeatures
  };

  return axios.get(url, { headers, params })
    .then(response => {
      console.log(response.data);
      return response.data;
    })
    .catch(error => {
      console.error(error);
      throw new Error('Erro ao gerar relatório');
    });
}

// Executar Funções
gerarRelatorio();