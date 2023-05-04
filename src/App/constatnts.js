export const ENV = window.location.host.match(/^aztronic\./) ? "prod" : "test";
console.log({ ENV });

const link = {
  test: "https://playgroundtc.pontte.com.br/contracts/",
  prod: "https://torrecontrole.pontte.com.br/contracts/",
};

const endpointAPI = {
  test: "https://apitcstaging.pontte.com.br/contracts-open/v1/aztronic-open",
  prod: "https://apitc.pontte.com.br/contracts-open/v1/aztronic-open",
};

const statusGroups = {
  test: {
    fi: "42f88941-556f-4486-b127-bd15d61185a7",
    he: "04fa91a2-7702-428f-b40e-90377d30bfdd",
  },
  prod: {
    fi: "42f88941-556f-4486-b127-bd15d61185a7",
    he: "70498b5f-a81b-4c4a-8b2a-cd38367d0d57",
  },
};

export const BaseApi = "https://0qilw2i5ub.execute-api.us-east-1.amazonaws.com/default";
export const TCLink = link[ENV];
export const API = endpointAPI[ENV];
export const statusGroupsIds = statusGroups[ENV];
