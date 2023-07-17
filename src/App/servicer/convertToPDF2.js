import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

function formatarData(data) {
  if (data) {
    const partesData = data.split("-");
    const [ano, mes, dia] = partesData;
    return `${dia}/${mes}/${ano}`;
  }
  return "";
}

function createSection(title, content) {
  return [
    { text: `${title}\n\n`, style: "header", bold: true, fontSize: 14 },
    { text: content, style: "header", bold: false, fontSize: 12 }
  ];
}

function createOccurrencesSection(title, occurrences) {
  if (occurrences) {
    const summaryCount = parseInt(occurrences.summary.count);

    if (summaryCount > 0 && occurrences.occurrenceResponse && occurrences.occurrenceResponse.length > 0) {
      const occurrenceContent = occurrences.occurrenceResponse.map((occurrence, index) => {
        const content = [
          { text: `Ocorrência - ${index + 1}`, fontSize: 11, margin: [20, 0, 0, 0] },
          { text: `Data de ocorrência: ${formatarData(occurrence.occurrenceDate)}`, fontSize: 11, margin: [40, 0, 0, 0] },
          { text: `Natureza jurídica ID: ${occurrence.legalNatureId}`, fontSize: 11, margin: [40, 0, 0, 0] },
          { text: `Natureza jurídica: ${occurrence.legalNature}`, fontSize: 11, margin: [40, 0, 0, 0] },
          { text: `ID do contrato: ${occurrence.contractId}`, fontSize: 11, margin: [40, 0, 0, 0] },
          { text: `Nome do credor: ${occurrence.creditorName}`, fontSize: 11, margin: [40, 0, 0, 0] },
          { text: `Valor: ${occurrence.amount}`, fontSize: 11, margin: [40, 0, 0, 0] },
          { text: `Cidade: ${occurrence.city}`, fontSize: 11, margin: [40, 0, 0, 0] },
          { text: `Estado: ${occurrence.federalUnit}`, fontSize: 11, margin: [40, 0, 0, 0] },
          { text: `Agência pública: ${occurrence.publicAgency}`, fontSize: 11, margin: [40, 0, 0, 0] },
          { text: `Valor principal: ${occurrence.principal}`, fontSize: 11, margin: [40, 0, 0, 0] }
        ];

        if (index + 1 === occurrences.occurrenceResponse.length) {
          content.push({ text: "\n", fontSize: 11 });
        }

        return content;
      });

      const sectionContent = [
        { text: `${title}: ${summaryCount}`, fontSize: 12, bold: true },
        ...occurrenceContent.flat()
      ];

      return createSection(title, sectionContent);
    }
  }

  return createSection(title, `Nenhuma ocorrência de ${title} encontrada\n`);
}

function createPDF(jsonFile) {
  const data = JSON.parse(jsonFile);
  const nomeCliente = data.reports && data.reports[0].registration.consumer;
  const numDocumento = data.reports && data.reports[0].registration.document;
  const dataConsulta = formatarData(data.reports && data.reports[0].registration.consultDate);

  const content = [
    { text: "Relatório de Consulta", style: "header", bold: true, fontSize: 16 },
    { text: `Cliente: ${nomeCliente || ""}`, fontSize: 14, margin: [0, 10, 0, 0] },
    { text: `Documento: ${numDocumento || ""}`, fontSize: 14, margin: [0, 5, 0, 0] },
    { text: `Data da Consulta: ${dataConsulta || ""}`, fontSize: 14, margin: [0, 5, 0, 0] },
    { text: "\n" },
    ...(nomeCliente ? createSection("Dados Cadastrais", data.reports[0].registration.registerData) : []),
    ...(nomeCliente ? createSection("Dados de Pontuação", data.reports[0].score.scoreData) : []),
    ...(nomeCliente ? createOccurrencesSection("PEFIN", data.reports[0].occurrences.PEFIN) : []),
    ...(nomeCliente ? createOccurrencesSection("REFIN", data.reports[0].occurrences.REFIN) : []),
    ...(nomeCliente ? createOccurrencesSection("Protesto Nacional", data.reports[0].occurrences.ProtestoNacional) : []),
    ...(nomeCliente ? createOccurrencesSection("Cheque sem Fundo", data.reports[0].occurrences.ChequeSemFundo) : [])
  ];

  const docDefinition = {
    content: content,
    styles: {
      header: {
        fontSize: 12
      }
    }
  };

  pdfMake.createPdf(docDefinition).open();
}

function createPDFPJ(jsonFile) {
  const data = JSON.parse(jsonFile);
  const nomeCliente = data.reports && data.reports[0].registration.companyName;
  const numDocumento = data.reports && data.reports[0].registration.document;
  const dataConsulta = formatarData(data.reports && data.reports[0].registration.consultDate);

  const content = [
    { text: "Relatório de Consulta", style: "header", bold: true, fontSize: 16 },
    { text: `Cliente: ${nomeCliente || ""}`, fontSize: 14, margin: [0, 10, 0, 0] },
    { text: `Documento: ${numDocumento || ""}`, fontSize: 14, margin: [0, 5, 0, 0] },
    { text: `Data da Consulta: ${dataConsulta || ""}`, fontSize: 14, margin: [0, 5, 0, 0] },
    { text: "\n" },
    ...(nomeCliente ? createSection("Dados Cadastrais", data.reports[0].registration.registerData) : []),
    ...(nomeCliente ? createSection("Dados de Pontuação", data.reports[0].score.scoreData) : []),
    ...(nomeCliente ? createOccurrencesSection("PEFIN", data.reports[0].occurrences.PEFIN) : []),
    ...(nomeCliente ? createOccurrencesSection("REFIN", data.reports[0].occurrences.REFIN) : []),
    ...(nomeCliente ? createOccurrencesSection("Protesto Nacional", data.reports[0].occurrences.ProtestoNacional) : []),
    ...(nomeCliente ? createOccurrencesSection("Cheque sem Fundo", data.reports[0].occurrences.ChequeSemFundo) : [])
  ];

  const docDefinition = {
    content: content,
    styles: {
      header: {
        fontSize: 12
      }
    }
  };

  pdfMake.createPdf(docDefinition).open();
}

export { createPDF, createPDFPJ };
