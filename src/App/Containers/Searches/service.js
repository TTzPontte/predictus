import axios from "axios";

var options = {
  crossDomain: true,
  method: "POST",
  url: "https://vtvxdbju7xurys7txbyhbl32r40zztti.lambda-url.us-east-1.on.aws/",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Authorization,Content-Type,If-Match",
    "Access-Control-Allow-Methods": "*"
  },
  body: { data: { cpfCnpj: "13749521000198" }, action: "getClientCPF" }
};

export const getData = async () => {
  const response = axios.request(
    "https://vtvxdbju7xurys7txbyhbl32r40zztti.lambda-url.us-east-1.on.aws/",
    options
  );

  console.log(response);
  // )
  // .catch(function (error) {
  //     console.error(error);
  // });
};
