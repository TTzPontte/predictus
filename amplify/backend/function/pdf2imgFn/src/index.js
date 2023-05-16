const AWS = require('aws-sdk');
const pdf2img = require('pdf2img');

const s3 = new AWS.S3();

exports.handler = async (event) => {
    const { bucket, key } = event;

    // Step 1: Get the PDF file from S3
    const pdfData = await s3.getObject({ Bucket: bucket, Key: key }).promise();

    // Step 2: Convert each page of the PDF into JPEG images
    const convertedImages = await convertPdfToJpeg(pdfData.Body);

    // Step 3: Save the JPEG images to the same S3 bucket
    const savePromises = convertedImages.map((image, index) => {
        const jpegKey = `${key}_page_${index + 1}.jpeg`;
        return s3.putObject({
            Bucket: bucket,
            Key: jpegKey,
            Body: image,
            ContentType: 'image/jpeg',
        }).promise();
    });

    await Promise.all(savePromises);

    return {
        statusCode: 200,
        body: 'PDF converted and images saved successfully.',
    };
};

async function convertPdfToJpeg(pdfData) {
    return new Promise((resolve, reject) => {
        pdf2img.convert(pdfData, { type: 'jpeg', density: 300 }, (err, info) => {
            if (err) {
                reject(err);
                return;
            }
            const images = info.map((item) => item.path);
            resolve(images);
        });
    });
}
