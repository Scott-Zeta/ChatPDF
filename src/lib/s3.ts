import AWS from 'aws-sdk';

export async function uploadToS3(file:File){
    try {
        //define s3 bucket
        AWS.config.update({
            accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID,
            secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY,
        });
        const s3 = new AWS.S3({
            params:{
                Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
            },
            region: process.env.NEXT_PUBLIC_S3_BUCKET_REGION,
            });

        //define the upload object
        const file_key = `${Date.now()}-${file.name.replace(/\s/g, '-')}`;
        const params = {
            Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
            Key: file_key,
            Body: file,
        };

        //on.() is a listener that will listen to the event, to monitor the upload progress
        const upload = s3.putObject(params).on('httpUploadProgress',e=>{
            console.log(`Upload Progress: ${Math.round((e.loaded/e.total)*100)}%`);
        }).promise();

        //.promise() will return a promise, so we can use .then() and .catch()
        await upload.then(()=>{
            console.log("Upload Completed",file_key);
        })

    } catch (error) {
        
    }
}