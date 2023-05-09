import React, { useState } from "react";
import "./styles.scss";
import { Helmet } from "react-helmet";
import FirstPage from "./FirstPage/FirstPage";
import SecondPage from "./SecondPage";
import { Storage } from "@aws-amplify/storage";
import { defaultValue } from "./constants";

const Ofx = () => {
  const [hasFile, setHasFile] = useState(false);
  const [selectedFile, setSelectedFile] = useState(defaultValue);

  const handleUpload = async (data) => {
    console.log({data});
      const result = await Storage.put(data.fileData.fileName, data.file, {
          contentType: data.file.type,
      });
    setHasFile(true);
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
