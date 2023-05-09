import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import "./styles.scss";
import { InfoHelp } from "./Help";
import { Col, Row } from "react-bootstrap";

function FirstPage({ handleUpload }) {
  const [file, setFile] = useState(null);
  const uploadInputRef = useRef(null);

  const handleUploadImage = async (ev) => {
    ev.preventDefault();
    const file = uploadInputRef.current.files[0];
    handleUpload({ fileType: file.type, fileData: file, fileName: file.name });
  };

  const handleChange = (ev) => {
    setFile(ev.currentTarget.value);
  };

  const isFileSelected = () => !!file;

  return (
    <section className="ofx2">
      <div className="uploader">
        <div className="card">
          <Row>
            <form id="file-upload-form" onSubmit={handleUploadImage}>
              <input
                ref={uploadInputRef}
                type="file"
                className="file-input"
                accept=".pdf"
                onChange={handleChange}
                id="file-upload"
              />
              <label htmlFor="file-upload" id="file-drag">
                <div>
                  <p className="lead">
                    Escolha um Arquivo <b>OFX</b>
                  </p>
                  <div id="start">
                    <i
                      className={`fa fa-download`}
                      aria-hidden="true"
                      style={isFileSelected() ? { color: "rebeccapurple" } : {}}
                    />
                    <InfoHelp />
                    <p>Select a file</p>
                  </div>
                </div>
              </label>
              <div>
                {isFileSelected() && (
                  <button type="submit">
                    <span id="file-upload-btn" className="btn btn-primary">
                      Submit
                    </span>
                  </button>
                )}
              </div>
            </form>
          </Row>
        </div>
      </div>
    </section>
  );
}

FirstPage.propTypes = {
  handleUpload: PropTypes.func
};

export default FirstPage;
