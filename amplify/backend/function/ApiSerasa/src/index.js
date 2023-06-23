const axios = require('axios');

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);
    
    let tipoDocumento = '';
    let resposeSerasa = '';

    const numDocumentLength = event.numDocument.length;
    const environment = event.ambiente;


    if (numDocumentLength <= 11){
        tipoDocumento = 'CPF';
    } else {
        tipoDocumento = 'CNPJ';
    }

    if (event.tipoPessoa==="PF"){
        console.log('Entrou na requisição PF')
        resposeSerasa = await generateReport(event.numDocument, environment)
    }else{
        console.log('Entrou na requisição PJ')
        resposeSerasa = await generateBusinessReport(event.numDocument, environment)
    }

    const response = {
      statusCode: 200,
      ambiente: environment,
      tipoPessoa: event.tipoPessoa,
      numeroDocumento: event.numDocument,
      tipoDeDocumento: tipoDocumento,
      response: resposeSerasa,
  };

  return response;

  
};

//Endpoint's e Autorização
const urls = {
  dev: {
    loginUrl: 'https://uat-api.serasaexperian.com.br/security/iam/v1/client-identities/login',
    authLogin: 'Basic NjQwOGRiOGYxMzI5NzY1ZWIyYTk0YmYyOjBmYjQ5YTJiZTU2NzkyMzFmOGJkODA0Ng==',
    reportUrl: 'https://uat-api.serasaexperian.com.br/credit-services/person-information-report/v1/creditreport',
    businessReportUrl: 'https://uat-api.serasaexperian.com.br/credit-services/business-information-report/v1/reports'
  },
  prod: {
    loginUrl: 'https://api.serasaexperian.com.br/security/iam/v1/client-identities/login',
    authLogin: 'Basic NjQ4NzA4M2E0ZGU1Y2U0ZTgxZGM4YmNlOmRjYjhjZDE4ZTRlYzVlZDRhMzgwNzg0Ng==',
    reportUrl: 'https://api.serasaexperian.com.br/credit-services/person-information-report/v1/creditreport',
    businessReportUrl: 'https://api.serasaexperian.com.br/credit-services/business-information-report/v1/reports'
  }
};


// Função para obter o token
const getToken = async (environment) => {
    const payload = {};
    const headers = {
        "Content-Type": "application/json",
        Authorization: urls[environment].authLogin
    };
    const {
        data: { accessToken }
    } = await axios.post(urls[environment].loginUrl, payload, { headers });
    console.log(`Token gerado com sucesso!\n${accessToken}\n\n\n`);
    return accessToken;
};

// Função pra gerar relatório PJ
const generateBusinessReport = async (numDocument, environment) => {
    const reportName = "PACOTE_BASICO_FINTECH";
    const optionalFeatures = "QSA";
    const documentId = numDocument;
    const token = await getToken(environment);
  
    const headers = {
      "X-Document-id": documentId,
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    };
  
    const params = {
      reportName: reportName,
      optionalFeatures: optionalFeatures
    };
  
    return axios
      .get(urls[environment].businessReportUrl, { headers, params })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error(error);
        throw new Error("Erro ao gerar relatório");
      });
};

// Função pra gerar relatório PF
const generateReport = async (numDocument, environment) => {
    const payload = {
      documentNumber: numDocument,
      reportName: "COMBO_CONCESSAO_COM_SCORE_FINTECH",
      optionalFeatures: ["PARTICIPACAO_SOCIETARIA"]
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${await getToken(environment)}`
    };
    //console.log(payload)
    const { data } = await axios.post(urls[environment].reportUrl, payload, { headers });
    console.log('dados: ',data);
    //console.log(data.optionalFeatures.partner.partnershipResponse);
    return data;
};
  


