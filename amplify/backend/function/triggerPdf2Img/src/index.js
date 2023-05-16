const AWS = require('aws-sdk');
const s3 = new AWS.S3();

exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);

    const { bucket, key } = event.queryStringParameters;

    try {
        // Get the file from S3
        const s3Response = await s3.getObject({ Bucket: bucket, Key: key }).promise();

        // Process the file or return it as a response
        const fileContent = s3Response.Body.toString('utf-8');

        return {
            statusCode: 200,
            body: JSON.stringify(fileContent),
        };
    } catch (error) {
        console.error(`Error retrieving file: ${error}`);

        return {
            statusCode: 500,
            body: JSON.stringify('Error retrieving file from S3.'),
        };
    }
};
