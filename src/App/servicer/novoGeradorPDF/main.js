import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const diacritics = require('diacritics');
const { TableFactory, TableGenerator, createBackground, styles } = require("./helpers.js");


const reportDataPJ = {
  "data": {
    "reports": [
      {
        "registration": {
          "companyDocument": "33296599000101",
          "companyName": "PONTTE SOLUCOES FINANCEIRAS LTDA",
          "foundationDate": "2019-04-09",
          "statusRegistration": "SITUACAO DO CNPJ EM 09/05/2023: ATIVA",
          "address": {
            "city": "SAO PAULO",
            "state": "SP"
          }
        },
        "negativeData": {
          "pefin":{
            "pefinResponse":[
               {
                  "occurrenceDate":"2021-09-28",
                  "legalNatureId":"AG",
                  "legalNature":"EMPRÉSTIMO",
                  "contractId":"0000000000000000",
                  "creditorBusinessId":"46366520000113",
                  "creditorName":"TRIARTE MONTAGEM DE ESTANDES LTDA",
                  "amount":1407.14,
                  "city":"",
                  "federalUnit":"SP",
                  "principal":true
               },
               {
                "occurrenceDate":"2022-10-28",
                "legalNatureId":"AG",
                "legalNature":"EMPRÉSTIMO",
                "contractId":"0000000000000000",
                "creditorBusinessId":"46366520000113",
                "creditorName":"TRIARTE MONTAGEM DE ESTANDES LTDA",
                "amount":1907.14,
                "city":"",
                "federalUnit":"SP",
                "principal":true
             }
            ],
            "summary":{
               "firstOccurrence":"2021-09-28",
               "lastOccurrence":"2022-10-28",
               "count":2,
               "balance":3314.28
            }
          },
          "refin": {
            "summary": {
              "count": 0,
              "balance": 0
            }
          },
          "collectionRecords": {
            "summary": {
              "count": 0,
              "balance": 0
            }
          },
          "check": {
            "summary": {
              "count": 0,
              "balance": 0
            }
          },
          "notary": {
            "summary": {
              "count": 0,
              "balance": 0
            }
          }
        },
        "facts": {
          "judgementFilings": {
            "summary": {
              "count": 0,
              "balance": 0
            }
          },
          "bankrupts": {
            "summary": {
              "count": 0,
              "balance": 0
            }
          }
        },
        "score": {

          "message": "SETOR NAO E ALVO DE CALCULO - INSTITUICAO FINANCEIRA"
        }
      }
    ],
    "optionalFeatures": {
      "partner": {
        "PartnerResponse": {
          "results": [
            {
              "documentId": "40470948892",
              "name": "CAROLINE GELAIN DE ANDRADE SCHULZ",
              "participationPercentage": 1,
              "inconsistent": false,
              "hasNegative": false
            },
            {
              "documentId": "35353166850",
              "name": "SACHA VINCENT FELIX APRILE",
              "participationPercentage": 1,
              "inconsistent": false,
              "hasNegative": false
            },
            {
              "documentId": "33427504808",
              "name": "RAPHAEL PANSUTTI ARAUJO",
              "participationPercentage": 1,
              "inconsistent": false,
              "hasNegative": false
            },
            {
              "documentId": "34006289804",
              "name": "MIGUEL TAINO",
              "participationPercentage": 1,
              "inconsistent": false,
              "hasNegative": false
            },
            {
              "documentId": "22244823881",
              "name": "BRUNNO BAGNARIOLLI",
              "participationPercentage": 1,
              "inconsistent": false,
              "hasNegative": false
            },
            {
              "documentId": "07170960000149",
              "name": "MAUA INVESTIMENTOS LTDA.",
              "participationPercentage": 1,
              "inconsistent": false,
              "hasNegative": false
            },
            {
              "documentId": "39836216863",
              "name": "MARIA LOPES ROSENBERG",
              "participationPercentage": 1,
              "inconsistent": false,
              "hasNegative": false
            },
            {
              "documentId": "11626160000167",
              "name": "MAUA CAPITAL S.A.",
              "participationPercentage": 92,
              "inconsistent": false,
              "hasNegative": false
            },
            {
              "documentId": "10116840803",
              "name": "MARCELO LUBLINER",
              "participationPercentage": 1,
              "inconsistent": false,
              "hasNegative": false
            }
          ]
        }
      },
      "director": {
        "DirectorResponse": {
          "results": [
            {
              "documentId": "40470948892",
              "name": "CAROLINE GELAIN DE ANDRADE SCHULZ",
              "role": "ADMINISTRADOR",
              "hasNegative": false
            },
            {
              "documentId": "35353166850",
              "name": "SACHA VINCENT FELIX APRILE",
              "role": "ADMINISTRADOR",
              "hasNegative": false
            },
            {
              "documentId": "33427504808",
              "name": "RAPHAEL PANSUTTI ARAUJO",
              "role": "ADMINISTRADOR",
              "hasNegative": false
            },
            {
              "documentId": "34006289804",
              "name": "MIGUEL TAINO",
              "role": "ADMINISTRADOR",
              "hasNegative": false
            },
            {
              "documentId": "22244823881",
              "name": "BRUNNO BAGNARIOLLI",
              "role": "ADMINISTRADOR",
              "hasNegative": false
            },
            {
              "documentId": "39836216863",
              "name": "MARIA LOPES ROSENBERG",
              "role": "ADMINISTRADOR",
              "hasNegative": false
            },
            {
              "documentId": "10116840803",
              "name": "MARCELO LUBLINER",
              "role": "ADMINISTRADOR",
              "hasNegative": false
            }
          ]
        }
      }
    }
  }
};

