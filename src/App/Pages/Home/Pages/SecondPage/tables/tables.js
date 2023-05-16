import React from 'react';
import PropTypes from 'prop-types';
import FileTables from './fileTables';

const Tables = ({ transactions = [], total = {}, title = '' }) => {
  const tableColumns = [
    {
      label: 'Descrição da transação',
      value: 'memo',
    },
    {
      label: 'Créditos',
      value: 'credit',
    },
    {
      label: 'Débitos',
      value: 'debit',
    },
  ];
  const finalColumns = transactions.map(({ memo, type, value }) => {
    console.log({ memo, type, value })
    const newItem = {
      credit: '',
      debit: '',
    };
    newItem.memo = memo;
    newItem[type] = value;
    return newItem;
  });

  const { credit = '', debit = '' } = total;

  const tableFooter = [
    {
      label: 'Balanço',
      value: 'Totals',
    },
    {
      label: 'Total Crédito',
      value: credit,
    },
    {
      label: 'Total Débito',
      value: debit,
    },
  ];

  return (
    <>
      <div className="row">
        {transactions && transactions.length > 0 && (
          <FileTables tableFooter={tableFooter} bodyColumns={finalColumns} headerColumns={tableColumns} title={title} />
        )}
      </div>
    </>
  );
};

export default Tables;

Tables.propTypes = {
  total: PropTypes.object,
  transactions: PropTypes.array,
  title: PropTypes.string,
};
