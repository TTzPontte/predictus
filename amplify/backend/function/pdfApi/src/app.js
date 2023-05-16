/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/


/* Amplify Params - DO NOT EDIT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});

/****************************
* Example post method *
****************************/

const AWS = require('aws-sdk');
const s3 = new AWS.S3();

app.post('/', async function(req, res) {
  try {
    const { bucket, key } = req.body;

    // Get the file from S3
    const s3Response = await s3.getObject({ Bucket: bucket, Key: key }).promise();

    // Set the appropriate content-type header based on the file type
    const contentType = s3Response.ContentType || 'application/octet-stream';
    res.setHeader('Content-Type', contentType);

    // Send the file content as the response
    res.send(s3Response.Body);
  } catch (error) {
    console.error(`Error retrieving file: ${error}`);
    res.status(500).json({ error: 'Error retrieving file from S3.' });
  }
});



app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