const reportDataPF = {
  "data": {
    "reports": [
      {
        "registration": {
          "documentNumber": "00000197041",
          "consumerName": "VIVIANE RIOS",
          "motherName": "afvkp wrpbnvpq kxzyqkcgqbn",
          "birthDate": "2002-07-19",
          "statusRegistration": "REGULAR",
          "address": {
            "addressLine": "R VIRGEM 716",
            "district": "JD SATELITE",
            "zipCode": "12230420",
            "country": "BRA",
            "city": "SAO JOSE DOS CAMPOS",
            "state": "SP"
          },
          "phone": {
            "regionCode": 55,
            "areaCode": 11,
            "phoneNumber": 974063008
          }
        },
        "negativeData": {
          "pefin": {
            "pefinResponse": [],
            "summary": {
              "count": 0,
              "balance": 0
            }
          },
          "refin": {
            "refinResponse": [],
            "summary": {
              "count": 0,
              "balance": 0
            }
          },
          "notary": {
            "notaryResponse": [],
            "summary": {
              "count": 0,
              "balance": 0
            }
          },
          "check": {
            "checkResponse": [],
            "summary": {
              "count": 0,
              "balance": 0
            }
          }
        },
        "score": {
          "score": 900,
          "scoreModel": "HFIN",
          "defaultRate": "9,0"
        },
        "facts": {
          "inquiry": {
            "inquiryResponse": [
              {
                "occurrenceDate": "2023-08-17",
                "segmentDescription": "",
                "daysQuantity": 1
              },
              {
                "occurrenceDate": "2023-08-02",
                "segmentDescription": "",
                "daysQuantity": 1
              },
              {
                "occurrenceDate": "2023-05-05",
                "segmentDescription": "INDUSTRIA DE INSUMOS",
                "daysQuantity": 1
              },
              {
                "occurrenceDate": "2022-12-07",
                "segmentDescription": "INDUSTRIA DE INSUMOS",
                "daysQuantity": 1
              },
              {
                "occurrenceDate": "2022-12-01",
                "segmentDescription": "INDUSTRIA DE INSUMOS",
                "daysQuantity": 1
              }
            ],
            "summary": {
              "count": 5
            }
          },
          "stolenDocuments": {
            "stolenDocumentsResponse": [
              {
                "occurrenceDate": "2022-07-16",
                "inclusionDate": "2022-07-21T09:38:09",
                "documentType": "CPF",
                "documentNumber": "22053787830",
                "issuingAuthority": "SSP",
                "detailedReason": "ROUBADO",
                "occurrenceState": "SP",
                "phoneNumber": {
                  "regionCode": 55,
                  "areaCode": 11,
                  "phoneNumber": 974063008
                }
              }
            ],
            "summary": {
              "count": 1,
              "balance": 0
            }
          }
        }
      }
    ],
    "optionalFeatures": {
      "partner": {
        "partnershipResponse": [
          {
            "businessDocument": "22174039000168",
            "companyName": "TKOZUJIX WLHM WUHRXLZX 07014131518",
            "participationPercentage": 20,
            "companyStatusCode": "ATIVA",
            "companyState": "MG",
            "companyStatusDate": "21/07/2021",
            "updateDate": "2021-08-05",
            "participationInitialDate": "2021-07-24"
          },
          {
            "businessDocument": "20198711000120",
            "companyName": "TXJNAR SW FUXKSRC IKSWRAI - DS",
            "participationPercentage": 12.5,
            "companyStatus": "SITUACAO DO CNPJ EM 21/07/2021: ATIVA",
            "companyStatusCode": "ATIVA",
            "companyState": "SP",
            "companyStatusDate": "21/07/2021",
            "updateDate": "2021-08-05",
            "participationInitialDate": "2021-08-05"
          },
          {
            "businessDocument": "62173620000180",
            "participationPercentage": 50,
            "updateDate": "2022-07-01",
            "participationInitialDate": "2020-07-01"
          }
        ],
        "summary": {
          "count": 3,
          "balance": 0
        }
      }
    }
  }
};


