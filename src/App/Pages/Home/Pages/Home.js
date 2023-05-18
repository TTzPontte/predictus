import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Button } from "react-bootstrap";
import { downloadFromS3, uploadFileToS3 } from "../helpers";
import { pdfjs } from "react-pdf";
import "../styles.scss";
import FirstPage from "./FirstPage/FirstPage";
import TestButton from "./TestButton";

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const OpenNewTabButton = ({ url }) => (
    <Button onClick={() => window.open(url)}>Open New Tab</Button>
);

const delay = (callback, timeout) => setTimeout(callback, timeout);

const fetchApi = async (fileWithoutExtension) => {
    const url = "https://mphzmv3svpiwy6iwdscu6oajba0eibgj.lambda-url.us-east-1.on.aws/";
    const options = {
        method: "POST",
        headers: new Headers(),
        body: JSON.stringify({ file_name: fileWithoutExtension })
    };
    return await fetch(url, options);
};

const ApiCaller = ({ selectedFileName }) => {
    const [reportUrl, setReportUrl] = useState(null);

    const callApi = async () => {
        try {
            const fileWithoutExtension = selectedFileName.slice(0, selectedFileName.lastIndexOf("."));

            await fetchApi(fileWithoutExtension);
            delay(async () => {
                const presignedUrl = await downloadFromS3(selectedFileName);
                setReportUrl(presignedUrl);
            }, 200);
        } catch (error) {
            console.error("Error calling API:", error);
        }
    };

    return (
        <div>
            <Button onClick={callApi}>Call API</Button>
            {reportUrl && <OpenNewTabButton url={reportUrl} />}
        </div>
    );
};

const Ofx = () => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleUpload = async ({ fileName, fileData, fileType }) => {
        try {
            const fileKey = await uploadFileToS3(fileName, fileData, fileType);
            setSelectedFile({
                statement: {
                    s3Key: fileKey,
                    transactions: [],
                    monthlyTransactions: [],
                    fileData,
                    fileName
                }
            });
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
                <TestButton />
                <div className="contractPage">
                    <div className="contractPage--header" style={{ padding: "0 1em" }}>
                        <h1>Aferição de renda</h1>
                        <br />
                    </div>
                    <hr />
                    <div className="react-tabs__tab-panel react-tabs__tab-panel--selected">
                        <FirstPage handleUpload={handleUpload} />
                        {selectedFile?.statement?.fileData && (
                            <ApiCaller selectedFileName={selectedFile.statement.fileName} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Ofx;
