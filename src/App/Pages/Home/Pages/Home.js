import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Button } from "react-bootstrap";
import { downloadFromS3, uploadFileToS3 } from "../helpers";
import { pdfjs } from "react-pdf";
import "../styles.scss";
import FirstPage from "./FirstPage/FirstPage";

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
const ApiCaller = ({ selectedFile, selectedFileName, downloadReport }) => {
  const [reportUrl, setReportUrl] = useState(null);
  const callApi = async () => {
    try {
      console.log({ selectedFile });
      const fileWithoutExtension = selectedFile.name.slice(0, selectedFile.name.lastIndexOf("."));

      const doIt = async () => {
        const headers = new Headers();

        const options = {
          method: "POST",
          headers,
          // mode: "cors",
          body: JSON.stringify({ file_name: fileWithoutExtension })
        };
        const url = "https://eoyg4htk97xza02.m.pipedream.net";
        const response = await fetch(url, options);

        console.log({ response });
      };
      await doIt();
      await downloadFromS3(selectedFileName);
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
            <FirstPage handleUpload={handleUpload} />
            {selectedFile?.statement?.fileData && (
              <ApiCaller selectedFile={selectedFile?.statement?.fileData} selectedFileName={selectedFile?.statement?.fileName}/>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ofx;
