import React, {useState} from "react";
import {Helmet} from "react-helmet";
import {Button} from "react-bootstrap";
import {downloadFromS3, uploadFileToS3} from "../helpers";
import {pdfjs} from "react-pdf";
import "../styles.scss";
import FirstPage from "./FirstPage/FirstPage";

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const OpenNewTabButton = ({url}) => {
    const openNewTab = () => {
        window.open(url);
    };

    return <Button onClick={openNewTab}>Open New Tab</Button>;
};
const delay = (callback, timeout) => {
    setTimeout(callback, timeout);
};
const ApiCaller = ({selectedFile, selectedFileName}) => {
    const [reportUrl, setReportUrl] = useState(null);

    const callApi = async () => {
        try {
            const fileWithoutExtension = selectedFileName.slice(0, selectedFileName.lastIndexOf("."));

            const fetchApi = async () => {
                const headers = new Headers();
                const options = {
                    method: "POST",
                    headers,
                    body: JSON.stringify({file_name: fileWithoutExtension})
                };
                const url = "https://eoyg4htk97xza02.m.pipedream.net";
                // const url = "https://v6v4s76qhmeqzlex7ial2kmtxi0hriio.lambda-url.us-east-1.on.aws/";
                const response = await fetch(url, options);
                console.log({response});
            };

            const getFILE = async () => {
                const presignedUrl = await downloadFromS3(selectedFileName);
                await setReportUrl(presignedUrl);
            }
            await fetchApi();
            await delay(getFILE, 200)

        } catch (error) {
            console.error("Error calling API:", error);
        }
    };

    return (
        <div>
            <Button onClick={callApi}>Call API</Button>
            {reportUrl && <OpenNewTabButton url={reportUrl}/>}
        </div>
    );
};

const Ofx = () => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleUpload = async ({fileName, fileData, fileType}) => {
        try {
            const fileKey = await uploadFileToS3(fileName, fileData, fileType);
            const fileStatement = {
                s3Key: fileKey,
                transactions: [],
                monthlyTransactions: [],
                fileData,
                fileName // add fileName to the state
            };
            setSelectedFile({statement: fileStatement});
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
                        <FirstPage handleUpload={handleUpload}/>
                        {selectedFile?.statement?.fileData && (
                            <ApiCaller
                                selectedFile={selectedFile.statement.fileData}
                                selectedFileName={selectedFile.statement.fileName}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Ofx;
