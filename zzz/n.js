const AWS = require('aws-sdk');
const gm = require('gm').subClass({ imageMagick: true });

// Create an S3 client
const s3 = new AWS.S3();

// Set the S3 bucket and key for the PDF file
const bucketName = 'textract-console-us-east-1-ebf854b2-76e4-42f6-bd52-c74847ac3f97';
const key = 'b0f1a23f_5559_478c_9c7c_d1b284112909_extratopj_marco_itau_janeiro21.pdf';

// Set the local filename for the JPEG file
const localFilename = 'output.jpg';

// Download the PDF file from S3
const s3Params = { Bucket: bucketName, Key: key };
s3.getObject(s3Params, function (err, data) {
    if (err) {
        console.log(err, err.stack);
    } else {
        // Convert the PDF file to a JPEG image
        gm(data.Body, key)
            .setFormat('jpeg')
            .write(localFilename, function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(`Converted ${key} to ${localFilename}`);
                }
            });
    }
});
