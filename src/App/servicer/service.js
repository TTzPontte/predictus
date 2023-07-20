import axios from "axios";

//Endpoint's
const loginUrl = "/security/iam/v1/client-identities/login";
const reportUrl = "/credit-services/person-information-report/v1/creditreport";
const businessReportUrl ="/credit-services/business-information-report/v1/reports"

//Gerar Token
const getToken = async () => {
  const payload = {};
  const headers = {
    "Content-Type": "application/json",
    //Authorization: "Basic NjQwOGRiOGYxMzI5NzY1ZWIyYTk0YmYyOjBmYjQ5YTJiZTU2NzkyMzFmOGJkODA0Ng==" // DEV
    Authorization: "Basic NjQ4NzA4M2E0ZGU1Y2U0ZTgxZGM4YmNlOmRjYjhjZDE4ZTRlYzVlZDRhMzgwNzg0Ng==" //Prod
  };
  const {
    data: { accessToken }
  } = await axios.post(loginUrl, payload, { headers });
  console.log(`Token gerado com sucesso!\n${accessToken}\n\n\n`);
  return accessToken;
};

//Relatório PJ
export const generateBusinessReport = async (numDocument) => {
  const reportName = "PACOTE_BASICO_FINTECH";
  const optionalFeatures = "QSA";
  const documentId = numDocument;
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

  return axios
    .get(businessReportUrl, { headers, params })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
      throw new Error("Erro ao gerar relatório");
    });
};

//Relatório PF
export const generateReport = async (numDocument) => {
  const payload = {
    documentNumber: numDocument,
    reportName: "COMBO_CONCESSAO_COM_SCORE_FINTECH",
    optionalFeatures: ["PARTICIPACAO_SOCIETARIA"]
  };
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${await getToken()}`
  };
  //console.log(payload)
  const { data } = await axios.post(reportUrl, payload, { headers });
  console.log('dados: ',data);
  //console.log(data.optionalFeatures.partner.partnershipResponse);
  return data;
};
