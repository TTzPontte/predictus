import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

function formatarData(data) {
  const partesData = data.split("-");
  const dia = partesData[2];
  const mes = partesData[1];
  const ano = partesData[0];
  const dataFormatada = `${dia}/${mes}/${ano}`;
  return dataFormatada;
}

export function createPDF(jsonFile) {
  //Receber Valores do JSon
  const data = JSON.parse(jsonFile);
  console.log({data})
  //const data = require('./teste.json');

  // Salvar Variáveis de Registro //
  const nomeCliente = data.reports[0].registration.consumerName;
  const numDocumento = data.reports[0].registration.documentNumber;
  const dataNascimento = data.reports[0].registration.birthDate;
  const dataNascimentoFormatada = formatarData(dataNascimento);
  const statusRegistro = data.reports[0].registration.statusRegistration
  let endereco = "Não informado";
  let phone = "Não informado";

  if (data.reports[0].registration.address) {
  const { addressLine, district, city, state } = data.reports[0].registration.address;
  endereco = `${addressLine}, ${district}, ${city}, ${state}`;
  }

  if (data.reports[0].registration.phone) {
    const { regionCode, areaCode, phoneNumber } = data.reports[0].registration.phone;
    phone = `+${regionCode} (${areaCode}) ${phoneNumber}`;
  }

  // Salvar Variáveis de Score //
  const score = data.reports[0].score.score;
  const scoreModel = data.reports[0].score.scoreModel;
  const faixaScore = data.reports[0].score.range;
  const probInadimplencia = data.reports[0].score.defaultRate;
  const mensagemScore = data.reports[0].score.message;

  // Salvar Variáveis de Pefin //
  const pefin = data.reports[0].negativeData.pefin;
  const pefinResponse = pefin.pefinResponse || [];

  // Salvar Variáveis de Refin //
  const refin = data.reports[0].negativeData.refin;
  const refinResponse = refin.refinResponse || [];

  // Salvar Variáveis Protesto Nacional //
  const notory = data.reports[0].negativeData.notary;
  const notoryResponse = notory.notaryResponse || [];

  // Salvar Variáveis Cheque sem Fundo //
  const check = data.reports[0].negativeData.check;
  const checkResponse = check.checkResponse || [];



  // Salvar Variáveis consultas Serasa //
  const inquiry = data.reports[0].facts.inquiry;
  const inquiryResponse = inquiry.inquiryResponse || [];

  // Salvar Variáveis Documentos Roubados //
  const stolenDocuments = data.reports[0].facts.stolenDocuments;

  // Define the content for the PDF document
  const dd = {
    content: [
      //Header Relatório
      {
        text: 'Relatório Serasa - ' + nomeCliente,
        style: 'header',
        alignment: 'center',
        bold: true,
        fontSize: 16
      },
      // Subtitulo Dados de Registro
      {
        text: "\n\nDados de Registro\n\n",
        style: 'header',
        bold: true,
        fontSize: 14
      },
      {
        text:[
          'Nome do cliente: ' + nomeCliente +
          '\nCPF: ' + numDocumento +
          '\nData Nascimento: ' + dataNascimentoFormatada +
          '\nStatus de Registro: ' + statusRegistro +
          '\nEndereço: ' + endereco +
          '\nTelefone: ' + phone
        ],
        style: 'header',
        bold: false,
        fontSize: 12
      },
      {
        text: "\n\nDados de Score\n\n",
        style: 'header',
        bold: true,
        fontSize: 14
      },
      {
        text:[
          { text: 'Score: ', bold: true, fontSize: 14},{ text: score, bold: true, fontSize: 14 },
          '\nModelo: ' + scoreModel +
          '\nFaixa: ' + faixaScore +
          '\nProbabilidade de Inadimplência: ' + probInadimplencia + "%" +
          '\nMensagem: ' + mensagemScore
        ],
        style: 'header',
        bold: false,
        fontSize: 12
      },
      {
        text: "\n\nDados de negativação\n\n",
        style: 'header',
        bold: true,
        fontSize: 14
      }
    ]

  };

  // Pefin
  if (parseInt(pefin.summary.count) > 0 && pefinResponse.length > 0) {
    dd.content.push({ text: `Consulta(s) encontrada(s) - PEFIN : ${pefin.summary.count}`, fontSize: 12, bold:true });

    for (let index = 0; index < pefinResponse.length; index++) {
      const pefinItem = pefinResponse[index];
      // Defina a indentação desejada

      dd.content.push({ text: `Ocorrência - ${index + 1}`, fontSize: 11, margin: [20, 0, 0, 0] });
      dd.content.push({ text: `Data de ocorrência: ${formatarData(pefinItem.occurrenceDate)}`, fontSize: 11, margin: [40, 0, 0, 0] });
      dd.content.push({ text: `Natureza jurídica ID: ${pefinItem.legalNatureId}`, fontSize: 11, margin: [40, 0, 0, 0] });
      dd.content.push({ text: `Natureza jurídica: ${pefinItem.legalNature}`, fontSize: 11, margin: [40, 0, 0, 0] });
      dd.content.push({ text: `ID do contrato: ${pefinItem.contractId}`, fontSize: 11, margin: [40, 0, 0, 0] });
      dd.content.push({ text: `Nome do credor: ${pefinItem.creditorName}`, fontSize: 11, margin: [40, 0, 0, 0] });
      dd.content.push({ text: `Valor: ${pefinItem.amount}`, fontSize: 11, margin: [40, 0, 0, 0] });
      dd.content.push({ text: `Cidade: ${pefinItem.city}`, fontSize: 11, margin: [40, 0, 0, 0] });
      dd.content.push({ text: `Estado: ${pefinItem.federalUnit}`, fontSize: 11, margin: [40, 0, 0, 0] });
      dd.content.push({ text: `Agência pública: ${pefinItem.publicAgency}`, fontSize: 11, margin: [40, 0, 0, 0] });
      dd.content.push({ text: `Valor principal: ${pefinItem.principal}`, fontSize: 11, margin: [40, 0, 0, 0] });


      if (index + 1 === pefinResponse.length) {
        dd.content.push({ text: '\n', fontSize: 11 });
      }
    }
  } else {
    dd.content.push({ text: 'Nenhuma ocorrência de PEFIN encontrada\n', fontSize: 12, bold:true });
  }

  // Refin
  if (parseInt(refin.summary.count) > 0 && refinResponse.length > 0) {
    dd.content.push({ text: `Consulta(s) encontrada(s) - REFIN : ${refin.summary.count}`, fontSize: 12, bold:true });

    for (let index = 0; index < refinResponse.length; index++) {
      const refinItem = refinResponse[index];
      // Defina a indentação desejada

      dd.content.push({ text: `Ocorrência - ${index + 1}`, fontSize: 11, margin: [20, 0, 0, 0] });
      dd.content.push({ text: `Data de ocorrência: ${formatarData(refinItem.occurrenceDate)}`, fontSize: 11, margin: [40, 0, 0, 0] });
      dd.content.push({ text: `Natureza jurídica ID: ${refinItem.legalNatureId}`, fontSize: 11, margin: [40, 0, 0, 0] });
      dd.content.push({ text: `Natureza jurídica: ${refinItem.legalNature}`, fontSize: 11, margin: [40, 0, 0, 0] });
      dd.content.push({ text: `ID do contrato: ${refinItem.contractId}`, fontSize: 11, margin: [40, 0, 0, 0] });
      dd.content.push({ text: `Nome do credor: ${refinItem.creditorName}`, fontSize: 11, margin: [40, 0, 0, 0] });
      dd.content.push({ text: `Valor: ${refinItem.amount}`, fontSize: 11, margin: [40, 0, 0, 0] });
      dd.content.push({ text: `Cidade: ${refinItem.city}`, fontSize: 11, margin: [40, 0, 0, 0] });
      dd.content.push({ text: `Estado: ${refinItem.federalUnit}`, fontSize: 11, margin: [40, 0, 0, 0] });
      dd.content.push({ text: `Agência pública: ${refinItem.publicAgency}`, fontSize: 11, margin: [40, 0, 0, 0] });
      dd.content.push({ text: `Valor principal: ${refinItem.principal}`, fontSize: 11, margin: [40, 0, 0, 0] });


      if (index + 1 === refinResponse.length) {
        dd.content.push({ text: '\n', fontSize: 11 });
      }
    }
  } else {
    dd.content.push({ text: 'Nenhuma ocorrência de REFIN encontrada\n', fontSize: 12, bold:true });
  }

  // Protesto Nacional
  if (parseInt(notory.summary.count) > 0 && notoryResponse.length > 0) {
    dd.content.push({ text: `Consulta(s) encontrada(s) - Protesto Nacional: ${notory.summary.count}`, fontSize: 12, bold:true });

    for (let index = 0; index < notoryResponse.length; index++) {
      const protesto = notoryResponse[index];

      dd.content.push({ text: `Ocorrência: ${index + 1}`, fontSize: 11, margin: [20, 0, 0, 0] });
      dd.content.push({ text: `Data de ocorrência: ${formatarData(protesto.occurrenceDate)}`, fontSize: 11, margin: [40, 0, 0, 0] });
      dd.content.push({ text: `Valor: ${protesto.amount}`, fontSize: 11, margin: [40, 0, 0, 0] });
      dd.content.push({ text: `Número do cartório: ${protesto.officeNumber}`, fontSize: 11, margin: [40, 0, 0, 0] });
      dd.content.push({ text: `Nome do cartório: ${protesto.officeName}`, fontSize: 11, margin: [40, 0, 0, 0] });
      dd.content.push({ text: `Cidade: ${protesto.city}`, fontSize: 11, margin: [40, 0, 0, 0] });
      dd.content.push({ text: `Estado: ${protesto.federalUnit}`, fontSize: 11, margin: [40, 0, 0, 0] });

      if (index + 1 === notoryResponse.length) {
        dd.content.push({ text: '\n', fontSize: 11 });
      }
    }
  } else {
    dd.content.push({ text: 'Nenhuma ocorrência de protesto nacional encontrada\n', fontSize: 12, bold:true });
  }

  //Cheque Sem Fundo
  if (parseInt(check.summary.count) > 0 && checkResponse.length > 0) {
    dd.content.push({ text: `Consulta(s) encontrada(s) - Cheque sem Fundo: ${check.summary.count}`, fontSize: 12, bold:true });

    for (let index = 0; index < checkResponse.length; index++) {
      const check = checkResponse[index];


      dd.content.push({ text: `Ocorrência: ${index + 1}`, fontSize: 11, margin: [20, 0, 0, 0] });
      dd.content.push({ text: `Data de ocorrência: ${formatarData(check.occurrenceDate)}`, fontSize: 11, margin: [40, 0, 0, 0] });
      dd.content.push({ text: `Quadrilátero legal: ${check.legalSquare}`, fontSize: 11, margin: [40, 0, 0, 0] });
      dd.content.push({ text: `ID do banco: ${check.bankId}`, fontSize: 11, margin: [40, 0, 0, 0] });
      dd.content.push({ text: `Nome do banco: ${check.bankName}`, fontSize: 11, margin: [40, 0, 0, 0] });
      dd.content.push({ text: `ID da agência bancária: ${check.bankAgencyId}`, fontSize: 11, margin: [40, 0, 0, 0] });
      dd.content.push({ text: `Número de cheques: ${check.checkCount}`, fontSize: 11, margin: [40, 0, 0, 0] });
      dd.content.push({ text: `Cidade: ${check.city}`, fontSize: 11, margin: [40, 0, 0, 0] });
      dd.content.push({ text: `Unidade Federal: ${check.federalUnit}`, fontSize: 11, margin: [40, 0, 0, 0] });

      if (index + 1 === checkResponse.length) {
        dd.content.push({ text: '\n', fontSize: 11 });
      }
    }
  } else {
    dd.content.push({ text: 'Nenhuma ocorrência de cheque sem fundo encontrada\n', fontSize: 12, bold:true });
    dd.content.push({ text: '', fontSize: 12 });
  }

  // Salvar Variável dos Dados de Sociedade //
  try{
    const dadosSociedades = data.optionalFeatures.partner.partnershipResponse;

    // Dados de Sociedade
    if(dadosSociedades!==undefined){
      dd.content.push({ text: '\n\nDados de Sociedades\n\n', fontSize: 14, bold: true });

      const tableBody = [];

    for (let partner of dadosSociedades) {
      const tableRow = [
        { text: partner.companyName, fontSize: 11 },
        { text: partner.businessDocument, fontSize: 11 },
        { text: `${partner.participationPercentage}%`, fontSize: 11 },
      ];

      tableBody.push(tableRow);
    }

    const table = {
      table: {
        widths: ['*', '*', '*'],
        body: [
          [{ text: 'Razão Social', fontSize: 14, bold: true, alignment: 'center' }, { text: 'CNPJ', fontSize: 14, bold: true, alignment: 'center' }, { text: 'Participação', fontSize: 14, bold: true, alignment: 'center' }],
          ...tableBody,
        ],
      },
    };

    dd.content.push(table);

    }
  }catch(error){
    console.log('erro sociedade pf: ',error)
  }

  //Dados Adicionais

  if(inquiry !== undefined || stolenDocuments !== undefined){
    dd.content.push({ text: '\n\nDados Adicionais\n\n', fontSize: 14, bold: true });

    if (parseInt(inquiry.summary.count) > 0 && inquiryResponse.length > 0) {
      dd.content.push({ text: `Última(s) Consulta(s) no Serasa: ${data.reports[0].facts.inquiry.summary.count}`, fontSize: 11, bold: true });

      for (let index = 0; index < inquiryResponse.length; index++) {
        const inquiryItem = inquiryResponse[index];
        dd.content.push({ text: `Consulta ${index + 1}`, fontSize: 11, margin: [20, 0, 0, 0] });
        dd.content.push({ text: `Data da consulta: ${formatarData(inquiryItem.occurrenceDate)}`, fontSize: 11, margin: [40, 0, 0, 0] });
        dd.content.push({ text: `Segmento da empresa: ${inquiryItem.segmentDescription}`, fontSize: 11, margin: [40, 0, 0, 0] });
        dd.content.push({ text: `Há quantos dias?: ${inquiryItem.daysQuantity}\n`, fontSize: 11, margin: [40, 0, 0, 0] });

        if (index + 1 === inquiryResponse.length) {
          dd.content.push({ text: '\n', fontSize: 10 });
        }
      }
    }

    const items = stolenDocuments.stolenDocumentsResponse || [];

    if (parseInt(stolenDocuments.summary.count) > 0 && items.length > 0) {
      dd.content.push({ text: `Documentos roubados: ${data.reports[0].facts.stolenDocuments.summary.count}`, fontSize: 11, bold: true });

      for (let index = 0; index < items.length; index++) {
        const document = items[index];
        dd.content.push({ text: `Ocorrência: ${index + 1}`, fontSize: 10, margin: [20, 0, 0, 0] });
        dd.content.push({ text: `Data de ocorrência: ${formatarData(document.occurrenceDate)}`, fontSize: 10, margin: [40, 0, 0, 0] });
        dd.content.push({ text: `Data de inclusão: ${document.inclusionDate}`, fontSize: 10, margin: [40, 0, 0, 0] });
        dd.content.push({ text: `Tipo de documento: ${document.documentType}`, fontSize: 10, margin: [40, 0, 0, 0] });
        dd.content.push({ text: `Número do documento: ${document.documentNumber}`, fontSize: 10, margin: [40, 0, 0, 0] });
        dd.content.push({ text: `Autoridade emitente: ${document.issuingAuthority}`, fontSize: 10, margin: [40, 0, 0, 0] });
        dd.content.push({ text: `Motivo detalhado: ${document.detailedReason}`, fontSize: 10, margin: [40, 0, 0, 0] });
        dd.content.push({ text: `Estado de ocorrência: ${document.occurrenceState}`, fontSize: 10, margin: [40, 0, 0, 0] });

        if (index + 1 === items.length) {
          dd.content.push({ text: '\n', fontSize: 10 });
        }
      }
    }

  }


  // Create a new PDF document
  const pdfDocGenerator = pdfMake.createPdf(dd);

  // Download the PDF document
  pdfDocGenerator.download(nomeCliente + '.pdf');

}

