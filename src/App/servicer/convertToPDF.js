const PDFDocument = require('pdfkit');
const fs = require('fs');

const rawData = fs.readFileSync('./consulta.json');
const data = JSON.parse(rawData);

const doc = new PDFDocument();
doc.pipe(fs.createWriteStream('relatorio.pdf'));

// Declarar Identação
const indentation = '    '; // Four spaces for each level of indentation

// Cabeçalho do relatório
doc.fontSize(14).text(`Relatório Serasa -  ${data.reports[0].registration.consumerName}`, { align: 'center', bold: true });
doc.moveDown();
doc.fontSize(14).text('Dados do registro', { underline: true, bold:true });
doc.moveDown();

// Dados do registro
const nomeCliente = data.reports[0].registration.consumerName;
doc.fontSize(11).text(`Nome: ${data.reports[0].registration.consumerName}`);
doc.fontSize(11).text(`CPF: ${data.reports[0].registration.documentNumber}`);
const dataNascimento = data.reports[0].registration.birthDate;
const partesData = dataNascimento.split("-"); // Divide a data em ano, mês e dia
const dia = partesData[2];
const mes = partesData[1];
const ano = partesData[0];
const dataFormatada = `${dia}/${mes}/${ano}`;
doc.fontSize(11).text(`Data de nascimento: ${dataFormatada}`);
doc.fontSize(11).text(`Status do registro: ${data.reports[0].registration.statusRegistration}`);
let address = "Não informado";
if (data.reports[0].registration.address) {
  const { addressLine, district, city, state } = data.reports[0].registration.address;
  address = `${addressLine}, ${district}, ${city}, ${state}`;
}

let phone = "Não informado";
if (data.reports[0].registration.phone) {
  const { regionCode, areaCode, phoneNumber } = data.reports[0].registration.phone;
  phone = `+${regionCode} (${areaCode}) ${phoneNumber}`;
}

doc.fontSize(11).text(`Endereço: ${address}`);
doc.fontSize(11).text(`Telefone: ${phone}`);

doc.moveDown();

// Dados de score
doc.fontSize(14).text('Dados de score', { underline: true, bold:true  });
doc.moveDown();
doc.fontSize(11).text(`Score: ${data.reports[0].score.score}`);
doc.fontSize(11).text(`Modelo: ${data.reports[0].score.scoreModel}`);
doc.fontSize(11).text(`Faixa: ${data.reports[0].score.range}`);
doc.fontSize(11).text(`Probalidade de Não Pagamento: ${data.reports[0].score.defaultRate}%`);
doc.fontSize(11).text(`Mensagem: ${data.reports[0].score.message}`);
doc.moveDown();

// Dados de negativação
doc.fontSize(14).text('Dados de negativação', { underline: true, bold: true });
doc.moveDown();

// Pefin
const pefin = data.reports[0].negativeData.pefin;
const pefinResponse = pefin.refinResponse || [];

if (parseInt(pefin.summary.count) > 0 && pefinResponse.length > 0) {
  doc.fontSize(11).text(`Pefin: ${pefin.summary.count}`);
  for (let index = 0; index < pefinResponse.length; index++) {
    const pefin = pefinResponse[index];
    doc.fontSize(11).text(`Ocorrência: ${index + 1}`);
    doc.fontSize(11).text(`Data de ocorrência: ${pefin.occurrenceDate}`);
    doc.fontSize(11).text(`Natureza jurídica ID: ${pefin.legalNatureId}`);
    doc.fontSize(11).text(`Natureza jurídica: ${pefin.legalNature}`);
    doc.fontSize(11).text(`ID do contrato: ${pefin.contractId}`);
    doc.fontSize(11).text(`Nome do credor: ${pefin.creditorName}`);
    doc.fontSize(11).text(`Valor: ${pefin.amount}`);
    doc.fontSize(11).text(`Cidade: ${pefin.city}`);
    doc.fontSize(11).text(`Unidade Federal: ${pefin.federalUnit}`);
    doc.fontSize(11).text(`Agência pública: ${pefin.publicAgency}`);
    doc.fontSize(11).text(`Valor principal: ${pefin.principal}`);
    if(index+1===pefinResponse.length){
      doc.moveDown();
    }
  }
} else {
  doc.fontSize(11).text('Nenhuma ocorrência de Pefin encontrada');
  doc.moveDown();
}

