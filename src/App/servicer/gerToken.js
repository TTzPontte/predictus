import axios from "axios";

export const getToken = async () => {

    var options = {
        method: 'POST',
        url: 'https://juris.predictus.inf.br:8443/auth',
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Authorization,Content-Type,If-Match",
            "Access-Control-Allow-Methods": "*"
        },
        data: '{"username": "pontte.homologacao","password": "!7@f+6zEh^)N&Wy3Q2nxc*jDPge58KLdvFsuwCAZHbSmtI(Y"}'
    };

    const response = await axios.request(options)
    console.log({response})
    return response.data

}


