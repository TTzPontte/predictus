import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
// import { Table } from "@aws-amplify/ui-react";

const TableBody = ({ list, header }) => (
  <tbody>
    {list.map((item, index) => (
      <TableRow {...{ item, index, header }} />
    ))}
  </tbody>
);

const TableHeader = ({ header }) => {
  const translationMap = {
    documentNumber: 'Número do documento',
    consumerName: 'Nome do consumidor',
    motherName: 'Nome da mãe',
    birthDate: 'Data de nascimento',
    statusRegistration: 'Status do registro',
    address: 'Endereço',
    addressLine: "Logradouro",
    district: "Bairro",
    zipCode: "CEP",
    country: "País",
    city: "Cidade",
    state: "Estado",
    phone: 'Telefone',
    regionCode: "DDI",
    areaCode: "DDD",
    phoneNumber: "Número de Telefone",
    registration: "Registro",
    negativeData: "Dados Negativos",
    score: "Score",
    facts: "Fatos",
    
    //Tradução Optional - PARTICIPAÇÃO SOCIETÁRIA
    partner:"Sócio",
    businessDocument:"CNPJ",
    companyName:"Razão Social",
    companyAlias:"Nome Fantasia",
    sinceDate:"Data Referência",
    participationPercentage:"% Participação",
    companyStatusCode:"Código do status",
    companyState:"Estado",
    companyStatusDate:"Data do Status",
    updateDate:"Data da atualização do status",

    //Tradução Optional - SOCIOS
    documentId:"Número de Documento",
    name:"Nome",
    inconsistent:"Inconsistente",
    hasNegative:"Tem dados negativos?",
    sinceDate:"Data Referência",
    participationPercentage:"% Participação",
    companyStatusCode:"Código do status",
    companyState:"Estado",
    companyStatusDate:"Data do Status",
    updateDate:"Data da atualização do status",
  

  };

  return (
    <>
      <thead>
        <tr>
          {header.map((i) => {
            const isArr = Array.isArray(i);
            const notObj = typeof i !== "object";
            const notUndefined = typeof i !== "undefined";
            return <>{!!notUndefined && !!notObj && <th style={{ textAlign: 'center' }}>{translationMap[i] || i}</th>}</>;
          })}
        </tr>
      </thead>
    </>
  );
};

const TableCol = ({ item, index, i, header }) => {
  const currentItem = item[i];
  // console.log({ currentItem });
  const isArr = Array.isArray(currentItem);
  const notObj = typeof currentItem !== "object";
  const notUndefined = typeof currentItem !== "undefined";

  return (
    <td>
      {notUndefined === false && <span> - </span>}
      {!!notUndefined && !!isArr && <SimpleTable list={currentItem} />}
      {!!notUndefined && !!notObj && <td>{currentItem}</td>}
    </td>
  );
};


const SimpleTable = ({ list }) => {
  const [firstItem] = list;
  console.log("SimpleTable", { firstItem });
  const header = Object.keys(firstItem);
  return (
    <Table striped={"columns"} variant={"red"} className={"table-light"} responsive="sm">
      <TableHeader header={header} />
      <TableBody {...{ list, header }} />
    </Table>
  );
};

const translationMap = {
  //Tradução Registro
  documentNumber: 'Número do documento',
  consumerName: 'Nome do consumidor',
  motherName: 'Nome da mãe',
  birthDate: 'Data de nascimento',
  statusRegistration: 'Status do registro',
  address: 'Endereço',
  addressLine: "Logradouro",
  district: "Bairro",
  zipCode: "CEP",
  country: "País",
  city: "Cidade",
  state: "Estado",
  phone: 'Telefone',
  regionCode: "DDI",
  areaCode: "DDD",
  phoneNumber: "Número de Telefone",
  companyDocument:"CNPJ",
  companyName:"Razão Social",
  foundationDate:"Data de abertura da empresa",
  
  //Tradução Dados Negativo
  summary:"Resumo",
  count:"Contagem",
  balance:"Balanço",
  pefin:"Pefin",
  pefinResponse:"Ocorrerências Pefin",
  refin:"Refin",
  refinResponse:"Ocorrerências Refin",
  check:"Cheque sem fundo",
  notaryResponse:"Ocorrerências Protestos",
  notary:"Proteto Nacional",
  checkResponse:"Ocorrerências Cheque sem fundo",
  collectionRecords:"Registros",
  
  //Tradução Score
  score:"Pontuação Score",
  scoreModel:"Modelo de Score",
  range:"Classificação",
  defaultRate:"Probalidade de Não Pagamento",
  codeMessage:"Código de Mensagem",
  message:"Mensagem",
  
  //Tradução Fatos
  inquiry:"Consultas",
  inquiryResponse:"Ocorrências Consultas",
  occurrenceDate:"Data da ocorrência",
  segmentDescription:"Segmento da empresa",
  daysQuantity:"Quantidade de dias da última consulta",
  stolenDocuments:"Documentos Roubados",
  stolenDocumentsResponse:"Ocorrência Documentos Roubados",
  inclusionDate:"Data de Inclusão",
  documentType:"Tipo de documento",
  detailedReason:"Emissor",
  occurrenceState:"Estado",
  judgementFilings:"Registro de Julgamentos",
  bankrupts:"Falências",

};


const TableRow = ({ item, header, hasCheckbox }) => {
  const renderTableCell = (value) => {
    if (typeof value === 'object' && value !== null) {
      return (
        <ul>
          {Object.entries(value).map(([subKey, subValue]) => (
            <li key={subKey}>
              <strong>{translationMap[subKey] || subKey}:</strong>{' '}
              {renderTableCell(subValue)}
            </li>
          ))}
        </ul>
      );
    }
    return String(value);
  };

  return (
    <tr>
      {header.map((key) => (
        <td key={key}>{renderTableCell(item[key])}</td>
      ))}
      {hasCheckbox && <td style={{ textAlign: 'center' }}><input type="checkbox" /></td>}
    </tr>
  );
};

const Results = ({ list, pfOuPj}) => {
  const [firstItem] = list;
  var consultTitle = "";

  if (pfOuPj==="PJ"){
    consultTitle = "Consulta Opcional"; 
  } else {
    consultTitle = "Consulta Principal"; 
  }
  if (firstItem.reportName) {
    delete firstItem.reportName;
  }
  if (firstItem.companyStatus){
    delete firstItem.companyStatus;
  }

  const header = Object.keys(firstItem);
  const hasCheckbox = pfOuPj === 'PJ';
  const newHeader = hasCheckbox ? [...header, 'Gerar Serasa'] : header;

  return (
    <Container fluid>
      <h3>{consultTitle}</h3><br></br>
      <Table striped bordered hover responsive="lg">
        <TableHeader {...{ header: newHeader }} />
        <tbody>
          {list.map((item) => (
            <TableRow item={item} header={header} hasCheckbox={hasCheckbox} />
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Results;
