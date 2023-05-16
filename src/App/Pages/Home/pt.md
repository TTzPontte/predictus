Merge component 1 and 2 together, keep the layout of the component 1 with the extended functionality of the component 2


component 1

```javascript
import React, {useState, useEffect} from "react";
import {Helmet} from "react-helmet";
import {Container, Row, Col} from "react-bootstrap";
import {Document, Page, pdfjs} from "react-pdf";
import "./styles.scss";
import {callApiEndpoint, uploadFileToS3} from "./helpers";
import SecondPage from "./Pages/SecondPage";
import FirstPage from "./Pages/FirstPage/FirstPage";
import Button from "react-bootstrap/Button";

// Set the worker URL for PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const usePdfConversion = (pdfFile) => {
    const [numPages, setNumPages] = useState(null);
    const [mergedImageSrc, setMergedImageSrc] = useState(null);

    useEffect(() => {
        const convertToImage = async () => {
            if (!pdfFile) {
                console.error("No PDF file selected.");
                return;
            }

            try {
                const fileReader = new FileReader();

                fileReader.onload = async function () {
                    const typedArray = new Uint8Array(this.result);
                    const pdfData = typedArray.buffer;

                    const pdf = await pdfjs.getDocument({data: pdfData}).promise;
                    setNumPages(pdf.numPages);

                    const canvas = document.createElement("canvas");
                    const context = canvas.getContext("2d");
                    const mergedHeight = pdf.numPages * (await getPageHeight(pdf, 1));

                    canvas.width = await getPageWidth(pdf, 1);
                    canvas.height = mergedHeight;

                    let currentHeight = 0;

                    for (let i = 1; i <= pdf.numPages; i++) {
                        const page = await pdf.getPage(i);
                        const viewport = page.getViewport({scale: 1.0});
                        const pageCanvas = document.createElement("canvas");
                        const pageContext = pageCanvas.getContext("2d");

                        pageCanvas.width = viewport.width;
                        pageCanvas.height = viewport.height;

                        await page.render({canvasContext: pageContext, viewport}).promise;

                        context.drawImage(pageCanvas, 0, currentHeight);
                        currentHeight += await getPageHeight(pdf, i);
                    }

                    const mergedImageSrc = canvas.toDataURL("image/jpeg");
                    setMergedImageSrc(mergedImageSrc);
                };

                fileReader.readAsArrayBuffer(pdfFile);
            } catch (error) {
                console.error("Error converting PDF to image:", error);
            }
        };

        convertToImage();
    }, [pdfFile]);

    return {numPages, mergedImageSrc};
};

const getPageWidth = async (pdf, pageNumber) => {
    const page = await pdf.getPage(pageNumber);
    const viewport = page.getViewport({scale: 1.0});
    return viewport.width;
};

const getPageHeight = async (pdf, pageNumber) => {
    const page = await pdf.getPage(pageNumber);
    const viewport = page.getViewport({scale: 1.0});
    return viewport.height;
};

const Ofx = () => {
    const [hasFile, setHasFile] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [reportDownloadUrl, setReportDownloadUrl] = useState(null);
    const {numPages, mergedImageSrc} = usePdfConversion(selectedFile?.statement?.fileData);

    const handleUpload = async ({fileName, fileData, fileType}) => {
        try {
            const fileKey = await uploadFileToS3(fileName, fileData, fileType);
            const response = await callApiEndpoint(fileKey);
            setReportDownloadUrl(response.reportDownloadUrl);

            setSelectedFile((prevState) => ({
                ...prevState,
                statement: {
                    ...prevState.statement,
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

    const downloadImage = () => {
        if (mergedImageSrc) {
            const link = document.createElement("a");
            link.href = mergedImageSrc;
            link.download = "merged_image.jpg";
            link.click();
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
                            <>
                                <Row>
                                    <Col>
                                        <Document file={selectedFile.statement.fileData} renderMode="svg">
                                            {Array.from(new Array(numPages), (_, index) => (
                                                <Page key={`page_${index + 1}`} pageNumber={index + 1}/>
                                            ))}
                                        </Document>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Button onClick={downloadImage} disabled={!mergedImageSrc}>
                                            Download Image
                                        </Button>
                                    </Col>
                                </Row>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Ofx;

```