function formatDocumentNumber(documentNumber) {
  const cleanNumber = documentNumber.replace(/\D/g, ''); // Remove caracteres não numéricos

  if (cleanNumber.length === 11) { // CPF tem 11 dígitos
    const formattedCPF = cleanNumber.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    return formattedCPF;
  } else if (cleanNumber.length === 14) { // CNPJ tem 14 dígitos
    const formattedCNPJ = cleanNumber.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    return formattedCNPJ;
  } else {
    return "Número de documento inválido";
  }
}

// Função pra remover acentos
function removeAccents(inputString) {
  return diacritics.remove(inputString);
}
 
// Função pra formatar data ---> DD/MM/AAAA
function formatDate(inputDate) {
  
 
  const parts = inputDate.split('-');
    if (parts.length !== 3) {
      throw new Error('Formato de data inválido');
    }
  
    
   
  const formattedDate = `${parts[2]}/${parts[1]}/${parts[0]}`;
    return formattedDate;
}

// Função pra formatar data ---> MM/AAAA
function formatDateResume(inputDate) {
  
 
  const parts = inputDate.split('-');
    if (parts.length !== 3) {
      throw new Error('Formato de data inválido');
    }
  
    
   
  const formattedDate = `${parts[1]}/${parts[0]}`;
    return formattedDate;
}

// Função pra formatar valores monetáiros
function formatCurrency(inputValue) {
  const formattedValue = parseFloat(inputValue).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
  return formattedValue;
}

// Converter em porcentagem
function convertToPercentage(inputValue) {

  if (inputValue === "0") {
    return "0%";
  }

  const numericValue = parseFloat(inputValue) / 10000;

  const formattedPercentage = (numericValue * 100).toFixed(2) + '%';

  return formattedPercentage;
}