// Refin
const refin = data.reports[0].negativeData.refin;
const refinResponse = refin.refinResponse || [];

if (parseInt(refin.summary.count) > 0 && refinResponse.length > 0) {
  doc.fontSize(11).text(`Refin: ${refin.summary.count}`);
  for (let index = 0; index < refinResponse.length; index++) {
    const refin = refinResponse[index];
    doc.fontSize(11).text(`Ocorrência: ${index + 1}`);
    doc.fontSize(11).text(`Data de ocorrência: ${refin.occurrenceDate}`);
    doc.fontSize(11).text(`Natureza jurídica ID: ${refin.legalNatureId}`);
    doc.fontSize(11).text(`Natureza jurídica: ${refin.legalNature}`);
    doc.fontSize(11).text(`ID do contrato: ${refin.contractId}`);
    doc.fontSize(11).text(`Nome do credor: ${refin.creditorName}`);
    doc.fontSize(11).text(`Valor: ${refin.amount}`);
    doc.fontSize(11).text(`Cidade: ${refin.city}`);
    doc.fontSize(11).text(`Unidade Federal: ${refin.federalUnit}`);
    doc.fontSize(11).text(`Agência pública: ${refin.publicAgency}`);
    doc.fontSize(11).text(`Valor principal: ${refin.principal}`);
    if(index+1===refinResponse.length){
      doc.moveDown();
    }
  }
} else {
  doc.fontSize(11).text('Nenhuma ocorrência de Refin encontrada');
  doc.moveDown();
}

// Protesto Nacional
const notory = data.reports[0].negativeData.notary;
const notoryResponse = notory.notaryResponse || [];

if (parseInt(notory.summary.count) > 0 && notoryResponse.length > 0) {
  doc.fontSize(11).text(`Protesto Nacional: ${notory.summary.count}`);
  for (let index = 0; index < notoryResponse.length; index++) {
    const protesto = notoryResponse[index];
    doc.fontSize(11).text(`${indentation}Ocorrência: ${index + 1}`);
    doc.fontSize(11).text(`${indentation}Data de ocorrência: ${protesto.occurrenceDate}`);
    doc.fontSize(11).text(`${indentation}Valor: ${protesto.amount}`);
    doc.fontSize(11).text(`${indentation}Número do cartório: ${protesto.officeNumber}`);
    doc.fontSize(11).text(`${indentation}Nome do cartório: ${protesto.officeName}`);
    doc.fontSize(11).text(`${indentation}Cidade: ${protesto.city}`);
    doc.fontSize(11).text(`${indentation}Estado: ${protesto.federalUnit}`);
    if(index+1===notoryResponse.length){
      doc.moveDown();
    }
  }
} else {
  doc.fontSize(11).text('Nenhuma ocorrência de Protesto Nacional encontrada');
  doc.moveDown();
}

// Cheque sem Fundo
const check = data.reports[0].negativeData.check;
const checkResponse = check.checkResponse || [];

if (parseInt(check.summary.count) > 0 && checkResponse.length > 0) {
  doc.fontSize(11).text(`Cheque sem Fundo: ${check.summary.count}`);
  for (let index = 0; index < checkResponse.length; index++) {
    const check = checkResponse[index];
    doc.fontSize(11).text(`${indentation}Ocorrência: ${index + 1}`);
    doc.fontSize(11).text(`${indentation}Data de ocorrência: ${check.occurrenceDate}`);
    doc.fontSize(11).text(`${indentation}Quadrilátero legal: ${check.legalSquare}`);
    doc.fontSize(11).text(`${indentation}ID do banco: ${check.bankId}`);
    doc.fontSize(11).text(`${indentation}Nome do banco: ${check.bankName}`);
    doc.fontSize(11).text(`${indentation}ID da agência bancária: ${check.bankAgencyId}`);
    doc.fontSize(11).text(`${indentation}Número de cheques: ${check.checkCount}`);
    doc.fontSize(11).text(`${indentation}Cidade: ${check.city}`);
    doc.fontSize(11).text(`${indentation}Unidade Federal: ${check.federalUnit}`);
    if(index+1===checkResponse.length){
      doc.moveDown();
    }
  }
} else {
  doc.fontSize(11).text('Nenhuma ocorrência de Cheque sem Fundo encontrada');
  doc.moveDown();
}

