const path = process.env.NODE_ENV === 'test' ? '../layers/common/' : '/opt/';
const Lambda = require(`${path}lambda`);
const AuditLog = require(`${path}lambda/auditLog`);

const middy = require(`${path}middy/middy`);
const authControl = require(`${path}middy/shared/authControl`);

const UserService = require(`${path}services/User.service`);

const axios = require(`${path}node_modules/axios`);

const loginUrl =
    "https://uat-api.serasaexperian.com.br/security/iam/v1/client-identities/login";
const reportUrl =
    "https://uat-api.serasaexperian.com.br/credit-services/person-information-report/v1/creditreport";
const businessReportUrl =
    "https://uat-api.serasaexperian.com.br/credit-services/business-information-report/v1/reports";

const getToken = async () => {
  const payload = {};
  const headers = {
    "Content-Type": "application/json",
    Authorization:
        "Basic NjQwOGRiOGYxMzI5NzY1ZWIyYTk0YmYyOjBmYjQ5YTJiZTU2NzkyMzFmOGJkODA0Ng=="
  };
  try {
    const {
      data: { accessToken }
    } = await axios.post(loginUrl, payload, { headers });
    console.error(`Token gerado com sucesso!\n${accessToken}\n\n\n`);
    return accessToken;
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao gerar token");
  }
};

const generateBusinessReport = async () => {
  const reportName = "PACOTE_BASICO_FINTECH";
  const optionalFeatures = "QSA";
  const documentId = "17997596000149";
  const token = await getToken();

  const headers = {
    "X-Document-id": documentId,
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`
  };

  const params = {
    reportName: reportName,
    optionalFeatures: optionalFeatures
  };

  try {
    const response = await axios.get(businessReportUrl, { headers, params });
    console.error(
        response.data.optionalFeatures.partner.PartnerResponse.results
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao gerar relatório");
  }
};

const generateReport = async () => {
  const payload = {
    documentNumber: "00000197041",
    reportName: "COMBO_CONCESSAO_COM_SCORE_FINTECH",
    optionalFeatures: ["PARTICIPACAO_SOCIETARIA"]
  };
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${await getToken()}`
  };
  try {
    const { data } = await axios.post(reportUrl, payload, { headers });
    console.error(data);
    console.error(data.optionalFeatures.partner.partnershipResponse);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao gerar relatório");
  }
};


const handler = async (event, context) => {
  try {
    const reportData = await generateReport();
    const businessReportData = await generateBusinessReport();
    return { reportData, businessReportData };
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao gerar relatório");
  }
};

exports.handler = middy(handler));
