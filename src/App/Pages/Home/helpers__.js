import { Storage } from "@aws-amplify/storage";
import Jimp from "jimp";
import * as pdfjs from "pdfjs-dist";
import { getDocument } from "pdfjs-dist/legacy/build/pdf";
pdfjs.GlobalWorkerOptions.workerSrc = "pdf.worker.min.js";

const convertPdfToJpeg = async (pdfFile) => {
  const arrayBuffer = await readFileAsArrayBuffer(pdfFile);
  const pdf = await loadPdf(arrayBuffer);
  const images = await convertPagesToImages(pdf);

  const combinedImage = combineImages(images);
  const jpegBuffer = await getJpegBuffer(combinedImage);

  return jpegBuffer;
};

const readFileAsArrayBuffer = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => resolve(event.target.result);
    reader.onerror = (error) => reject(error);
    reader.readAsArrayBuffer(file);
  });
};

const loadPdf = async (arrayBuffer) => {
  const loadingTask = getDocument({ data: arrayBuffer });
  return await loadingTask.promise;
};

const convertPagesToImages = async (pdf) => {
  const numPages = pdf.numPages;
  const images = [];

  for (let i = 1; i <= numPages; i++) {
    const page = await pdf.getPage(i);
    const imageData = await renderPageToImageData(page);
    const image = await Jimp.read(imageData);
    images.push(image);
  }

  return images;
};

const renderPageToImageData = async (page) => {
  const viewport = page.getViewport({ scale: 1 });
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  canvas.height = viewport.height;
  canvas.width = viewport.width;

  const renderContext = {
    canvasContext: context,
    viewport: viewport
  };

  await page.render(renderContext).promise;

  return canvas.toDataURL("image/jpeg");
};

const combineImages = (images) => {
  const combinedImage = new Jimp(
    images[0].bitmap.width,
    images.reduce((sum, img) => sum + img.bitmap.height, 0)
  );

  let y = 0;
  for (const img of images) {
    combinedImage.composite(img, 0, y);
    y += img.bitmap.height;
  }

  return combinedImage;
};

const getJpegBuffer = async (image) => {
  return await image.getBufferAsync(Jimp.MIME_JPEG);
};

const uploadFileToS3 = async (fileName, fileData, fileType, filePrefix) => {
  const fileWithoutExtension = fileName.slice(0, fileName.lastIndexOf("."));
  const fileKey = `${filePrefix}/${fileWithoutExtension}/${fileName}`;

  try {
    const uploadResult = await Storage.put(fileKey, fileData, {
      contentType: fileType
    });

    console.log("File uploaded successfully:", uploadResult);
    return uploadResult.key;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

export const uploadPdfAndImageToS3 = async (fileName, fileData, fileType) => {
  const pdfFilePrefix = "pdfs";
  const imageFilePrefix = "images";

  try {
    const pdfKey = await uploadFileToS3(fileName, fileData, fileType, pdfFilePrefix);
    const jpegBuffer = await convertPdfToJpeg(fileData);
    const imageKey = await uploadFileToS3(fileName, jpegBuffer, "image/jpeg", imageFilePrefix);

    return { pdfKey, imageKey };
  } catch (error) {
    console.error("Error uploading files:", error);
    throw error;
  }
};
export const callApiEndpoint = async (fileKey) => {
  const endpointUrl = "https://d0djozoa42.execute-api.us-east-1.amazonaws.com/Stage/v1/AnalyseStatementFn";

  try {
    const response = await fetch(endpointUrl, {
      method: "POST",
      body: JSON.stringify({ file: fileKey }),
      headers: {
        "Content-Type": "application/json"
      }
    });
    console.log({ response });

    if (response.ok) {
      console.log("Endpoint called successfully");
      return response.json();
    } else {
      console.error("Error calling the endpoint:", response.status);
      throw new Error("Endpoint call failed");
    }
  } catch (error) {
    console.error("Error calling the endpoint:", error);
    throw error;
  }
};
