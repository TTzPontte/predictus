import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Card, Col, Row } from "react-bootstrap";
import { uploadFileToS3, usePdfConversionAndMerge } from "../helpers";
import { pdfjs } from "react-pdf";
import "../styles.scss";
import FirstPage from "./FirstPage/FirstPage";

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
const Ofx = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const pdfFile = selectedFile?.statement?.fileData;

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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Ofx;
