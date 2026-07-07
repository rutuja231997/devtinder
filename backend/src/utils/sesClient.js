const { SESClient } = require("@aws-sdk/client-ses");

const REGION = "ap-south-1"; //set the aws region

const sesClient = new SESClient({
  region: REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
}); //create SES service object

module.exports = { sesClient };
