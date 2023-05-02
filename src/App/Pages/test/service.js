import axios from "axios";

// const loginUrl =
//     "https://uat-api.serasaexperian.com.br/security/iam/v1/client-identities/login";
// const reportUrl =
//     "https://uat-api.serasaexperian.com.br/credit-services/person-information-report/v1/creditreport";
const loginUrl = "/security/iam/v1/client-identities/login";
const reportUrl = "/credit-services/person-information-report/v1/creditreport";
const businessReportUrl ="/credit-services/business-information-report/v1/reports"

const getToken = async () => {
  const payload = {};
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Basic NjQwOGRiOGYxMzI5NzY1ZWIyYTk0YmYyOjBmYjQ5YTJiZTU2NzkyMzFmOGJkODA0Ng=="
    // Cookie:
    //     "SESSION=OWMzODk0MGEtMWZhYi00N2QyLWE3MjYtMWNlMzE5ZmY2NjYw; incap_ses_1614_1333078=kgSgJJV/9Di5JiRnrxRmFr91HGQAAAAAsrQB3faK+02As+NBIH6ZbQ==; nlbi_1333078=y6l7CfV6m2HsBStNfcLIDAAAAACJtOGgAlUakypIaHwXfP4c; visid_incap_1333078=ClGuHHMHR5Kwn94q12Qlfc5CB2QAAAAAQUIPAAAAAAALzTSbnxQ4wB+p9g4qWVaT",
  };
  const {
    data: { accessToken }
  } = await axios.post(loginUrl, payload, { headers });
  console.log(`Token gerado com sucesso!\n${accessToken}\n\n\n`);
  return accessToken;
};
export const generateBusinessReport = async () => {
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

  return axios
    .get(businessReportUrl, { headers, params })
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.error(error);
      throw new Error("Erro ao gerar relatório");
    });
};
export const generateReport = async () => {
  const payload = {
    documentNumber: "00000197041",
    reportName: "COMBO_CONCESSAO_COM_SCORE_POSITIVO",
    optionalFeatures: []
  };
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${await getToken()}`
    // Cookie:
    //     "SESSION=OWMzODk0MGEtMWZhYi00N2QyLWE3MjYtMWNlMzE5ZmY2NjYw; incap_ses_1614_1333078=kgSgJJV/9Di5JiRnrxRmFr91HGQAAAAAsrQB3faK+02As+NBIH6ZbQ==; nlbi_1333078=y6l7CfV6m2HsBStNfcLIDAAAAACJtOGgAlUakypIaHwXfP4c; visid_incap_1333078=ClGuHHMHR5Kwn94q12Qlfc5CB2QAAAAAQUIPAAAAAAALzTSbnxQ4wB+p9g4qWVaT",
  };
  const { data } = await axios.post(reportUrl, payload, { headers });
  console.log(data);
  console.log(data.reports);
  return data;
};
