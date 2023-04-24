import axios from "axios";

async function gerarToken() {
  const url = "https://uat-api.serasaexperian.com.br/security/iam/v1/client-identities/login";

  const payload = {};
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Basic NjQwOGRiOGYxMzI5NzY1ZWIyYTk0YmYyOjBmYjQ5YTJiZTU2NzkyMzFmOGJkODA0Ng==',
    'Cookie': 'SESSION=OWMzODk0MGEtMWZhYi00N2QyLWE3MjYtMWNlMzE5ZmY2NjYw; incap_ses_1614_1333078=kgSgJJV/9Di5JiRnrxRmFr91HGQAAAAAsrQB3faK+02As+NBIH6ZbQ==; nlbi_1333078=y6l7CfV6m2HsBStNfcLIDAAAAACJtOGgAlUakypIaHwXfP4c; visid_incap_1333078=ClGuHHMHR5Kwn94q12Qlfc5CB2QAAAAAQUIPAAAAAAALzTSbnxQ4wB+p9g4qWVaT'
  };

  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload)
  });
  const data = await response.json();
  const token = data.accessToken;
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

  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload)
  });
  const data = await response.json();
  console.log(data);
}

export class SerasaExperianApi {
  _URL = "https://uat-api.serasaexperian.com.br";
  _request = null;
  _token = null;
  constructor() {
    this._request = axios.create({
      baseURL: this._URL
    });
  }
  async _getToken() {
    const url = `${this._URL}/security/iam/v1/client-identities/login`;
    const payload = {};
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Basic NjQwOGRiOGYxMzI5NzY1ZWIyYTk0YmYyOjBmYjQ5YTJiZTU2NzkyMzFmOGJkODA0Ng==',
      'Cookie': 'SESSION=OWMzODk0MGEtMWZhYi00N2QyLWE3MjYtMWNlMzE5ZmY2NjYw; incap_ses_1614_1333078=kgSgJJV/9Di5JiRnrxRmFr91HGQAAAAAsrQB3faK+02As+NBIH6ZbQ==; nlbi_1333078=y6l7CfV6m2HsBStNfcLIDAAAAACJtOGgAlUakypIaHwXfP4c; visid_incap_1333078=ClGuHHMHR5Kwn94q12Qlfc5CB2QAAAAAQUIPAAAAAAALzTSbnxQ4wB+p9g4qWVaT'
    };
    const response = await this._request.post(url, payload, { headers });
    return response.data.accessToken;
  }
  async _getRequestHeaders() {
    if (!this._token) {
      this._token = await this._getToken();
    }
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this._token}`,
      'Cookie': 'SESSION=OWMzODk0MGEtMWZhYi00N2QyLWE3MjYtMWNlMzE5ZmY2NjYw; incap_ses_1614_1333078=kgSgJJV/9Di5JiRnrxRmFr91HGQAAAAAsrQB3faK+02As+NBIH6ZbQ==; nlbi_1333078=y6l7CfV6m2HsBStNfcLIDAAAAACJtOGgAlUakypIaHwXfP4c; visid_incap_1333078=ClGuHHMHR5Kwn94q12Qlfc5CB2QAAAAAQUIPAAAAAAALzTSbnxQ4wB+p9g4qWVaT'
    };
  }
  async generateReport(documentNumber) {
    const url = `${this._URL}/credit-services/person-information-report/v1/creditreport`;
    const payload = {
      documentNumber,
      reportName: "COMBO_CONCESSAO_COM_SCORE_POSITIVO",
      optionalFeatures: []
    };
    const headers = await this._getRequestHeaders();
    const response = await this._request.post(url, payload, { headers });
    return response.data;
  }
}