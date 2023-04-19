import React, { useState } from 'react';
import { cpf } from 'cpf-cnpj-validator';
import Input from './form/input/Input';

const HomePage = () => {
  const [cpfValue, setCpfValue] = useState('');
  const [cpfMessage, setCpfMessage] = useState('');

  const handleCpfChange = (event) => {
    setCpfValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (cpf.isValid(cpfValue)) {
      setCpfMessage('CPF válido!');
    } else {
      setCpfMessage('CPF inválido!');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="cpf">CPF:</label>
        <Input
          id="cpf"
          type="text"
          value={cpfValue}
          onChange={handleCpfChange}
        />
        <button type="submit">Consultar</button>
      </form>
      <p>{cpfMessage}</p>
    </div>
  );
};

export default HomePage;
