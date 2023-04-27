# image-lambda

## Description

Code that can be placed into an AWS Lambda function. This Lambda code will keep track of an images/ folder on an S3 Bucket and update a file called images.json everytime an image is uploaded to the folder.

## Setup

* First, create an AWS account.
* Create an S3 Bucket with permissions configured to allow for read and writes.
* Create an images/ folder in the S3 Bucket.
* Create a Lambda function and insert the code snippet. Ensure that requires are replaced with imports (due to Amazon using .mjs files).
* Deploy your Lambda function.
* Setup a trigger for your S3 Bucket to the Lambda function, set for every object creation in the images/ folder of type .jpg.

## Some issues that I ran across

* AWS GetObjectCommand and PutObjectCommand documentation didn't have examples for reading file data from Body.
* In order to read JSON, we need to use transformToString() and an await on the response.Body from GetObjectCommand.
* For setting up permissions on S3 Bucket, if we use an object policy then Version does not refer to your own "version", but a set of pre-defined versions from AWS. You'll have to look these up online.