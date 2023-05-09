import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './style.scss';

export const Col = ({ children }) => <td className="table--col">{children}</td>;
export const THeade = ({ children }) => <thead className="table--row--header">{children}</thead>;

export const Header = ({ children, id = '' }) => (
  <td className="table--row--header" id={id}>
    <span>{children}</span>
  </td>
);

export const TRow = ({ children }) => <tr className="table--row">{children}</tr>;
export const Info = ({ children }) => <tr className="table--col--header">{children}</tr>;

export const TableWrapper = ({ children, title, active = true }) => {
  const [disabled, setDisabled] = useState(!active);
  return (
    <div className={`${disabled ? 'table-wrapper active' : 'table-wrapper'}`}>
      <button type="button" className="table-wrapper--title" onClick={() => setDisabled(!disabled)}>
        <span>{title}</span>
        <div className={disabled ? 'plus-minus closed' : 'plus-minus opened'}>
          <div className="horizontal" />
          <div className="vertical" />
        </div>
      </button>
      <div className="table-content">{children}</div>
    </div>
  );
};

TableWrapper.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.array]),
  title: PropTypes.string,
  active: PropTypes.bool,
};

THeade.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]),
};
TRow.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]),
};
Col.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]),
};
Info.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]),
};
Header.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]),
  id: PropTypes.string,
};
