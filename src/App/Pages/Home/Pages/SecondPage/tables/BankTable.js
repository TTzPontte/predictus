import React from 'react';
import PropTypes from 'prop-types';
import { Header, Info, TRow, TableWrapper } from '../../../../../components/Table/Table';

const BankTable = ({ bank: { code = '', name = '' }, statement: { startDate = '', endDate = '' } }) => (
  <>
    <div style={{ width: '30vmax' }}>
      <TableWrapper title={`Bank Info`}>
        <table>
          <tbody>
            <TRow>
              <Header>Código Banco</Header>
              <Info>
                <span>{code}</span>
              </Info>
            </TRow>
            <TRow>
              <Header>Nome Banco</Header>
              <Info>
                <span>{name}</span>
              </Info>
            </TRow>
            <TRow>
              <Header>Data Inicio</Header>
              <Info>
                <span>{startDate}</span>
              </Info>
            </TRow>
            <TRow>
              <Header>Data Final</Header>
              <Info>
                <span>{endDate}</span>
              </Info>
            </TRow>
          </tbody>
        </table>
      </TableWrapper>
    </div>
  </>
);

export default BankTable;

BankTable.propTypes = {
  bank: PropTypes.object,
  name: PropTypes.string,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  statement: PropTypes.object,
};
