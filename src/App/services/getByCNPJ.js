var axios = require("axios").default;

export const getByCNPJ = async (TOKEN, documentNumber) => {
  const url = 'http://localhost:3001/apiCNPJ';
  
  const payload = {};

  const headers = {
    'X-Document-id': '17997596000149',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${TOKEN}`,
    "Cookie": "SESSION=YzFlNWY0MzgtMTY2Yy00Y2FlLWE2ZTgtNjY3YzVjMmMyYWM3; incap_ses_1620_1333078=p/JVRGVc7xeztBBjrmV7FpxfSWQAAAAABi4BPNUWQgp9skhrSuxPng==; nlbi_1333078=vhfzHID++BGKgRxxfcLIDAAAAACO6WeP2afzpuxW4MMV4bP1; visid_incap_1333078=Kxn1VfI6TimOy+FW8AGnCndfSWQAAAAAQUIPAAAAAAAjjivFjvuzxSKgzf1SEAza"
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