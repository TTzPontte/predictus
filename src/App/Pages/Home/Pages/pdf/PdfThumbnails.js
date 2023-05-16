import React from "react";
import { Col, Row } from "react-bootstrap";

const PdfThumbnails = ({ urls }) => (
    <Row>
        <Col>
            {urls.map((url, index) => (
                <img key={`thumbnail_${index}`} src={url} alt={`Thumbnail ${index + 1}`} />
            ))}
        </Col>
    </Row>
);

export default PdfThumbnails;
