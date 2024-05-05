// upload.controller.js

import AWS from 'aws-sdk';

const uploadFileToS3 = async (req, res) => {
   console.log('Upload req received');
   console.log(req.files);

   if (!req.files || !req.files['chunk'] || !req.body['totalChunks'] || !req.body['chunkIndex']) {
       console.log('Missing required data');
       return res.status(400).send('Missing required data');
   }

   const chunk = req.files['chunk'];
   const filename = req.body['filename'];
   const totalChunks = parseInt(req.body['totalChunks']);
   const chunkIndex = parseInt(req.body['chunkIndex']);
   console.log(filename);

   console.log(chunk[0].buffer);


   AWS.config.update({
       region: 'ap-south-1',
       accessKeyId: process.env.AWS_ACCESS_KEY_ID,
       secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
   });

   if (req.body.totalChunks && req.body.chunkIndex !== undefined) {
       const params = {
           Bucket: process.env.AWS_BUCKET,
           Key: `${filename}_${chunkIndex}`, // Use a unique key for each chunk
           Body: chunk[0].buffer
       };

       const s3 = new AWS.S3();

       // Upload the chunk to S3
       s3.upload(params, (err, data) => {
           if (err) {
               console.log('Error uploading chunk:', err);
               res.status(500).send('Chunk could not be uploaded');
           } else {
               console.log('Chunk uploaded successfully. Location:', data.Location);
               res.status(200).send('Chunk uploaded successfully');
           }
       });
   } else {
       console.log('Missing chunk metadata');
       res.status(400).send('Missing chunk metadata');
   }
}

export default uploadFileToS3;