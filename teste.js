const axios = require('axios');

// Função para criar Token <-- Executada dentro da função gerar relatório
async function gerarToken() {
    const url = "https://uat-api.serasaexperian.com.br/security/iam/v1/client-identities/login";

    const payload = {};
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Basic NjQwOGRiOGYxMzI5NzY1ZWIyYTk0YmYyOjBmYjQ5YTJiZTU2NzkyMzFmOGJkODA0Ng==',
        'Cookie': 'SESSION=ZjI5NTQzMTgtYjA4Ny00MGZjLTkwMzAtZmZjZDViYTIxMmUw; incap_ses_1620_1333078=9qEgdrqO0GQGqoFfrmV7FpylRmQAAAAAAEe3kHeMng7YLZObxdJNOw==; nlbi_1333078=Fml1GEN+dUPkuF8IfcLIDAAAAACVz10URl6ouNhwQPls1uQf; visid_incap_1333078=+qRMWbdIQzyRE3Ie/ORnWGSZIWQAAAAAQUIPAAAAAAAPygyVGPL5fJnq/gfXTbeD'
    };

    const response = await axios.post(url, payload, { headers });
    const token = response.data.accessToken;
    console.log(`Token gerado com sucesso!\n${token}\n\n\n`);
    return token;
}

async function gerarRelatorio() {
    const url = "https://uat-api.serasaexperian.com.br/credit-services/person-information-report/v1/creditreport";
    const payload = {
        documentNumber: "00065943600",
        reportName: "COMBO_CONCESSAO_COM_SCORE_FINTECH",
        optionalFeatures: []
    };
    const headers = {
        'Content-Type': 'Application/json',
        'Authorization': 'Bearer ' + await gerarToken(),
        'Cookie': 'SESSION=OWMzODk0MGEtMWZhYi00N2QyLWE3MjYtMWNlMzE5ZmY2NjYw; incap_ses_1614_1333078=kgSgJJV/9Di5JiRnrxRmFr91HGQAAAAAsrQB3faK+02As+NBIH6ZbQ==; nlbi_1333078=y6l7CfV6m2HsBStNfcLIDAAAAACJtOGgAlUakypIaHwXfP4c; visid_incap_1333078=ClGuHHMHR5Kwn94q12Qlfc5CB2QAAAAAQUIPAAAAAAALzTSbnxQ4wB+p9g4qWVaT'
    };

    const response = await axios.post(url, payload, { headers });
    console.log(response.data);
}

// Executar Funções
gerarRelatorio();