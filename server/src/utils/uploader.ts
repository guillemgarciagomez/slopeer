import AWS from 'aws-sdk';

export default exports = new AWS.S3({
  accessKeyId: process.env.AWS_S3_ID,
  secretAccessKey: process.env.AWS_S3_SECRET,
  region: 'eu-central-1'
});
