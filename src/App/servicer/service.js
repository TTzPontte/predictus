const axios = require("axios");
const base_url =
  "https://juris.predictus.inf.br:8443/predictus-api/lawsuits/search/stream";

exports.Service = async ({body, callback, action}) => {
  let url, method, Authorization, data;
  const TOKEN = "xxxxx";

  if (action === "getToken") {
    method = "POST";
    data = {
      username: "pontte.homologacao",
      password: "!7@f+6zEh^)N&Wy3Q2nxc*jDPge58KLdvFsuwCAZHbSmtI(Y"
    };
    url = `https://juris.predictus.inf.br:8443/auth`;
  } else if (action === "getClientCPF") {
    Authorization = `Bearer ${TOKEN}`;
    method = "GET";
    url = base_url;
    data = body;
    delete body.cpf;
  }

  const config = {
    url: url,
    method: method,
    headers: { "Content-Type": "text/plain" },
    timeout: 15000
  };
  if (!!Authorization) {
    config.headers.Authorization = Authorization;
  }

  delete body.action;

  if (data && data !== {}) {
    config.data = JSON.stringify(data);
  }

  console.log(config);

  if (!config.url || !config.method) {
    throw new Error("Configuração errada");
  }

  return axios(config)
    .then((result) => {
      let body;
      console.log("Success");

      if (result.data.erro === "ERRO") {
        body = {
          statusCode: 400,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true
          },
          body: JSON.stringify({ data: result.data })
        };
      } else {
        body = {
          statusCode: 200,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true
          },
          body: JSON.stringify({ data: result.data })
        };
      }

      console.log(body);

      callback(null, body);
    })
    .catch((e) => {
      console.log("Error");
      console.log(e.request);
      console.log(e.response.data);
      console.log(e.response.status);
      console.log(e.response.headers);
      const body = {
        statusCode: e.response.status,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true
        },
        body: JSON.stringify({ data: e.response.data })
      };
      callback(null, body);
    });
};

// const response = await axios.post(
//   "https://juris.predictus.inf.br:8443/predictus- api/lawsuits/search/stream",
//   "",
//   {
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: "Bearer TOKEN"
//     }
//   }
// );
