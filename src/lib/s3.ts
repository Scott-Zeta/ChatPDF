import AWS from 'aws-sdk';

export async function uploadToS3(file: File) {
  try {
    //define s3 bucket
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

    //define the upload object
    const file_key =
      'uploads/' + `${Date.now()}-${file.name.replace(/\s/g, '-')}`;
    const params = {
      Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
      Key: file_key,
      Body: file,
    };

    //on.() is a listener that will listen to the event, to monitor the upload progress
    const upload = s3
      .putObject(params)
      // .on('httpUploadProgress', (e) => {
      //   // console.log(
      //   //   `Upload Progress: ${Math.round((e.loaded / e.total) * 100)}%`
      //   // );
      // })
      .promise();

    //.promise() will return a promise, so we can use .then() and .catch()

    return Promise.resolve({
      file_key,
      file_name: file.name,
      file_type: file.type,
      file_size: file.size,
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

//access the url in s3 from file_key
export function getS3Url(file_key: string) {
  return `https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_S3_BUCKET_REGION}.amazonaws.com/${file_key}`;
}
