import axios from "axios";

export const getToken = async () => {
  const url = "https://uat-api.serasaexperian.com.br/security/iam/v1/client-identities/login";
  
  const payload = {};
  const headers = {
    "Content-Type": "application/json",
    "Authorization": "Basic NjQwOGRiOGYxMzI5NzY1ZWIyYTk0YmYyOjBmYjQ5YTJiZTU2NzkyMzFmOGJkODA0Ng==",
    "Cookie": "SESSION=OWMzODk0MGEtMWZhYi00N2QyLWE3MjYtMWNlMzE5ZmY2NjYw; incap_ses_1614_1333078=kgSgJJV/9Di5JiRnrxRmFr91HGQAAAAAsrQB3faK+02As+NBIH6ZbQ==; nlbi_1333078=y6l7CfV6m2HsBStNfcLIDAAAAACJtOGgAlUakypIaHwXfP4c; visid_incap_1333078=ClGuHHMHR5Kwn94q12Qlfc5CB2QAAAAAQUIPAAAAAAALzTSbnxQ4wB+p9g4qWVaT"
  };

  const response = await axios.post(url, payload, { headers });

  const TOKEN = response.data.accessToken;
  console.log(`Token gerado com sucesso!\n${TOKEN}\n\n\n`);
  return TOKEN;
};