doc.moveDown();

//Dados Sociedade
doc.fontSize(14).text('Dados de Sociedades', { underline: true, bold:true }).moveDown();
for (let partner of data.optionalFeatures.partner.partnershipResponse) {
  doc.fontSize(11).text(`Razão Social: ${partner.companyName}`);
  doc.fontSize(11).text(`CNPJ: ${partner.businessDocument}`);
  doc.fontSize(11).text(`% Participação: ${partner.participationPercentage}%`);
  // Escrever os demais dados de cada parceiro
  doc.moveDown();
}
doc.moveDown();
doc.moveDown();
// Dados Informações Complementares
doc.fontSize(14).text('Informações Complementares', { underline: true, bold: true });
doc.moveDown();


// Verificar se há consultas Serasa e exibir campos adicionais
const inquiry = data.reports[0].facts.inquiry;
const inquiryResponse = inquiry.inquiryResponse || [];

if (parseInt(inquiry.summary.count) > 0 && inquiryResponse.length > 0) {
  doc.fontSize(11).text(`Consultas Serasa: ${data.reports[0].facts.inquiry.summary.count}`, {bold: true});
  for (let index = 0; index < inquiryResponse.length; index++) {
    const inquiryItem = inquiryResponse[index];
    doc.fontSize(10).text(`Consulta ${index + 1}`);
    doc.fontSize(10).text(`Data da consulta: ${inquiryItem.occurrenceDate}`);
    doc.fontSize(10).text(`Segmento da empresa: ${inquiryItem.segmentDescription}`);
    doc.fontSize(10).text(`Há quantos dias?: ${inquiryItem.daysQuantity}`);
    if(index+1===inquiryResponse.length){
      doc.moveDown();
    }
  }
} else {
  doc.fontSize(11).text('Nenhuma consulta Serasa encontrada');
  doc.moveDown();
}

// Verificar se há documentos roubados e exibir campos adicionais
const stolenDocuments = data.reports[0].facts.stolenDocuments;
console.log(stolenDocuments.summary.count);

const items = stolenDocuments.stolenDocumentsResponse || [];

if (parseInt(stolenDocuments.summary.count) > 0 && items.length > 0) {
  doc.fontSize(11).text(`Documentos roubados: ${data.reports[0].facts.stolenDocuments.summary.count}`, {bold: true});
  for (let index = 0; index < items.length; index++) {
    const document = items[index];
    doc.moveDown();
    doc.fontSize(10).text(`Ocorrência: ${index + 1}`);
    doc.fontSize(10).text(`Data de ocorrência: ${document.occurrenceDate}`);
    doc.fontSize(10).text(`Data de inclusão: ${document.inclusionDate}`);
    doc.fontSize(10).text(`Tipo de documento: ${document.documentType}`);
    doc.fontSize(10).text(`Número do documento: ${document.documentNumber}`);
    doc.fontSize(10).text(`Autoridade emitente: ${document.issuingAuthority}`);
    doc.fontSize(10).text(`Motivo detalhado: ${document.detailedReason}`);
    doc.fontSize(10).text(`Estado de ocorrência: ${document.occurrenceState}`);
    if(index+1===items.length){
      doc.moveDown();
    }
  }
} else {
  doc.fontSize(11).text('Nenhuma ocorrência de documentos roubados encontrada');
  doc.moveDown();
}

// Adicionar uma nova página para escrever os dados da optionalFeatures
//doc.addPage();


// Salvar o documento PDF no disco
doc.pipe(fs.createWriteStream(nomeCliente + '.pdf'));
doc.end();
