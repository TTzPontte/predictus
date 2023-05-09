const PDFDocument = require('pdfkit');
const fs = require('fs');

const rawData = fs.readFileSync('./teste.json');
const data = JSON.parse(rawData);

const doc = new PDFDocument();
doc.pipe(fs.createWriteStream('relatorio.pdf'));

// Cabeçalho do relatório
doc.fontSize(16).text(`Relatório Serasa -  ${data.reports[0].registration.consumerName}`, { align: 'center', bold: true });
doc.moveDown();
doc.fontSize(14).text('Dados do registro', { underline: true });
doc.moveDown();

// Dados do registro
doc.text(`Nome: ${data.reports[0].registration.consumerName}`);
doc.text(`CPF: ${data.reports[0].registration.documentNumber}`);
doc.text(`Data de nascimento: ${data.reports[0].registration.birthDate}`);
doc.text(`Status do registro: ${data.reports[0].registration.statusRegistration}`);
doc.text(`Endereço: ${data.reports[0].registration.address.addressLine}, ${data.reports[0].registration.address.district}, ${data.reports[0].registration.address.city}, ${data.reports[0].registration.address.state}`);
doc.text(`Telefone: +${data.reports[0].registration.phone.regionCode} (${data.reports[0].registration.phone.areaCode}) ${data.reports[0].registration.phone.phoneNumber}`);

doc.moveDown();

// Dados de negativação
doc.fontSize(14).text('Dados de negativação', { underline: true });
doc.moveDown();
doc.text(`Pefin: ${data.reports[0].negativeData.pefin.summary.count}`);
doc.text(`Refin: ${data.reports[0].negativeData.refin.summary.count}`);
doc.text(`Notary: ${data.reports[0].negativeData.notary.summary.count}`);
doc.text(`Check: ${data.reports[0].negativeData.check.summary.count}`);

doc.moveDown();

// Dados de score
doc.fontSize(14).text('Dados de score', { underline: true });
doc.moveDown();
doc.text(`Score: ${data.reports[0].score.score}`);
doc.text(`Modelo: ${data.reports[0].score.scoreModel}`);
doc.text(`Faixa: ${data.reports[0].score.range}`);
doc.text(`Taxa de inadimplência: ${data.reports[0].score.defaultRate}%`);
doc.text(`Mensagem: ${data.reports[0].score.message}`);

doc.moveDown();

// Dados de fatos
doc.fontSize(14).text('Dados de fatos', { underline: true });
doc.moveDown();
doc.text(`Consultas: ${data.reports[0].facts.inquiry.summary.count}`);
doc.text(`Documentos roubados: ${data.reports[0].facts.stolenDocuments.summary.count}`);


// Adicionar uma nova página para escrever os dados da optionalFeatures
doc.addPage();
doc.fontSize(18).text('Dados de Sociedades', { underline: true, bold:true }).moveDown();
for (let partner of data.optionalFeatures.partner.partnershipResponse) {
  doc.fontSize(14).text(`Razão Social: ${partner.companyName}`);
  doc.fontSize(14).text(`CNPJ: ${partner.businessDocument}`);
  doc.fontSize(14).text(`% Participação: ${partner.participationPercentage}`);
  // Escrever os demais dados de cada parceiro
  doc.moveDown();
}

// Salvar o documento PDF no disco
doc.pipe(fs.createWriteStream('report.pdf'));
doc.end();
