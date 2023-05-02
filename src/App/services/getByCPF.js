var axios = require("axios").default;

export const getByCpf = async (TOKEN, documentNumber) => {
  const url = 'http://localhost:3001/api';
  
  const payload = {
    documentNumber: documentNumber,
    reportName: "COMBO_CONCESSAO_COM_SCORE_FINTECH",
    optionalFeatures: ["PARTICIPACAO_SOCIETARIA"]
  };

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${TOKEN}`,
    'Cookie': 'SESSION=OWMzODk0MGEtMWZhYi00N2QyLWE3MjYtMWNlMzE5ZmY2NjYw; incap_ses_1614_1333078=kgSgJJV/9Di5JiRnrxRmFr91HGQAAAAAsrQB3faK+02As+NBIH6ZbQ==; nlbi_1333078=y6l7CfV6m2HsBStNfcLIDAAAAACJtOGgAlUakypIaHwXfP4c; visid_incap_1333078=ClGuHHMHR5Kwn94q12Qlfc5CB2QAAAAAQUIPAAAAAAALzTSbnxQ4wB+p9g4qWVaT'
  };

  try {
    const response = await axios.post(url, payload, { headers });
    console.log(response)
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Erro ao gerar relatório');
  }
};