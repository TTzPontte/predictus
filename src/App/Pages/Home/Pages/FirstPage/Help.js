import PropTypes from 'prop-types';
import './styles.scss';
import React from "react";

export const InfoBtn = ({ info, setInfo }) => (
    <>
        <div id="info-btn" className="flex col">
            {/*<Row className="flex row" style={{ justifyContent: 'flex-end' }}>*/}
            <div className="flex row" style={{ justifyContent: 'flex-end' }}>
                <button type="button" onClick={() => setInfo(!info)}>
                    <i className="fa fa-info-circle" aria-hidden="true" />
                </button>
            </div>
        </div>
    </>
);

export const InfoHelp = ({ info, setInfo }) => (
    <section id="info-help">
        {info && (
            <div className="info">
                <div className="info-modal">
                    <button type="button" onClick={() => setInfo(!info)}>
                        <i className="fa fa-long-arrow-right arrow1" aria-hidden="true" />
                    </button>
                </div>
            </div>
        )}
    </section>
);

InfoBtn.propTypes = {
    info: PropTypes.bool,
    setInfo: PropTypes.func,
};
InfoHelp.propTypes = {
    info: PropTypes.bool,
    setInfo: PropTypes.func,
};
