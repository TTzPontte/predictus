var axios = require("axios").default;

var options = {
    method: 'POST',
    url: 'https://juris.predictus.inf.br:8443/auth',
    data: '{"username": "pontte.homologacao","password": "!7@f+6zEh^)N&Wy3Q2nxc*jDPge58KLdvFsuwCAZHbSmtI(Y"}'
};

axios.request(options).then(function (response) {
    console.log(response.data);
}).catch(function (error) {
    console.error(error);
});



