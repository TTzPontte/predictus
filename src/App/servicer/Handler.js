
// exports.handler = async (event, context, callback) => {
import {getByCpf} from "./getByCpf";

export const handler = async (data) => {
    // const body = JSON.parse(event.body);
    console.log({data})
    try {
        // const respo = await call({ data: body.data });
        // const TOKEN = await getToken()
        const TOKEN = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwb250dGUuaG9tb2xvZ2FjYW8iLCJhdXRob3JpdGllcyI6WyJST0xFX1VTRVIiXSwiaWF0IjoxNjcxMDQ1MDAzLCJleHAiOjE2NzExMzE0MDN9.oyCmO2u9cI4H8Tg0ioRLan4n_JLvW4zRWGyCPHQHi4Dj7d_lfQmUHwVrvWBvvUynv5ieAZtMRAiqWEBlBHSvmQ";
        const respo = await getByCpf(TOKEN, data);
        console.log({respo});
    } catch (error) {
        console.log({error});
    }
    // const response = await Service({ body: body.data, action: body.action, callback });
};

// const payload = {
// const event = {
//     body: JSON.stringify({
//         data: {cpfCnpj: "13749521000198"}, action: "getClientCPF"
//     })
// };
// const context = {};
// const callback = (data) => console.log(data);
// };
// const response = handler(event, context, callback);
