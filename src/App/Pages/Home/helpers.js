import { Storage } from "@aws-amplify/storage";

const API_ENDPOINT = "https://d0djozoa42.execute-api.us-east-1.amazonaws.com/Stage/v1/AnalyseStatementFn";
const FILE_PREFIX = "pdfs";

export const uploadFileToS3 = async (fileName, fileData, fileType) => {
    try {
        const fileWithoutExtension = fileName.slice(0, fileName.lastIndexOf("."));
        const fileKey = `${FILE_PREFIX}/${fileWithoutExtension}/${fileName}`;

        const uploadResult = await Storage.put(fileKey, fileData, {
            contentType: fileType
        });

        return uploadResult.key;
    } catch (error) {
        console.error("Error uploading file:", error);
        throw error;
    }
};

export const callApiEndpoint = async (fileKey) => {
    try {
        const response = await fetch(API_ENDPOINT, {
            method: "POST",
            body: JSON.stringify({ file: fileKey }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        console.log({ response });

        if (response.ok) {
            console.log("Endpoint called successfully");
            return response.json();
        } else {
            logError("Error calling the endpoint:", response.status);
            throw new Error("Endpoint call failed");
        }
    } catch (error) {
        logError("Error calling the endpoint:", error);
        throw error;
    }
};

const logError = (message, error) => {
    console.error(message, error);
};