function generateReportContentPJ(report, optional) {
  //Dados Pai - JSON
  const registration = report.registration;
  const negativeData = report.negativeData;
  const facts = report.facts.pefinResponse
  
  //Dados de negativação
  const pefins = negativeData.pefin.pefinResponse
  const refins = negativeData.refin.refinResponse
  const checks = negativeData.check.checkResponse
  const notarys = negativeData.notary.notoryResponse

  // Dados Opcionais
  const partners = optional.partner.PartnerResponse.results
  
  const tableFactory = new TableFactory("tableInfos");
  const tableGenerator = new TableGenerator(tableFactory);

  // Tabela Inicial
  const registrationTable = tableGenerator.createInfoTable(
      ["Documento", "Razão Social", "Fundada em", "Status", "Cidade", "UF"],
      [[
        formatDocumentNumber(registration.companyDocument),
        registration.companyName,
        registration.foundationDate,
        registration.statusRegistration,
        registration.address.city,
        registration.address.state
      ]]
  );
  
  // Pefin 
  const pefinTable = tableGenerator.createHeaderNegativeTable(
    ["PEFIN", negativeData.pefin.summary.count, "Valor Total", formatCurrency(negativeData.pefin.summary.balance)]
  );
  
  if(pefins!==undefined){
    const pefinAuxTable = [];

    for (let pefin = 0; pefin < pefins.length; pefin++) {
      const partnerInfo = [
        removeAccents(pefins[pefin].legalNature),
        pefins[pefin].creditorName,
        formatCurrency(pefins[pefin].amount),
        formatDate(pefins[pefin].occurrenceDate),
        pefins[pefin].city,
        pefins[pefin].federalUnit,
        "PEFIN [" + pefins[pefin].legalNature + " - "+ formatCurrency(pefins[pefin].amount) +" - " + formatDateResume(pefins[pefin].occurrenceDate) + "]"
      ];
      pefinAuxTable.push(partnerInfo);
    }

    var pefinInfoTable = tableGenerator.createAuxTable(
      ['Natureza', 'Credor', 'Valor', 'Data', 'Cidade', 'Estado', 'Resumo'],
      pefinAuxTable
    );
  }
  
  // Refin 
  const refinTable = tableGenerator.createHeaderNegativeTable(
    ["REFIN", negativeData.refin.summary.count, "Valor Total", formatCurrency(negativeData.refin.summary.balance)]
  );
  
  if(refins!==undefined){
    const refinAuxTable = [];

    for (let refin = 0; refin < refins.length; refin++) {
      const partnerInfo = [
        removeAccents(refins[refin].legalNature),
        refins[refin].creditorName,
        formatCurrency(refins[refin].amount),
        formatDate(refins[refin].occurrenceDate),
        refins[refin].city,
        refins[refin].federalUnit,
        "REFIN [" + refins[refin].legalNature + " - " + formatDateResume(refins[refin].occurrenceDate) + "]"
      ];
      refinAuxTable.push(partnerInfo);
    }

    var refinInfoTable = tableGenerator.createAuxTable(
      ['Natureza', 'Credor', 'Valor', 'Data', 'Cidade', 'Estado', 'Resumo'],
      refinAuxTable
    );
  }
  
  // Check 
  const checkTable = tableGenerator.createHeaderNegativeTable(
    ["Cheque sem fundo", negativeData.check.summary.count, "Valor Total", formatCurrency(negativeData.check.summary.balance)]
  );
  
  if(checks!==undefined){
    const checkAuxTable = [];

    for (let check = 0; check < checks.length; check++) {
      const partnerInfo = [
        removeAccents(checks[check].legalNature),
        checks[check].creditorName,
        formatCurrency(checks[check].amount),
        formatDate(checks[check].occurrenceDate),
        checks[check].city,
        checks[check].federalUnit,
        "Cheque sem fundo [" + checks[check].legalNature + " - " + formatDateResume(checks[check].occurrenceDate) + "]"
      ];
      checkAuxTable.push(partnerInfo);
    }

    var checkInfoTable = tableGenerator.createAuxTable(
      ['Natureza', 'Credor', 'Valor', 'Data', 'Cidade', 'Estado', 'Resumo'],
      checkAuxTable
    );
  }

  // notary 
  const notaryTable = tableGenerator.createHeaderNegativeTable(
    ["Prostesto Nacional", negativeData.notary.summary.count, "Valor Total", formatCurrency(negativeData.notary.summary.balance)]
  );
  
  if(notarys!==undefined){
    const notaryAuxTable = [];

    for (let notary = 0; notary < notarys.length; notary++) {
      const partnerInfo = [
        removeAccents(notarys[notary].legalNature),
        notarys[notary].creditorName,
        formatCurrency(notarys[notary].amount),
        formatDate(notarys[notary].occurrenceDate),
        notarys[notary].city,
        notarys[notary].federalUnit,
        "Protesto Nacional [" + notarys[notary].legalNature + " - " + formatDateResume(notarys[notary].occurrenceDate) + "]"
      ];
      notaryAuxTable.push(partnerInfo);
    }

    var notaryInfoTable = tableGenerator.createAuxTable(
      ['Natureza', 'Credor', 'Valor', 'Data', 'Cidade', 'Estado', 'Resumo'],
      notaryAuxTable
    );
  }
    
  //Dados Score
  var score = report.score.score;
  var probInadimplencia = report.score.defaultRate
  var messageScore = "";

  if(score===undefined){
    score = 0;
    probInadimplencia = 0;
    messageScore = report.score.message;
  }

  probInadimplencia = convertToPercentage(probInadimplencia)

  const scoreTest = {
    columns: [
                    
      // Tabela do Score
      {
          style: 'tableScore',
          table: {
              widths: ['25%'],
              body: [
                  [{text:'Score', alignment: 'center', color: "#FFFFFF", bold: 'true', fontSize: 14}],
                  [{text:score, alignment: 'center', color: "#FFFFFF", bold: 'true', fontSize: 26}],
              ]
          },
          margin: [10, 15, 0, 0] // Margem para separar as tabelas
      },
      
      // Texto de probabilidade inadimplência
      {
          text: [
              { text: '\n\nProbabilidade de inadimplência\n---------------------------------------->', alignment: 'center', color: '#F', bold: true, fontSize: 14 },
          ],
          margin: [-250, 0, 0, 0]
      },
      
      // Círculo Teste
      {
       style: 'tableScore',
          table: {
              heights:[20],
              widths: ['35%'],
              body: [
                  [{text:probInadimplencia, style: 'centeredText', color: "#FFFFFF", bold: 'true', fontSize: 26}],
              ]
          },
          margin: [-95, 30, 0, 0] // Margem para separar as tabelas   
      }
    ]
  }

  // Tabela de Sócios
  if(partners!==undefined){
    const partnerAuxTable = [];

    for (let partner = 0; partner < partners.length; partner++) {
      const partnerInfo = [
        formatDocumentNumber(partners[partner].documentId),
        partners[partner].name,
        partners[partner].participationPercentage
      ];
      partnerAuxTable.push(partnerInfo);
    }

    var partnerInfoTable = tableGenerator.createInfoTable(
      ["Número de Documento", "Nome / Razão Social", "% Participação"], 
      partnerAuxTable
    );
  }
  
  // Topo - Serasa
  const topo = {
    table: {
        widths: ['*'],
        body: [
            [
                {
                    stack: [
                        { text: 'Serasa', style: 'header', 'fontSize': 16}
                    ],
                    fillColor: '#ADD8E6' // Fundo azul para o texto 'Serasa'
                }
            ]
        ]
    }
  }

  return [
    topo,
    {style: 'contentPDF',text: '\nDados de Identificação'},
    registrationTable,
    {style: 'contentPDF',text: '\nDados de Score'},
    scoreTest,
    //Mensagem de erro do score
    {style: 'contentPDF', fontSize: '12', color:'#b81414',text:'\n'+messageScore},
    {style: 'contentPDF',text: '\nDados de Negativação'},
    pefinTable,
    pefinInfoTable,
    refinTable, 
    refinInfoTable,
    checkTable,
    checkInfoTable,
    notaryTable,
    notaryInfoTable,
    {style: 'contentPDF',text: '\nInformações Societárias'},
    partnerInfoTable
  ];
}

