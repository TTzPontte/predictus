import React from 'react';
import { Container, Table } from 'react-bootstrap';

const translationMap = {
  //... your translation map here
};

const TableHeader = ({ header, hasCheckbox }) => {
  return (
      <thead>
      <tr>
        {header.map((i) => {
          const notUndefined = typeof i !== "undefined";
          return notUndefined && <th style={{ textAlign: 'center' }}>{translationMap[i] || i}</th>;
        })}
        {hasCheckbox && <th style={{ textAlign: 'center' }}>Gerar Serasa</th>}
      </tr>
      </thead>
  );
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

const Results = ({ list, pfOuPj }) => {
  const [firstItem] = list;
  var consultTitle = (pfOuPj === "PJ") ? "Consulta Opcional" : "Consulta Principal";
  delete firstItem?.reportName;
  delete firstItem?.companyStatus;

  const header = Object.keys(firstItem);
  const hasCheckbox = pfOuPj === 'PJ';
  const newHeader = hasCheckbox ? [...header, 'Gerar Serasa'] : header;

  return (
      <Container fluid>
        <h3>{consultTitle}</h3><br></br>
        <Table striped bordered hover responsive="lg">
          <TableHeader header={newHeader} hasCheckbox={hasCheckbox} />
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
