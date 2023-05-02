import axios from "axios";

const api = axios.create({
    baseURL: "https://uat-api.serasaexperian.com.br",
    headers: {
        "Content-Type": "application/json",
    },
});

const loginUrl = "/security/iam/v1/client-identities/login";
const reportUrl = "/credit-services/person-information-report/v1/creditreport";

const getToken = async () => {
    const payload = {};
    const headers = {
        Authorization:
            "Basic NjQwOGRiOGYxMzI5NzY1ZWIyYTk0YmYyOjBmYjQ5YTJiZTU2NzkyMzFmOGJkODA0Ng==",
    };
    const { data: { accessToken } } = await api.post(loginUrl, payload, { headers });
    console.log(`Token gerado com sucesso!\n${accessToken}\n\n\n`);
    return accessToken;
};

export const generateReport = async () => {
    const payload = {
        documentNumber: "00000197041",
        reportName: "COMBO_CONCESSAO_COM_SCORE_POSITIVO",
        optionalFeatures: [],
    };
    const headers = {
        Authorization: `Bearer ${await getToken()}`,
    };
    const { data } = await api.post(reportUrl, payload, { headers });
    console.log(data);
    console.log(data.reports);
    return data;
};
