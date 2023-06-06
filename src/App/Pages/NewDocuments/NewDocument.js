import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { StorageManager } from "@aws-amplify/ui-react-storage";
import "./styles.scss";

const NewDocument = () => {
  const [reports, setReports] = useState(false);

  const processFile = async ({ file }) => {
    const fileName = file.name;
    const fileExtension = fileName.split(".").pop();
    const key = `pdfs/${fileName}/${fileName}.${fileExtension}`;

    return { file, key };
  };
  const handleOnUploadSuccess=()=> setReports(true)
  const handleOnFileRemove=()=> setReports(false)
  const handleOnUploadStart=()=> setReports(true)

  return (
    <section className="ofx2">
      <div className="uploader">
        <Container fluid>
          <Row>
            <Col>
              <div className={`card ${!!reports ? "hide-box" : ""}`}>
                <StorageManager
                  acceptedFileTypes={["image/*"]}
                  accessLevel="public"
                  maxFileCount={1}
                  isResumable
                  onFileRemove={handleOnFileRemove}
                  onUploadError={(data) => console.log("onUploadError", {data})}
                  onUploadSuccess={(data) =>handleOnUploadSuccess()}
                  onUploadStart={handleOnUploadStart}
                  processFile={processFile}
                />
              </div>
              {reports && (
                <div className="amplify-storagemanager__file__list">
                  {/* Render the file list component */}
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </section>
  );
};

export default NewDocument;
