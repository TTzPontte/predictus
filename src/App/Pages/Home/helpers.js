import { Storage } from "@aws-amplify/storage";

const FILE_PREFIX = "pdfs";

export const uploadFileToS3 = async (fileName, fileData, fileType) => {
  const fileKey = getFileKey(fileName);

  try {
    const uploadResult = await Storage.put(fileKey, fileData, {
      contentType: fileType
    });

    console.log(uploadResult);
    return uploadResult.key;
  } catch (error) {
    throw new Error(`Failed to upload ${fileName} to S3: ${error}`);
  }
};

export const downloadFromS3 = async (fileName) => {
  const fileKey = getFileKey(fileName);

  try {
    const signedUrl = await Storage.get(fileKey, { level: "public", download: false });
    console.log({ signedUrl });
    return signedUrl;
  } catch (error) {
    throw new Error(`Failed to download ${fileName} from S3: ${error}`);
  }
};

const getFileKey = (fileName) => {
  const fileWithoutExtension = fileName.slice(0, fileName.lastIndexOf("."));
  return `${FILE_PREFIX}/${fileWithoutExtension}/expense_report.xlsx`;
};
