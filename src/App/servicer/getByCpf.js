var axios = require("axios").default;

module.exports.getByCpf = async (TOKEN, body) => {
  var options = {
    method: "POST",
    url: "https://juris.predictus.inf.br:8443/predictus-api/lawsuits/search/stream",
    headers: {
      "Content-Type": "application/json",
      AllowedOrigins:"*",
      Authorization:
        `Bearer ${TOKEN}`
    },
    data: body
    // data: { cpfCnpj: "13749521000198" }
  };

  const {data} = await axios.request(options);
  return data
};
