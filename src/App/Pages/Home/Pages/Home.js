import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Button, Card, Col, Row } from "react-bootstrap";
import { uploadFileToS3, usePdfConversionAndMerge } from "../helpers";
import { pdfjs } from "react-pdf";
import "../styles.scss";
import FirstPage from "./FirstPage/FirstPage";
import { Storage } from "@aws-amplify/storage";

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfToImageActions = ({ mergedImageSrc, pdfFileName, setUploadedMergedImageSrc }) => {
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
      setUploadedMergedImageSrc(true);
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

const ApiCaller = ({ selectedFile }) => {
  const [reportUrl, setReportUrl] = useState(null);

  const callApi = async () => {
    try {
      const pdfFileName = selectedFile?.statement?.fileName;
      const fileWithoutExtension = pdfFileName.slice(0, pdfFileName.lastIndexOf("."));

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify({ file: fileWithoutExtension })
      };

      const response = await fetch("https://eovdxkiwg4u4s8v.m.pipedream.net", requestOptions);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const storageData = await Storage.get(`pdfs/${fileWithoutExtension}/${fileWithoutExtension}.xlsx`, {
        // download: true,
        validateObjectExistence: true,
        level: "public"
      });
      console.log({storageData})
      setReportUrl('');
      console.log(storageData);
    } catch (error) {
      console.error("Error calling API:", error);
    }
  };

  return (
    <div>
      <Button onClick={callApi}>Call API</Button>
      {reportUrl && <h1>{reportUrl}</h1>}
    </div>
  );
};

const Ofx = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedMergedImageSrc, setUploadedMergedImageSrc] = useState(false);
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
          fileName // add fileName to the state
        }
      }));
    } catch (error) {
      console.error("Error handling upload:", error);
    }
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
          </div>
          <hr />

          <div className="react-tabs__tab-panel react-tabs__tab-panel--selected">
            {!mergedImageSrc && <FirstPage handleUpload={handleUpload} />}
            {mergedImageSrc && (
              <>
                <Row>
                  <Col>
                    <Card>
                      <embed src={mergedImageSrc} type="application/pdf" width="100%" height="600px" />
                    </Card>
                  </Col>
                </Row>
                <Row>
                  {selectedFile?.statement?.fileData && mergedImageSrc && uploadedMergedImageSrc && (
                    <ApiCaller selectedFile={selectedFile} />
                  )}
                  <>
                    {mergedImageSrc && !uploadedMergedImageSrc && (
                      <PdfToImageActions
                        setUploadedMergedImageSrc={setUploadedMergedImageSrc}
                        mergedImageSrc={mergedImageSrc}
                        pdfFileName={selectedFile?.statement?.fileName}
                      />
                    )}
                  </>
                </Row>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ofx;
