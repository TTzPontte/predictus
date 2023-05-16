import React, {useState} from "react";
import "./styles.scss";
import {Helmet} from "react-helmet";
import SecondPage from "./SecondPage";
import FirstPage from "./FirstPage/FirstPage";
import {callApiEndpoint, uploadPdfAndImageToS3} from "./helpers";

const Ofx = () => {
    const [hasFile, setHasFile] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [reportDownloadUrl, setReportDownloadUrl] = useState(null);

    const handleUpload = async ({fileName, fileData, fileType}) => {
        try {
            const fileKey = await uploadPdfAndImageToS3(fileName, fileData, fileType);
            const response = await callApiEndpoint(fileKey);
            setReportDownloadUrl(response.reportDownloadUrl);

            setSelectedFile((prevState) => ({
                ...prevState,
                statement: {
                    ...prevState.statement,
                    s3Key: fileKey,
                    transactions: [],
                    monthlyTransactions: []
                }
            }));
            setHasFile(true);
        } catch (error) {
            console.error("Error handling upload:", error);
        }
    };

    return (
        <div className="ofx">
            <Helmet>
                <title>Ofx</title>
                <meta name="description" content="Ofx"/>
            </Helmet>
            <div className="container">
                <div className="contractPage">
                    <div className="contractPage--header" style={{padding: "0 1em"}}>
                        <h1>Aferição de renda</h1>
                        <br/>
                    </div>
                    <hr/>
                    <div className="react-tabs__tab-panel react-tabs__tab-panel--selected">
                        {!hasFile ? (
                            <FirstPage handleUpload={handleUpload}/>
                        ) : (
                            <SecondPage selectedFile={selectedFile} reportDownloadUrl={reportDownloadUrl}/>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Ofx;
