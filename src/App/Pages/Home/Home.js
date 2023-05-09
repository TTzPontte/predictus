import React, { useRef, useState } from "react";
import "./styles.scss";
import { Helmet } from "react-helmet";
import SecondPage from "./SecondPage";
import { Storage } from "@aws-amplify/storage";
import { defaultValue } from "./constants";
import { InfoHelp } from "./FirstPage/Help";
import {Col, Row} from "react-bootstrap";
import FirstPage from "./FirstPage/FirstPage";

const Ofx = () => {
  const [hasFile, setHasFile] = useState(false);
  const [selectedFile, setSelectedFile] = useState(defaultValue);

  const handleUpload = async (data) => {
    const { fileType, fileName, fileData } = data;
    const fileWithoutExtension = fileName.slice(0, fileName.lastIndexOf("."));
    const prefixedFileName = `pdfs/${fileWithoutExtension}/${fileName}`;

    try {
      const result = await Storage.put(prefixedFileName, fileData, {
        contentType: fileType
      });
      console.log("File uploaded successfully:", result);

      setSelectedFile((prevState) => ({
        ...prevState,
        statement: {
          ...prevState.statement,
          s3Key: result.key,
          transactions: [],
          monthlyTransactions: []
        }
      }));
      setHasFile(true);
    } catch (error) {
      console.error("Error uploading file:", error);
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
            {!hasFile ? (
              <FirstPage handleUpload={handleUpload} />
            ) : (
              <SecondPage selectedFile={selectedFile} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ofx;
