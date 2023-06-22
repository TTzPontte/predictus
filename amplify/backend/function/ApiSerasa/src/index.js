const axios = require('axios');

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);
    
    let tipoDocumento = '';
    const numDocumentLength = event.numDocument.length;

    if (numDocumentLength <= 11){
        tipoDocumento = 'CPF';
    } else {
        tipoDocumento = 'CNPJ';
    }

    const tokenSerasa = await getToken();

    return {
        statusCode: 200,
        tipoPessoa: event.tipoPessoa,
        numeroDocumento: event.numDocument,
        tipoDeDocumento: tipoDocumento,
    //  Uncomment below to enable CORS requests
    //  headers: {
    //      "Access-Control-Allow-Origin": "*",
    //      "Access-Control-Allow-Headers": "*"
    //  }, 
        body: JSON.stringify('Hello from Lambda!'),
        requisicao: JSON.stringify(event),
        tokenSerasa: tokenSerasa,
        
    };
  
};

//Endpoint's
const loginUrl = "https://api.serasaexperian.com.br/security/iam/v1/client-identities/login";
const reportUrl = "https://api.serasaexperian.com.br/credit-services/person-information-report/v1/creditreport";
const businessReportUrl = "https://api.serasaexperian.com.br/credit-services/business-information-report/v1/reports";

// Função para obter o token
const getToken = async () => {
    const payload = {};
    const headers = {
        "Content-Type": "application/json",
        // Authorization: "Basic NjQwOGRiOGYxMzI5NzY1ZWIyYTk0YmYyOjBmYjQ5YTJiZTU2NzkyMzFmOGJkODA0Ng==" // DEV
        Authorization: "Basic NjQ4NzA4M2E0ZGU1Y2U0ZTgxZGM4YmNlOmRjYjhjZDE4ZTRlYzVlZDRhMzgwNzg0Ng==" //Prod
    };
    const {
        data: { accessToken }
    } = await axios.post(loginUrl, payload, { headers });
    console.log(`Token gerado com sucesso!\n${accessToken}\n\n\n`);
    return accessToken;
};





