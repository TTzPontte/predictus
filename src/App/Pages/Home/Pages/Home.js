import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Button } from "react-bootstrap";
import "../styles.scss";
import FirstPage from "./FirstPage/FirstPage";
import { uploadFileToS3 } from "../helpers";
import usePdfConversion from "./SecondPage/usePdfConversion";
import PdfThumbnails from "./pdf/PdfThumbnails";
import PdfActions from "./pdf/PdfActions";

const Ofx = () => {
    const [hasFile, setHasFile] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const { numPages, thumbnailUrls } = usePdfConversion(selectedFile?.statement?.fileData);

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
                },
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
                            <>
                                {thumbnailUrls.length > 0 && <PdfThumbnails urls={thumbnailUrls} />}
                                <PdfActions thumbnailUrls={thumbnailUrls} />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Ofx;
