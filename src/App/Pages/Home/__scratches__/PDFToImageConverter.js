import React, { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { mergePagesToImage, getPageWidth, getPageHeight } from '../helpers';

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
