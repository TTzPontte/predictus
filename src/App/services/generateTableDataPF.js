import React from 'react';
import './table.css';


function generateTableDataPF(jsonData) {
  const { reports } = jsonData;

  if (reports.length === 0) {
    return <p>Nenhum dado encontrado.</p>;
  }

  const report = reports[0];

  const data = [
    {
      label: "Nome",
      value: report.registration.consumerName,
    },
    {
      label: "CPF",
      value: report.registration.documentNumber,
    },
    {
      label: "Data de Nascimento",
      value: new Date(report.registration.birthDate).toLocaleDateString('pt-BR'),
    },
    {
      label: "Situação Cadastral",
      value: report.registration.statusRegistration,
    },
    {
      label: "Score",
      value: report.score.score,
    },
  ];

  return (
    <>
      <h3>Resumo Consulta PF</h3>
      <table className="table">
        <thead>
          <tr>
            {data.map((item) => (
              <th className="text-center" key={item.label}>{item.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {data.map((item) => (
              <td className="text-center" key={item.label}>{item.value}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </>
  );
}




export default generateTableDataPF;