function generateReportContentPF(report, optional) {
  // Dados Pai - JSON
  const registration = report.registration;
  const negativeData = report.negativeData;
  const facts = report.facts.inquiry.inquiryResponse;

  // Dados de negativação
  const pefins = negativeData.pefin.pefinResponse;
  const refins = negativeData.refin.refinResponse;
  const checks = negativeData.check.checkResponse;
  const notarys = negativeData.notary.notaryResponse;

  // Dados Opcionais
  const partners = optional.partner.partnershipResponse;
  console.log({partners})

  const tableFactory = new TableFactory("tableInfos");
  const tableGenerator = new TableGenerator(tableFactory);

  // Tabela Inicial
  const registrationTable = tableGenerator.createInfoTable(
    ["CPF", "Nome", "Nome da Mãe", "Data de Nascimento", "Status", "Cidade", "UF"],
    [[
      formatDocumentNumber(registration.documentNumber),
      registration.consumerName,
      registration.motherName,
      formatDate(registration.birthDate),
      registration.statusRegistration,
      registration.address.city,
      registration.address.state
    ]]
  );

  // Pefin
  const pefinTable = tableGenerator.createHeaderNegativeTable(
    ["PEFIN", negativeData.pefin.summary.count, "Valor Total", formatCurrency(negativeData.pefin.summary.balance)]
  );

  // Refin
  const refinTable = tableGenerator.createHeaderNegativeTable(
    ["REFIN", negativeData.refin.summary.count, "Valor Total", formatCurrency(negativeData.refin.summary.balance)]
  );

  // Check
  const checkTable = tableGenerator.createHeaderNegativeTable(
    ["Cheque sem fundo", negativeData.check.summary.count, "Valor Total", formatCurrency(negativeData.check.summary.balance)]
  );

  // Notary
  const notaryTable = tableGenerator.createHeaderNegativeTable(
    ["Protesto Nacional", negativeData.notary.summary.count, "Valor Total", formatCurrency(negativeData.notary.summary.balance)]
  );

  // Adaptar o código para lidar com notarys de pessoa física, se houver

  //Dados Score
  var score = report.score.score;
  var probInadimplencia = report.score.defaultRate
  var messageScore = "";

  if(score===undefined){
    score = 0;
    probInadimplencia = 0;
    messageScore = report.score.message;
  }

  probInadimplencia = convertToPercentage(probInadimplencia)

  const scoreTest = {
    columns: [
                    
      // Tabela do Score
      {
          style: 'tableScore',
          table: {
              widths: ['25%'],
              body: [
                  [{text:'Score', alignment: 'center', color: "#FFFFFF", bold: 'true', fontSize: 14}],
                  [{text:score, alignment: 'center', color: "#FFFFFF", bold: 'true', fontSize: 26}],
              ]
          },
          margin: [10, 15, 0, 0] // Margem para separar as tabelas
      },
      
      // Texto de probabilidade inadimplência
      {
          text: [
              { text: '\n\nProbabilidade de inadimplência\n---------------------------------------->', alignment: 'center', color: '#F', bold: true, fontSize: 14 },
          ],
          margin: [-250, 0, 0, 0]
      },
      
      // Círculo Teste
      {
       style: 'tableScore',
          table: {
              heights:[20],
              widths: ['35%'],
              body: [
                  [{text:probInadimplencia, style: 'centeredText', color: "#FFFFFF", bold: 'true', fontSize: 26}],
              ]
          },
          margin: [-95, 30, 0, 0] // Margem para separar as tabelas   
      }
    ]
  }
  
  // Tabela de Sócios
  if(partners!==undefined){
    const partnerAuxTable = [];

    for (let partner = 0; partner < partners.length; partner++) {
      console.log(partners[partner]);

      try{
        var partnerInfo = [
          formatDocumentNumber(partners[partner].businessDocument),
          partners[partner].companyName,
          partners[partner].participationPercentage
        ];
      }
      catch{
        var partnerInfo = [
          formatDocumentNumber(partners[partner].documentId),
          partners[partner].name,
          partners[partner].participationPercentage
        ];
      }

      partnerAuxTable.push(partnerInfo);
      //console.log({partnerAuxTable});
    }

    var partnerInfoTable = tableGenerator.createInfoTable(
      ["Número de Documento", "Nome ou Razão Social", "% Participação"], 
      partnerAuxTable
    );

    console.log({partnerAuxTable})
  }
  
  // Topo - Serasa
  const topo = {
    table: {
      widths: ['*'],
      body: [
        [
          {
            stack: [
              { text: 'Serasa', style: 'header', 'fontSize': 16 }
            ],
            fillColor: '#ADD8E6' // Fundo azul para o texto 'Serasa'
          }
        ]
      ]
    }
  };

  return [
    topo,
    { style: 'contentPDF', text: '\nDados de Identificação' },
    registrationTable,
    { style: 'contentPDF', text: '\nDados de Score' },
    scoreTest,
    { style: 'contentPDF', text: '\nDados de Negativação' },
    pefinTable,
    refinTable,
    checkTable,
    notaryTable,
    {style: 'contentPDF',text: '\nInformações Societárias'},
    partnerInfoTable,
  ];
}

export function generateDDPJ(jsonData) {
  console.log('Dentro da função:\n',jsonData)
  return {
    background: createBackground,
    content: generateReportContentPJ(jsonData.reports[0], jsonData.optionalFeatures),
    styles,
    pageSize: { width: 595.276, height: 841.89 },
    pageMargins: [0, 0, 0, 0]
  };
}

export function generateDDPF(jsonData) {
  console.log('Dentro da função:\n',jsonData)

  return {
    background: createBackground,
    content: generateReportContentPF(jsonData.reports[0], jsonData.optionalFeatures),
    styles,
    pageSize: { width: 595.276, height: 841.89 },
    pageMargins: [0, 0, 0, 0]
  };
}

export function createPDF(dd, nomeCliente){

  // Create a new PDF document
  const pdfDocGenerator = pdfMake.createPdf(dd);

  // Download the PDF document
  pdfDocGenerator.download(nomeCliente + '.pdf');
}

/*
// Teste pra exibir resultados das funções
const ddPJ = generateDDPJ(reportDataPJ);
const ddPF = generateDDPF(reportDataPF);

console.log(JSON.stringify(ddPJ, null, 2).replace("null,",""));
*/
