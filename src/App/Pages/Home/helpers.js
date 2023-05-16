import {Storage} from "@aws-amplify/storage";
import {PDFImage} from 'pdf-image';

export const uploadFileToS3 = async (fileName, fileData, fileType) => {
    const fileWithoutExtension = fileName.slice(0, fileName.lastIndexOf('.'));
    const prefixedFileName = `pdfs/${fileWithoutExtension}/${fileName}`;

    try {
        const pdfImage = new PDFImage(fileData);
        const totalPageCount = await pdfImage.numberOfPages();

        const jpegUrls = await Promise.all(
            Array.from({length: totalPageCount}, async (_, pageIndex) => {
                const jpegData = await pdfImage.convertPage(pageIndex);
                const jpegFileName = `${prefixedFileName}_page${pageIndex + 1}.jpeg`;

                const result = await Storage.put(jpegFileName, jpegData, {
                    contentType: 'image/jpeg',
                });

                console.log('Page', pageIndex + 1, 'uploaded successfully:', result);
                return result.key;
            })
        );

        return jpegUrls;
    } catch (error) {
        console.error('Error uploading file:', error);
        throw error;
    }
};

export const callApiEndpoint = async (fileKey) => {
    try {
        const response = await fetch("https://d0djozoa42.execute-api.us-east-1.amazonaws.com/Stage/v1/AnalyseStatementFn", {
            method: "POST",
            body: JSON.stringify({file: fileKey}),
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log({response});
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
