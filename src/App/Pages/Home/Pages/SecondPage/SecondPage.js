import React from "react";
import {Button, Col, Row} from "react-bootstrap";
import usePdfConversion from "./usePdfConversion";

const PdfThumbnails = ({urls}) => (
    <Row>
        <Col>
            {urls.map((url, index) => (
                <img key={`thumbnail_${index}`} src={url} alt={`Thumbnail ${index + 1}`}/>
            ))}
        </Col>
    </Row>
);
const PdfActions = ({thumbnailUrls = [], onClick}) => {
    const downloadMergedImage = async () => {
        const mergedImageBlob = await mergeImages(thumbnailUrls);

        // Create a temporary link to download the merged image
        const url = URL.createObjectURL(mergedImageBlob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "merged_image.png";
        link.click();

        // Clean up
        URL.revokeObjectURL(url);
    };

    return (
        <Row className="my-4">
            <Col>
                <Button onClick={downloadMergedImage} disabled={thumbnailUrls.length === 0}>
                    Gerar Relatório
                </Button>
            </Col>
        </Row>
    );
};
const mergeImages = async (imageUrls) => {
    const images = await Promise.all(imageUrls.map((url) => loadImage(url)));
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const width = Math.max(...images.map((img) => img.width));
    const height = images.reduce((sum, img) => sum + img.height, 0);

    canvas.width = width;
    canvas.height = height;

    let y = 0;
    for (let img of images) {
        ctx.drawImage(img, 0, y, img.width, img.height);
        y += img.height;
    }

    return new Promise((resolve) => {
        canvas.toBlob(resolve);
    });
};
const loadImage = (url) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = url;
    });
};

const SecondPage = () => {
    const {thumbnailUrls} = usePdfConversion(); // Pass the necessary pdfFile prop here

    return (
        <div>
            <>
                {thumbnailUrls.length > 0 && <PdfThumbnails urls={thumbnailUrls}/>}
                <PdfActions thumbnailUrls={thumbnailUrls}/>
            </>
        </div>
    );
};

export default SecondPage;
