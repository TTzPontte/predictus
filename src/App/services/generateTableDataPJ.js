import React from 'react';
import './table.css';

function generateTableDataPJ(jsonData) {
  return (
    <>
      <h3>CNPJ(s) Vinculado(s)</h3>
      <table className="table">
        <thead>
          <tr>
            <th className="text-center">Razão Social</th>
            <th className="text-center">CNPJ</th>
            <th className="text-center">% Participação</th>
            <th className="text-center">Status</th>
            <th className="text-center">Extrair Serasa?</th>
          </tr>
        </thead>
        <tbody>
          {jsonData.map((item, index) => (
            <tr key={index}>
              <td className="text-center">{item.companyName}</td>
              <td className="text-center">{item.businessDocument}</td>
              <td className="text-center">{item.participationPercentage}</td>
              <td className="text-center">{item.companyStatusCode}</td>
              <td className="text-center"><input type="checkbox" /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default generateTableDataPJ;
