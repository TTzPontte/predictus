import {Storage} from "@aws-amplify/storage";
import {pdfjs} from "react-pdf";
import {useEffect, useState} from "react";

const FILE_PREFIX = "pdfs";

export const uploadFileToS3 = async (fileName, fileData, fileType) => {
    try {
        const fileWithoutExtension = fileName.slice(0, fileName.lastIndexOf("."));
        const fileKey = `${FILE_PREFIX}/${fileWithoutExtension}/${fileName}`;

        const uploadResult = await Storage.put(fileKey, fileData, {
            contentType: fileType
        });
        console.log(uploadResult)
        return uploadResult.key;
    } catch (error) {
        console.error("Error uploading file:", error);
        throw error;
    }
};

export const downloadFromS3 = async (fileName) => {
    console.log("file:", fileName);
    const fileWithoutExtension = fileName.slice(0, fileName.lastIndexOf("."));
    const fileKey = `${FILE_PREFIX}/${fileWithoutExtension}/expense_report.xlsx`;

    try {
        // Get the signed URL for the file from S3
        const signedUrl = await Storage.get(fileKey, { level: 'public', download: false });
        console.log({signedUrl})
        // Return the signed URL
        return signedUrl;
    } catch (error) {
        console.error("Error downloading file from S3:", error);
        throw error;
    }
};

export const logError = (message, error) => {
    console.error(message, error);
};

export const readFileAsArrayBuffer = async (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(new Uint8Array(reader.result));
        reader.onerror = reject;
        reader.readAsArrayBuffer(file);
    });
};

export const convertToPageUrls = async (pdfFile) => {
    const typedArray = await readFileAsArrayBuffer(pdfFile);
    const pdfData = typedArray.buffer;
    const pdf = await pdfjs.getDocument({ data: pdfData }).promise;

    const pageUrls = [];
    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 2 }); // Increase scale for higher resolution
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        // Draw a white rectangle
        context.fillStyle = '#fff';
        context.fillRect(0, 0, canvas.width, canvas.height);

        const renderParams = {
            canvasContext: context,
            viewport: viewport,
            background: "rgba(0,0,0,0)",
            quality: 1 // Set quality to 1 for maximum quality
        };

        await page.render(renderParams).promise;

        pageUrls.push(canvas.toDataURL("image/png"));
    }

    return pageUrls;
};

export const usePdfConversionAndMerge = (pdfFile) => {
    const [mergedImageSrc, setMergedImageSrc] = useState(null);

    useEffect(() => {
        const convertToPages = async () => {
            if (!pdfFile) {
                return;
            }
            try {
                const pageUrls = await convertToPageUrls(pdfFile);

                const images = await Promise.all(pageUrls.map((url) => loadImage(url)));

                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");

                canvas.width = Math.max(...images.map((img) => img.width));
                canvas.height = images.reduce((sum, img) => sum + img.height, 0);

                let y = 0;
                for (let img of images) {
                    ctx.drawImage(img, 0, y, img.width, img.height);
                    y += img.height;
                }

                canvas.toBlob((blob) => {
                    const mergedImageSrc = URL.createObjectURL(blob);
                    setMergedImageSrc(mergedImageSrc);
                });
            } catch (error) {
                console.error("Error converting PDF to pages:", error);
            }
        };

        convertToPages();
    }, [pdfFile]);

    return mergedImageSrc;
};

export const loadImage = (url) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = url;
    });
};
