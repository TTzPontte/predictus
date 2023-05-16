import React, { useEffect, useState } from "react";
import { pdfjs } from "react-pdf";
import { Helmet } from "react-helmet";
import { Button, Col, Row } from "react-bootstrap";
import "./styles.scss";
import FirstPage from "./FirstPage/FirstPage";
import { Storage } from "aws-amplify";

const API_ENDPOINT = "https://d0djozoa42.execute-api.us-east-1.amazonaws.com/Stage/v1/AnalyseStatementFn";
const FILE_PREFIX = "pdfs";

const uploadFileToS3 = async (fileName, fileData, fileType) => {
  try {
    const fileWithoutExtension = fileName.slice(0, fileName.lastIndexOf("."));
    const fileKey = `${FILE_PREFIX}/${fileWithoutExtension}/${fileName}`;

    const uploadResult = await Storage.put(fileKey, fileData, {
      contentType: fileType
    });

    console.log("File uploaded successfully:", uploadResult);
    return uploadResult.key;
  } catch (error) {
    console.log("Error uploading file:", error);
    throw error;
  }
};

const usePdfConversion = (pdfFile) => {
  const [numPages, setNumPages] = useState(null);
  const [thumbnailUrls, setThumbnailUrls] = useState([]);

  useEffect(() => {
    const convertToThumbnails = async () => {
      if (!pdfFile) {
        console.error("No PDF file selected.");
        return;
      }

      try {
        const fileReader = new FileReader();

        fileReader.onload = async function () {
          const typedArray = new Uint8Array(this.result);
          const pdfData = typedArray.buffer;

          const pdf = await pdfjs.getDocument({ data: pdfData }).promise;
          setNumPages(pdf.numPages);

          const urls = await generateThumbnailUrls(pdf);
          setThumbnailUrls(urls);
        };

        fileReader.readAsArrayBuffer(pdfFile);
      } catch (error) {
        console.error("Error converting PDF to thumbnails:", error);
      }
    };

    convertToThumbnails();
  }, [pdfFile]);

  const generateThumbnailUrls = async (pdf) => {
    const urls = [];

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const viewport = page.getViewport({ scale: 0.2 });
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      await page.render({ canvasContext: context, viewport }).promise;

      urls.push(canvas.toDataURL("image/jpeg"));
    }

    return urls;
  };

  return { numPages, thumbnailUrls };
};

// Set the worker URL for PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Ofx = () => {
  const [hasFile, setHasFile] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [reportDownloadUrl, setReportDownloadUrl] = useState(null);
  const { numPages, thumbnailUrls } = usePdfConversion(selectedFile?.statement?.fileData);
  const [mergedImageSrc, setMergedImageSrc] = useState(null);

  const handleUpload = async ({ fileName, fileData, fileType }) => {
    try {
      const fileKey = await uploadFileToS3(fileName, fileData, fileType);
      setReportDownloadUrl("");

      setSelectedFile((prevState) => ({
        ...prevState,
        statement: {
          ...prevState?.statement,
          s3Key: fileKey,
          transactions: [],
          monthlyTransactions: [],
          fileData
        }
      }));
      setHasFile(true);
    } catch (error) {
      console.error("Error handling upload:", error);
    }
  };

  const convertToMergedImage = async () => {
    if (!selectedFile?.statement?.fileData) {
      console.error("No PDF file selected.");
      return;
    }
    try {
      const fileReader = new FileReader();

      fileReader.onload = async function () {
        const typedArray = new Uint8Array(this.result);
        const pdfData = typedArray.buffer;

        const pdf = await pdfjs.getDocument({ data: pdfData }).promise;
        const mergedImageSrc = await mergePagesToImage(pdf);
        setMergedImageSrc(mergedImageSrc);
      };

      fileReader.readAsArrayBuffer(selectedFile.statement.fileData);
    } catch (error) {
      console.error("Error converting PDF to image:", error);
    }
  };

  const mergePagesToImage = async (pdf) => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    const mergedHeight = numPages * (await getPageHeight(pdf, 1));
    canvas.width = await getPageWidth(pdf, 1);
    canvas.height = mergedHeight;

    let currentHeight = 0;

    for (let i = 1; i <= numPages; i++) {
      const page = await pdf.getPage(i);
      const viewport = page.getViewport({ scale: 1.0 });
      const pageCanvas = document.createElement("canvas");
      const pageContext = pageCanvas.getContext("2d");

      pageCanvas.width = viewport.width;
      pageCanvas.height = viewport.height;

      await page.render({ canvasContext: pageContext, viewport }).promise;

      context.drawImage(pageCanvas, 0, currentHeight);
      currentHeight += await getPageHeight(pdf, i);
    }

    return canvas.toDataURL("image/jpeg");
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

  const downloadMergedImage = async () => {
    if (mergedImageSrc) {
      try {
        const response = await fetch(mergedImageSrc);
        const blob = await response.blob();

        const fileName = "merged_image.jpg";
        const fileType = blob.type;

        await uploadFileToS3(fileName, blob, fileType);

        const downloadUrl = await Storage.get(fileName, { download: true });
        window.location.href = downloadUrl;
      } catch (error) {
        console.error("Error uploading merged image:", error);
      }
    }
  };

  useEffect(() => {
    convertToMergedImage();
  }, [numPages]);

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
          <div
            className="react-tabs__tab-panel react

-tabs__tab-panel--selected"
          >
            {!hasFile ? (
              <FirstPage handleUpload={handleUpload} />
            ) : (
              <>
                {thumbnailUrls.length > 0 && (
                  <Row>
                    <Col>
                      {thumbnailUrls.map((url, index) => (
                        <img key={`thumbnail_${index}`} src={url} alt={`Thumbnail ${index + 1}`} />
                      ))}
                    </Col>
                  </Row>
                )}
                <Row className={"my-4"}>
                  <Col>
                    <Button onClick={downloadMergedImage} disabled={!mergedImageSrc}>
                      Gerar Relatório
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
