import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import {mergeImages} from "./PdfUtils";

const PdfActions = ({ thumbnailUrls = [], onClick }) => {
    const downloadMergedImage = async () => {
        const mergedImageBlob = await mergeImages(thumbnailUrls);

        // Create a temporary link to download the merged image
        const url = URL.createObjectURL(mergedImageBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'merged_image.png';
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

export default PdfActions;
