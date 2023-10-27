//All S3 function will be integrated later
import AWS from 'aws-sdk';

export async function deleteFromS3(file_key: string) {
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
    await s3.deleteObject(params).promise();
    console.log('Delete Completed', file_key);
  } catch (error) {
    console.error('Fail to delete from S3', error);
  }
}
