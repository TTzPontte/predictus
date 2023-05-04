
export const getLambda = async () => {
  let url = "https://eonqz6c81rt0dg7.m.pipedream.net/";

  let options = { method: "POST", body: JSON.stringify({ cpfCnpj: "13749521000198" }) };

  const res = await fetch(url, options);
  return res.json();
};
// export const getLambda = async()=>{

//     var options = {
//         method: 'POST',
//         url: 'https://vtvxdbju7xurys7txbyhbl32r40zztti.lambda-url.us-east-1.on.aws/',
//         headers: { "Content-Type": "application/json" , 'Access-Control-Request-Headers': '*, Referrer-Policy: no-referrer, strict-origin-when-cross-origin'},
//         data: {data: {cpfCnpj: '13749521000198'}, action: 'getClientCPF'}
//     };
//
//     const response = await axios.request(options)
//     console.log({response})
//     return response.data
// }
