import React, { useState } from 'react';
import './style.scss';
import PropTypes from 'prop-types';

const Panel = ({ children, title }) => {
  const [active, setActive] = useState(false);
  return (
    <div className={`${active ? 'primary-table-wrapper active' : 'primary-table-wrapper'}`}>
      <button type="button" className="primary-table-wrapper--title" onClick={() => setActive(!active)}>
        <span>{title}</span>
        <div className={active ? 'plus-minus closed' : 'plus-minus opened'}>
          <div className="horizontal" />
          <div className="vertical" />
        </div>
      </button>
      <div className="content-block">
        <div className="content">{children}</div>
      </div>
    </div>
  );
};
export default Panel;
Panel.propTypes = {
  children: PropTypes.any,
  title: PropTypes.string,
};
