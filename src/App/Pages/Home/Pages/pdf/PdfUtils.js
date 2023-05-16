import { pdfjs } from "react-pdf";

// Set the worker URL for PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export const readFileAsArrayBuffer = async (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(new Uint8Array(reader.result));
        reader.onerror = reject;
        reader.readAsArrayBuffer(file);
    });
};

export const generateThumbnailUrls = async (pdf) => {
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

export const mergeImages = async (imageUrls) => {
    const images = await Promise.all(imageUrls.map((url) => loadImage(url)));
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

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

export const loadImage = (url) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = url;
    });
};

