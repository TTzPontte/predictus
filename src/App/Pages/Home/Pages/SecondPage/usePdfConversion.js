import { pdfjs } from "react-pdf";
import React, { useEffect, useState } from "react";

const FILE_PREFIX = "pdfs";

// Set the worker URL for PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const readFileAsArrayBuffer = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(new Uint8Array(reader.result));
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
};

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

const usePdfConversion = (pdfFile) => {
  const [numPages, setNumPages] = useState(null);
  const [thumbnailUrls, setThumbnailUrls] = useState([]);

  useEffect(() => {
    const convertToThumbnails = async () => {
      if (!pdfFile) {
        return;
      }
      try {
        const typedArray = await readFileAsArrayBuffer(pdfFile);
        const pdfData = typedArray.buffer;
        const pdf = await pdfjs.getDocument({ data: pdfData }).promise;

        setNumPages(pdf.numPages);
        setThumbnailUrls(await generateThumbnailUrls(pdf));
      } catch (error) {
        console.error("Error converting PDF to thumbnails:", error);
      }
    };

    convertToThumbnails();
  }, [pdfFile]);

  return { numPages, thumbnailUrls };
};
export default usePdfConversion;
