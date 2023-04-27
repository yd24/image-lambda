'use strict';

const {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} = require('@aws-sdk/client-s3');

const s3Client = new S3Client({ region: 'us-west-2' });

module.exports = async(event) => {
  const bucketName = event.Records[0].s3.bucket.name;
  const fileName = event.Records[0].s3.object.key;
  const fileSize = event.Records[0].s3.object.size;
  console.log(`${bucketName} ${fileName} ${fileSize}`);

  let img = {
    name: fileName,
    size: fileSize,
    type: 'image',
  };

  const response = {
      statusCode: 200,
      body: JSON.stringify('Hello from Lambda!'),
  };
  
  let getImageManifest = {
      Bucket: bucketName,
      Key: 'images.json',
  };

  let imgArr = [];
  try {
      const manifest = await s3Client.send(new GetObjectCommand(getImageManifest));
      let body = await manifest.Body.transformToString();
      imgArr = JSON.parse(body);
  } catch (e) {
      if (e.Code === 'NoSuchKey') {
        console.log(e);
      }
  }
  let index = imgArr.findIndex((element) => element.name === fileName);
  if (index > -1) {
    imgArr[index] = img;
  } else {
    imgArr.push(img);
  }
  getImageManifest = {
    Bucket: bucketName,
    Key: 'images.json',
    Body: Buffer.from(JSON.stringify(imgArr)),
  };
  await s3Client.send(new PutObjectCommand(getImageManifest));
  return response;
};
