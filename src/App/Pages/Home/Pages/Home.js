import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Button, Col, Row } from "react-bootstrap";
import { uploadFileToS3, usePdfConversionAndMerge } from "../helpers";
import { pdfjs } from "react-pdf";
import "../styles.scss";
import FirstPage from "./FirstPage/FirstPage";
import { Storage } from "@aws-amplify/storage";

// Set the worker URL for PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfToImageActions = ({ mergedImageSrc, pdfFileName }) => {
  const downloadMergedPdf = async () => {
    if (!mergedImageSrc) {
      return;
    }

    try {
      const response = await fetch(mergedImageSrc);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const blob = await response.blob();
      const fileWithoutExtension = pdfFileName.slice(0, pdfFileName.lastIndexOf("."));
      const fileName = `${fileWithoutExtension}.jpg`;
      const fileKey = await uploadFileToS3(fileName, blob, "image/jpeg");
      console.log("fileKey", fileKey);
    } catch (error) {
      console.error("Error downloading merged image:", error);
    }
  };

  return (
      <Row className="my-4">
        <Col>
          <Button onClick={downloadMergedPdf} disabled={!mergedImageSrc}>
            Enviar Imagem
          </Button>
        </Col>
      </Row>
  );
};

const Ofx = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const pdfFile = selectedFile?.statement?.fileData;
  const mergedImageSrc = usePdfConversionAndMerge(pdfFile);

  const handleUpload = async ({ fileName, fileData, fileType }) => {
    try {
      const fileKey = await uploadFileToS3(fileName, fileData, fileType);
      setSelectedFile((prevState) => ({
        ...prevState,
        statement: {
          ...prevState?.statement,
          s3Key: fileKey,
          transactions: [],
          monthlyTransactions: [],
          fileData,
          fileName, // add fileName to the state
        },
      }));
    } catch (error) {
      console.error("Error handling upload:", error);
    }
  };

  const callApi = () => {
    fetch("https://1qe2rpg7yb.execute-api.us-east-1.amazonaws.com/Prod/hello/")
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.error("Error calling API:", error);
        });
  };

  return (
      <div className="ofx">
        <Helmet>
          <title>Ofx</title>
          <meta name="description" content="Ofx" />
        </Helmet>
        <div className="container">
          <div className="contractPage">
            <div className="contractPage--header" style={{ padding: "0 1em" }}>
              <h1>Aferição de renda</h1>
              <br />
              <Button onClick={callApi}>Call API</Button>
            </div>
            <hr />
            <div className="react-tabs__tab-panel react-tabs__tab-panel--selected">
              {!mergedImageSrc && <FirstPage handleUpload={handleUpload} />}
              {mergedImageSrc && (
                  <>
                    <Row>
                      <Col>
                        <embed src={mergedImageSrc} type="application/pdf" width="100%" height="600px" />
                      </Col>
                    </Row>
                    <PdfToImageActions mergedImageSrc={mergedImageSrc} pdfFileName={selectedFile?.statement?.fileName} />
                  </>
              )}
            </div>
          </div>
        </div>
      </div>
  );
};

export default Ofx;
