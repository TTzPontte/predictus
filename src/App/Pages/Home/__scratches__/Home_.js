import React, { useEffect, useRef, useState } from "react";
import { pdfjs } from "react-pdf";
import { Helmet } from "react-helmet";
import { Button, Col, Row } from "react-bootstrap";
import "../styles.scss";
import { Storage } from "aws-amplify";
import { InfoHelp } from "../Pages/FirstPage/Help";

const FILE_PREFIX = "pdfs";
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const FirstPage = ({ onFileSelect }) => {
    const fileInputRef = useRef();

    const handleSubmit = (event) => {
        event.preventDefault();
        const file = fileInputRef.current.files[0];
        onFileSelect(file);
    };

    return (
        <section className="ofx2">
            {/* Other elements ... */}
            <form id="file-upload-form" onSubmit={handleSubmit}>
                <input
                    ref={fileInputRef}
                    type="file"
                    className="file-input"
                    accept=".pdf"
                    id="file-upload"
                />
                {/* Other elements ... */}
            </form>
            {/* Other elements ... */}
        </section>
    );
};

const useFileUpload = () => {
    const [file, setFile] = useState(null);

    const handleFileSelect = (selectedFile) => {
        setFile(selectedFile);
    };

    const uploadFile = async () => {
        if (!file) return;
        const { name: fileName, type: fileType } = file;

        const fileWithoutExtension = fileName.slice(0, fileName.lastIndexOf("."));
        const fileKey = `${FILE_PREFIX}/${fileWithoutExtension}/${fileName}`;

        try {
            await Storage.put(fileKey, file, { contentType: fileType });
            return fileKey;
        } catch (error) {
            console.error("Error uploading file:", error);
            throw error;
        }
    };

    return { file, handleFileSelect, uploadFile };
};

const usePdfConversion = (file) => {
    const [thumbnailUrls, setThumbnailUrls] = useState([]);

    useEffect(() => {
        const convertToThumbnails = async () => {
            // File reading and thumbnail generation code...
        };
        convertToThumbnails();
    }, [file]);

    return thumbnailUrls;
};

const Ofx = () => {
    const { file, handleFileSelect, uploadFile } = useFileUpload();
    const thumbnailUrls = usePdfConversion(file);

    const handleUpload = async () => {
        // Rest of the code...
    };

    return (
        <div className="ofx">
            <Helmet>
                <title>Ofx</title>
                <meta name="description" content="Ofx" />
            </Helmet>
            <div className="container">
                <div className="contractPage">
                    {/* Rest of the code... */}
                    {!file ? (
                        <FirstPage onFileSelect={handleFileSelect} />
                    ) : (
                        <>
                            {thumbnailUrls.length > 0 && <PdfThumbnails urls={thumbnailUrls} />}
                            <PdfActions onClick={handleUpload} />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Ofx;
