import AWS from 'aws-sdk';
import fs from 'fs';

export async function downloadFromS3(file_key: string) {
  try {
    AWS.config.update({
      accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY,
    });
    const s3 = new AWS.S3({
      params: {
        Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
      },
      region: process.env.NEXT_PUBLIC_S3_BUCKET_REGION,
    });
    const params = {
      Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
      Key: file_key,
    };
    //get the file from the s3 bucket
    const obj = await s3.getObject(params).promise();
    //save the file to the local(server) storage
    const file_path = `/tmp/${Date.now()}.pdf`;
    //Buffer as variable type of file's body
    fs.writeFileSync(file_path, obj.Body as Buffer);
    return file_path;
  } catch (error) {
    console.error('Download From S3 Erorr:', error);
    return null;
  }
}
