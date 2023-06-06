import React, { useState } from "react";
import PropTypes from "prop-types";
import { Row, Spinner } from "react-bootstrap";
import { StorageManager } from '@aws-amplify/ui-react-storage';

const FirstPage = ({ handleUpload }) => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const renderSubmitButton = () => {
    return (
        !submitted && (
            <button type="submit" id="file-upload-btn" className="btn btn-primary">
              {loading ? <Spinner animation="border" color={'white'} size="md" /> : "Submit"}
            </button>
        )
    );
  };

  return (
      <section className="ofx2">
        <div className="uploader">
          <div className="card">
            <Row>
              <form id="file-upload-form" onSubmit={handleUpload}>
                <StorageManager
                    acceptedFileTypes={['application/pdf']}
                    accessLevel="public"
                    maxFileCount={1}
                    onUploadStart={() => setLoading(true)}
                    onUploadSuccess={() => setSubmitted(true)}
                    onUploadError={() => setLoading(false)}
                    components={{
                      FilePicker: ({ onClick }) => (
                          <button
                              type="button"
                              className="btn btn-primary"
                              onClick={onClick}
                              disabled={loading || submitted}
                          >
                            {loading ? <Spinner animation="border" color="white" size="md" /> : "Submit"}
                          </button>
                      ),
                    }}
                />
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
