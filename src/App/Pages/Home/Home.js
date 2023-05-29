import React, {useState} from "react";
import {Helmet} from "react-helmet";
import {uploadFileToS3} from "./helpers";
import {pdfjs} from "react-pdf";
import "./styles.scss";
import FirstPage from "./Pages/FirstPage/FirstPage";
import ApiCaller from "./Pages/ApiCaller";
import Button from "react-bootstrap/Button";
import {Col, Row} from "react-bootstrap";

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


const Ofx = () => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleUpload = async ({fileName, fileData, fileType}) => {
        try {
            const fileKey = await uploadFileToS3(fileName, fileData, fileType);
            setSelectedFile({
                statement: {
                    s3Key: fileKey,
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
                <title>OCR</title>
                <meta name="description" content="OCR"/>
            </Helmet>
            <div className="container">
                <div className="contractPage">
                    <div className="contractPage--header" style={{padding: "0 1em"}}>
                        <h1>Aferição de renda</h1>
                        <br/>
                    </div>
                    <Row><Col>                        {selectedFile?.statement?.fileData && (<Button onClick={() => {
                        window.location.reload()
                    }}> fazer outra consulta</Button>)}
                    </Col></Row>
                    <hr/>
                    <div className="react-tabs__tab-panel react-tabs__tab-panel--selected">
                        <FirstPage handleUpload={handleUpload}/>
                        {selectedFile?.statement?.fileData && (
                            <ApiCaller selectedFileName={selectedFile.statement.fileName}/>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Ofx;