export function createPDFPJ(jsonFile) {
  //Receber Valores do JSon
  const data = JSON.parse(jsonFile);
  //const data = require('./pj.json');

  // Salvar Variáveis de Registro //
  const razaoSocial = data.reports[0].registration.companyName;
  const numDocumento = data.reports[0].registration.companyDocument;
  const dataAberturaEmpresa = data.reports[0].registration.foundationDate;
  const dataAberturaEmpresaFormatada = formatarData(dataAberturaEmpresa);
  const statusRegistro = data.reports[0].registration.statusRegistration
  const { city, state } = data.reports[0].registration.address;




  // Salvar Variáveis de Score //
  const score = data.reports[0].score.score;
  const scoreModel = data.reports[0].score.scoreModel;
  const probInadimplencia = data.reports[0].score.defaultRate;
  const mensagemScore = data.reports[0].score.message;

  // Salvar Variáveis de Pefin //
  const pefin = data.reports[0].negativeData.pefin;
  const pefinResponse = pefin.pefinResponse || [];

  // Salvar Variáveis de Refin //
  const refin = data.reports[0].negativeData.refin;
  const refinResponse = refin.refinResponse || [];

  // Salvar Variáveis de Anotações Negativas - Dívidas Vencidas (Convem) //
  const convem = data.reports[0].negativeData.collectionRecords;
  const convemResponse = convem.collectionRecordsResponse || [];

  // Salvar Variáveis Protesto Nacional //
  const notory = data.reports[0].negativeData.notary;
  const notoryResponse = notory.notaryResponse || [];

  // Salvar Variáveis Cheque sem Fundo //
  const check = data.reports[0].negativeData.check;
  const checkResponse = check.checkResponse || [];

  // Variáveis de status para ações judiciais e falências
  let acoesJudStatus = false;
  let falenciaStatus = false;
  let acoesJud = ""
  let acoesJudResponse = "";
  let bankrupts = "";
  let bankruptsResponse = "";

  // Salvar Variáveis Ações Judiciais
  try {
    acoesJud = data.reports[0].negativeData.judgementFilings;
    acoesJudResponse = acoesJud.judgementFilingsResponse || [];

    // Definir status para ações judiciais como true se não houver exceções
    acoesJudStatus = true;
  } catch (error) {
    acoesJudStatus = false;
  }

  // Salvar Variáveis Falência
  try {
    const bankrupts = data.reports[0].negativeData.bankrupts;
    const bankruptsResponse = bankrupts.bankruptsResponse || [];
    falenciaStatus = true;
  } catch (error) {
    falenciaStatus = false;
  }

  // Define the content for the PDF document
  const dd = {
    content: [
      //Header Relatório
      {
        text: 'Relatório Serasa PJ - ' + razaoSocial,
        style: 'header',
        alignment: 'center',
        bold: true,
        fontSize: 16
      },
      // Subtitulo Dados de Registro
      {
        text: "\n\nDados de Registro\n\n",
        style: 'header',
        bold: true,
        fontSize: 14
      },
      {
        text:[
          'Nome do cliente: ' + razaoSocial +
          '\nCPF: ' + numDocumento +
          '\nData Nascimento: ' + dataAberturaEmpresaFormatada +
          '\nStatus de Registro: ' + statusRegistro +
          '\nCidade: ' + city +
          '\nEstado: ' + state
        ],
        style: 'header',
        bold: false,
        fontSize: 12
      },
      {
        text: "\n\nDados de Score\n\n",
        style: 'header',
        bold: true,
        fontSize: 14
      },
      {
        text:[
          { text: 'Score: ', bold: true, fontSize: 14},{ text: score, bold: true, fontSize: 14 },
          '\nModelo: ' + scoreModel +
          '\nProbabilidade de Inadimplência: ' + probInadimplencia + "%" +
          '\nMensagem: ' + mensagemScore
        ],
        style: 'header',
        bold: false,
        fontSize: 12
      },
      {
        text: "\n\nDados de negativação\n\n",
        style: 'header',
        bold: true,
        fontSize: 14
      }
    ]

  };

  // Pefin
  if (parseInt(pefin.summary.count) > 0 && pefinResponse.length > 0) {
    dd.content.push({ text: `Consulta(s) encontrada(s) - PEFIN : ${pefin.summary.count}`, fontSize: 12, bold:true });

    for (let index = 0; index < pefinResponse.length; index++) {
      const pefinItem = pefinResponse[index];
      // Defina a indentação desejada

      dd.content.push({ text: `Ocorrência - ${index + 1}`, fontSize: 11, margin: [20, 0, 0, 0] });
      dd.content.push({ text: `Data de ocorrência: ${formatarData(pefinItem.occurrenceDate)}`, fontSize: 11, margin: [40, 0, 0, 0] });
      dd.content.push({ text: `Natureza jurídica ID: ${pefinItem.legalNatureId}`, fontSize: 11, margin: [40, 0, 0, 0] });
      dd.content.push({ text: `Natureza jurídica: ${pefinItem.legalNature}`, fontSize: 11, margin: [40, 0, 0, 0] });
      dd.content.push({ text: `ID do contrato: ${pefinItem.contractId}`, fontSize: 11, margin: [40, 0, 0, 0] });
      dd.content.push({ text: `Nome do credor: ${pefinItem.creditorName}`, fontSize: 11, margin: [40, 0, 0, 0] });
      dd.content.push({ text: `Valor: ${pefinItem.amount}`, fontSize: 11, margin: [40, 0, 0, 0] });
      dd.content.push({ text: `Estado: ${pefinItem.federalUnit}`, fontSize: 11, margin: [40, 0, 0, 0] });
      dd.content.push({ text: `Valor principal: ${pefinItem.principal}`, fontSize: 11, margin: [40, 0, 0, 0] });


      if (index + 1 === pefinResponse.length) {
        dd.content.push({ text: '\n', fontSize: 11 });
      }
    }
  } else {
    dd.content.push({ text: 'Nenhuma ocorrência de PEFIN encontrada\n', fontSize: 12, bold:true });
  }

  // Refin
  if (parseInt(refin.summary.count) > 0 && refinResponse.length > 0) {
    dd.content.push({ text: `Consulta(s) encontrada(s) - REFIN : ${refin.summary.count}`, fontSize: 12, bold:true });

    for (let index = 0; index < refinResponse.length; index++) {
      const refinItem = refinResponse[index];
      // Defina a indentação desejada

      dd.content.push({ text: `Ocorrência - ${index + 1}`, fontSize: 11, margin: [20, 0, 0, 0] });
      dd.content.push({ text: `Data de ocorrência: ${formatarData(refinItem.occurrenceDate)}`, fontSize: 11, margin: [40, 0, 0, 0] });
      dd.content.push({ text: `Natureza jurídica ID: ${refinItem.legalNatureId}`, fontSize: 11, margin: [40, 0, 0, 0] });
      dd.content.push({ text: `Natureza jurídica: ${refinItem.legalNature}`, fontSize: 11, margin: [40, 0, 0, 0] });
      dd.content.push({ text: `ID do contrato: ${refinItem.contractId}`, fontSize: 11, margin: [40, 0, 0, 0] });
      dd.content.push({ text: `Nome do credor: ${refinItem.creditorName}`, fontSize: 11, margin: [40, 0, 0, 0] });
      dd.content.push({ text: `Valor: ${refinItem.amount}`, fontSize: 11, margin: [40, 0, 0, 0] });
      dd.content.push({ text: `Estado: ${refinItem.federalUnit}`, fontSize: 11, margin: [40, 0, 0, 0] });
      dd.content.push({ text: `Valor principal: ${refinItem.principal}`, fontSize: 11, margin: [40, 0, 0, 0] });


      if (index + 1 === refinResponse.length) {
        dd.content.push({ text: '\n', fontSize: 11 });
      }
    }
  } else {
    dd.content.push({ text: 'Nenhuma ocorrência de REFIN encontrada\n', fontSize: 12, bold:true });
  }

  // Protesto Nacional
  if (parseInt(notory.summary.count) > 0 && notoryResponse.length > 0) {
    dd.content.push({ text: `Consulta(s) encontrada(s) - Protesto Nacional: ${notory.summary.count}`, fontSize: 12, bold:true });

    for (let index = 0; index < notoryResponse.length; index++) {
      const protesto = notoryResponse[index];

      dd.content.push({ text: `Ocorrência: ${index + 1}`, fontSize: 11, margin: [20, 0, 0, 0] });
      dd.content.push({ text: `Data de ocorrência: ${formatarData(protesto.occurrenceDate)}`, fontSize: 11, margin: [40, 0, 0, 0] });
      dd.content.push({ text: `Valor: ${protesto.amount}`, fontSize: 11, margin: [40, 0, 0, 0] });
      dd.content.push({ text: `Número do cartório: ${protesto.officeNumber}`, fontSize: 11, margin: [40, 0, 0, 0] });
      dd.content.push({ text: `Nome do cartório: ${protesto.officeName}`, fontSize: 11, margin: [40, 0, 0, 0] });
      dd.content.push({ text: `Cidade: ${protesto.city}`, fontSize: 11, margin: [40, 0, 0, 0] });
      dd.content.push({ text: `Estado: ${protesto.federalUnit}`, fontSize: 11, margin: [40, 0, 0, 0] });

      if (index + 1 === notoryResponse.length) {
        dd.content.push({ text: '\n', fontSize: 11 });
      }
    }
  } else {
    dd.content.push({ text: 'Nenhuma ocorrência de protesto nacional encontrada\n', fontSize: 12, bold:true });
  }

  //Cheque Sem Fundo
  if (parseInt(check.summary.count) > 0 && checkResponse.length > 0) {
    dd.content.push({ text: `Consulta(s) encontrada(s) - Cheque sem Fundo: ${check.summary.count}`, fontSize: 12, bold:true });

    for (let index = 0; index < checkResponse.length; index++) {
      const check = checkResponse[index];


      dd.content.push({ text: `Ocorrência: ${index + 1}`, fontSize: 11, margin: [20, 0, 0, 0] });
      dd.content.push({ text: `Data de ocorrência: ${formatarData(check.occurrenceDate)}`, fontSize: 11, margin: [40, 0, 0, 0] });
      dd.content.push({ text: `ID Motivo devolução: ${check.alinea}`, fontSize: 11, margin: [40, 0, 0, 0] });
      dd.content.push({ text: `ID do banco: ${check.bankId}`, fontSize: 11, margin: [40, 0, 0, 0] });
      dd.content.push({ text: `Nome do banco: ${check.bankName}`, fontSize: 11, margin: [40, 0, 0, 0] });
      dd.content.push({ text: `ID da agência bancária: ${check.bankAgencyId}`, fontSize: 11, margin: [40, 0, 0, 0] });
      dd.content.push({ text: `Número de cheques: ${check.checkCount}`, fontSize: 11, margin: [40, 0, 0, 0] });
      dd.content.push({ text: `Cidade: ${check.city}`, fontSize: 11, margin: [40, 0, 0, 0] });
      dd.content.push({ text: `Estado: ${check.federalUnit}`, fontSize: 11, margin: [40, 0, 0, 0] });

      if (index + 1 === checkResponse.length) {
        dd.content.push({ text: '\n', fontSize: 11 });
      }
    }
  } else {
    dd.content.push({ text: 'Nenhuma ocorrência de cheque sem fundo encontrada\n', fontSize: 12, bold:true });
    dd.content.push({ text: '', fontSize: 12 });
  }

  //Dívidas Vencidas - Convem
  if (parseInt(convem.summary.count) > 0 && convemResponse.length > 0) {
    dd.content.push({ text: `Consulta(s) encontrada(s) - Dívidas Vencidas (Convem): ${convem.summary.count}`, fontSize: 12, bold:true });

    for (let index = 0; index < convemResponse.length; index++) {
      const convem = convemResponse[index];


      dd.content.push({ text: `Ocorrência: ${index + 1}`, fontSize: 11, margin: [20, 0, 0, 0] });
      dd.content.push({ text: `Data de ocorrência: ${formatarData(convem.occurrenceDate)}`, fontSize: 11, margin: [40, 0, 0, 0] });
      dd.content.push({ text: `Natureza da dívida: ${convem.legalNature}`, fontSize: 11, margin: [40, 0, 0, 0] });
      dd.content.push({ text: `Nome do credor: ${convem.creditorName}`, fontSize: 11, margin: [40, 0, 0, 0] });
      dd.content.push({ text: `Valor da dívida: ${convem.amount}`, fontSize: 11, margin: [40, 0, 0, 0] });
      dd.content.push({ text: `Cidade: ${convem.city}`, fontSize: 11, margin: [40, 0, 0, 0] });
      dd.content.push({ text: `Estado: ${convem.federalUnit}`, fontSize: 11, margin: [40, 0, 0, 0] });

      if (index + 1 === convemResponse.length) {
        dd.content.push({ text: '\n', fontSize: 11 });
      }
    }
  } else {
    dd.content.push({ text: 'Nenhuma ocorrência de dívidas vencidas.\n', fontSize: 12, bold:true });
  }

  //Ações Judiciais
  if(acoesJudStatus===true){
    if (parseInt(acoesJud.summary.count) > 0 && acoesJudResponse.length > 0) {
      dd.content.push({ text: `Consulta(s) encontrada(s) - Ações Judiciais: ${acoesJud.summary.count}`, fontSize: 12, bold:true });

      for (let index = 0; index < acoesJudResponse.length; index++) {
        const acoesJudiciais = acoesJudResponse[index];


        dd.content.push({ text: `Ocorrência: ${index + 1}`, fontSize: 11, margin: [20, 0, 0, 0] });
        dd.content.push({ text: `Data de ocorrência: ${formatarData(acoesJudiciais.occurrenceDate)}`, fontSize: 11, margin: [40, 0, 0, 0] });
        dd.content.push({ text: `Natureza da dívida: ${acoesJudiciais.legalNature}`, fontSize: 11, margin: [40, 0, 0, 0] });
        dd.content.push({ text: `Nome do distribuidor: ${acoesJudiciais.distributor}`, fontSize: 11, margin: [40, 0, 0, 0] });
        dd.content.push({ text: `Valor da dívida: ${acoesJudiciais.amount}`, fontSize: 11, margin: [40, 0, 0, 0] });
        dd.content.push({ text: `ID vara judicial: ${acoesJudiciais.civilCourt}`, fontSize: 11, margin: [40, 0, 0, 0] });
        dd.content.push({ text: `Cidade: ${acoesJudiciais.city}`, fontSize: 11, margin: [40, 0, 0, 0] });
        dd.content.push({ text: `Estado: ${acoesJudiciais.state}`, fontSize: 11, margin: [40, 0, 0, 0] });

        if (index + 1 === acoesJudResponse.length) {
          dd.content.push({ text: '\n', fontSize: 11 });
        }
      }
    } else {
      dd.content.push({ text: 'Nenhuma ocorrência de ações judiciais\n', fontSize: 12, bold:true });
    }
  }

  //Falência
  if(falenciaStatus===true){
    if (parseInt(bankrupts.summary.count) > 0 && bankruptsResponse.length > 0) {
      dd.content.push({ text: `Consulta(s) encontrada(s) - Falência: ${bankrupts.summary.count}`, fontSize: 12, bold:true });

      for (let index = 0; index < bankruptsResponse.length; index++) {
        const falencia = bankruptsResponse[index];


        dd.content.push({ text: `Ocorrência: ${index + 1}`, fontSize: 11, margin: [20, 0, 0, 0] });
        dd.content.push({ text: `Data da falência: ${formatarData(falencia.eventDate)}`, fontSize: 11, margin: [40, 0, 0, 0] });
        dd.content.push({ text: `Tipo de falência: ${falencia.eventType}`, fontSize: 11, margin: [40, 0, 0, 0] });
        dd.content.push({ text: `Origem: ${falencia.origin}`, fontSize: 11, margin: [40, 0, 0, 0] });
        dd.content.push({ text: `Cidade: ${falencia.city}`, fontSize: 11, margin: [40, 0, 0, 0] });
        dd.content.push({ text: `Estado: ${falencia.state}`, fontSize: 11, margin: [40, 0, 0, 0] });

        if (index + 1 === bankruptsResponse.length) {
          dd.content.push({ text: '\n', fontSize: 11 });
        }
      }
    } else {
      dd.content.push({ text: 'Nenhuma ocorrência de falências\n', fontSize: 12, bold:true });
    }
  }

  // Salvar Variável dos Dados de Sociedade //
  try {
    const dadosSociedades = data.optionalFeatures.partner.PartnerResponse.results;
    // Dados de Sociedade
    if(dadosSociedades!==undefined){
      dd.content.push({ text: '\n\nDados de Sociedades\n\n', fontSize: 14, bold: true });

      const tableBody = [];

    for (let partner of dadosSociedades) {
      const tableRow = [
        { text: partner.name, fontSize: 11 },
        { text: partner.documentId, fontSize: 11 },
        { text: `${partner.participationPercentage}%`, fontSize: 11 },
      ];

      tableBody.push(tableRow);
    }

    const table = {
      table: {
        widths: ['*', '*', '*'],
        body: [
          [{ text: 'Razão Social', fontSize: 14, bold: true, alignment: 'center' }, { text: 'CNPJ', fontSize: 14, bold: true, alignment: 'center' }, { text: 'Participação', fontSize: 14, bold: true, alignment: 'center' }],
          ...tableBody,
        ],
      },
    };

    dd.content.push(table);

    }
  }
  catch(error){
    console.log('Não existe sócios para esse cnpj.')
  }

  // Create a new PDF document
  const pdfDocGenerator = pdfMake.createPdf(dd);

  // Download the PDF document
  pdfDocGenerator.download(razaoSocial + '.pdf');

}