component 2
```javascript
import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Container, Row, Col, Button } from 'react-bootstrap';

// Set the worker URL for PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const usePdfConversion = (pdfFile) => {
    const [numPages, setNumPages] = useState(null);
    const [mergedImageSrc, setMergedImageSrc] = useState(null);

    useEffect(() => {
        const convertToImage = async () => {
            if (!pdfFile) {
                console.error('No PDF file selected.');
                return;
            }

            try {
                const fileReader = new FileReader();

                fileReader.onload = async function () {
                    const typedArray = new Uint8Array(this.result);
                    const pdfData = typedArray.buffer;

                    const pdf = await pdfjs.getDocument({ data: pdfData }).promise;
                    setNumPages(pdf.numPages);

                    const mergedImageSrc = await mergePagesToImage(pdf);
                    setMergedImageSrc(mergedImageSrc);
                };

                fileReader.readAsArrayBuffer(pdfFile);
            } catch (error) {
                console.error('Error converting PDF to image:', error);
            }
        };

        convertToImage();
    }, [pdfFile]);

    return { numPages, mergedImageSrc };
};

const mergePagesToImage = async (pdf) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const mergedHeight = pdf.numPages * (await getPageHeight(pdf, 1));

    canvas.width = await getPageWidth(pdf, 1);
    canvas.height = mergedHeight;

    let currentHeight = 0;

    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 1.0 });
        const pageCanvas = document.createElement('canvas');
        const pageContext = pageCanvas.getContext('2d');

        pageCanvas.width = viewport.width;
        pageCanvas.height = viewport.height;

        await page.render({ canvasContext: pageContext, viewport }).promise;

        context.drawImage(pageCanvas, 0, currentHeight);
        currentHeight += await getPageHeight(pdf, i);
    }

    return canvas.toDataURL('image/jpeg');
};

const getPageWidth = async (pdf, pageNumber) => {
    const page = await pdf.getPage(pageNumber);
    const viewport = page.getViewport({ scale: 1.0 });
    return viewport.width;
};

const getPageHeight = async (pdf, pageNumber) => {
    const page = await pdf.getPage(pageNumber);
    const viewport = page.getViewport({ scale: 1.0 });
    return viewport.height;
};

const PDFToImageConverter = () => {
    const [pdfFile, setPdfFile] = useState(null);
    const { numPages, mergedImageSrc } = usePdfConversion(pdfFile);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        setPdfFile(file);
    };

    const downloadImage = () => {
        if (mergedImageSrc) {
            const link = document.createElement('a');
            link.href = mergedImageSrc;
            link.download = 'merged_image.jpg';
            link.click();
        }
    };

    return (
        <Container>
            <Row>
                <Col>
                    <input type="file" onChange={handleFileUpload} accept=".pdf" />
                </Col>
            </Row>
            {pdfFile && (
                <Row>
                    <Col>
                        <Document file={pdfFile} renderMode="svg">
                            {Array.from(new Array(numPages), (_, index) => (
                                <Page key={`page_${index + 1}`} pageNumber={index + 1} />
                            ))}
                        </Document>
                    </Col>
                </Row>
            )}
            <Row>
                <Col>
                    <Button onClick={downloadImage} disabled={!mergedImageSrc}>
                        Download Image
                    </Button>
                </Col>
            </Row>
            {mergedImageSrc && (
                <Row>
                    <Col>
                        <img src={mergedImageSrc} alt="Merged Image" />
                    </Col>
                </Row>
            )}
        </Container>
    );
};

export default PDFToImageConverter;

```
