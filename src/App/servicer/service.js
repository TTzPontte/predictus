function makeCreditAnalysisRequest() {
  const url = "https://api.sandbox.zaig.com.br/credit_analysis/natural_person";
  
  const payload = {
    "id": "123456745",
    "name": "Victor Silva Barbosa",
    "credit_request_date": "2023-06-14T10:30:00-03:00",
    "document_number": "199.208.915-92",
    "email": "matheus.duarte@pontte.com.br",
    "phones": [
      {
        "international_dial_code": "55",
        "area_code": "11",
        "number": "21158745",
        "type": "residential"
      }
    ]
  };
  
  const headers = {
    'Authorization': 'c6e7fe6d-c25c-467e-af91-fe9423d38c33',
    'Content-Type': 'application/json'
  };
  
  fetch(url, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(payload)
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error(error);
  });
}

// Chamando a função para fazer a requisição
makeCreditAnalysisRequest();
