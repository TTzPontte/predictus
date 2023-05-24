import React, { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Row, Spinner } from "react-bootstrap";
import "./styles.scss";

const FirstPage = ({ handleUpload }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const uploadInputRef = useRef(null);

  const handleUploadImage = async (ev) => {
    ev.preventDefault();
    setLoading(true);

    const file = uploadInputRef.current.files[0];
    await handleUpload({ fileType: file.type, fileData: file, fileName: file.name });

    setLoading(false);
    setSubmitted(true);
  };

  const handleChange = (ev) => {
    setFile(ev.currentTarget.value);
  };

  const isFileSelected = () => !!file;

  const renderSubmitButton = () => {
    return (
        isFileSelected() && !submitted && (
            <button type="submit" id="file-upload-btn" className="btn btn-primary">
              {loading ? <Spinner animation="border" color={'white'} size="md" /> : "Submit"}
            </button>
        )
    );
  };

  useEffect(() => {
    // Reset file input on component mount
    uploadInputRef.current.value = "";
  }, []);

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
                      Escolha um Arquivo <b>PDF</b>
                    </p>
                    <div id="start">
                      <i
                          className={`fa fa-download`}
                          aria-hidden="true"
                          style={isFileSelected() ? { color: "rebeccapurple" } : {}}
                      />
                      <p>Select a file</p>
                    </div>
                  </div>
                </label>
                <div>{renderSubmitButton()}</div>
              </form>
              {submitted && <p>Form submitted successfully!</p>}
            </Row>
          </div>
        </div>
      </section>
  );
};

FirstPage.propTypes = {
  handleUpload: PropTypes.func,
};

export default FirstPage;
