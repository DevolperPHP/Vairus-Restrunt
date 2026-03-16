const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
const path = require("path");

const s3 = new S3Client({
  region: "auto",
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

async function uploadToR2(file) {
  const ext = path.extname(file.originalname).toLowerCase();
  const filename =
    "item-" + Date.now() + "-" + Math.round(Math.random() * 1e9) + ext;
  const key = "upload/images/" + filename;

  await s3.send(
    new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    }),
  );

  return "/" + key;
}

async function getFromR2(key) {
  const response = await s3.send(
    new GetObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: key,
    }),
  );
  return response;
}

async function deleteFromR2(imagePath) {
  if (!imagePath || imagePath === "noImage.png") return;
  const key = imagePath.replace(/^\//, "");
  await s3.send(
    new DeleteObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: key,
    }),
  );
}

module.exports = { uploadToR2, getFromR2, deleteFromR2 };
