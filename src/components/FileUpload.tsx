'use client';
import React from 'react';
import { useDropzone } from 'react-dropzone';
import { Inbox, Loader2 } from 'lucide-react';
import { uploadToS3 } from '@/lib/s3';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
//call the toast without using toast hooks
import { toast } from './ui/use-toast';
import { useRouter } from 'next/navigation';

const FileUpload = () => {
  const router = useRouter();
  const [uploading, setUploading] = React.useState(false);

  //hit the api to create chat when finish upload
  const { mutate } = useMutation({
    mutationFn: async ({
      file_key,
      file_name,
    }: {
      file_key: string;
      file_name: string;
    }) => {
      const response = await axios.post('/api/create-chat', {
        file_key,
        file_name,
      });
      setUploading(false);
      return response.data;
    },
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'application/pdf': ['.pdf'], 'text/plain': ['.txt'] },
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      console.log(acceptedFiles);
      const file = acceptedFiles[0];
      if (file.size > 10 * 1024 * 1024) {
        toast({
          variant: 'destructive',
          title: 'Upload failed',
          description: 'File size must be less than 10MB',
        });
        return;
      }

      //call function upload to s3
      try {
        setUploading(true);
        const data = await uploadToS3(file);
        if (!data?.file_key || !data?.file_name) {
          toast({
            variant: 'destructive',
            title: 'Upload failed',
            description: 'Could not get valid file key or file name',
          });
          return;
        }
        mutate(data, {
          onSuccess: (data) => {
            console.log(data.result);
            toast({
              title: 'Upload Complete',
              description: 'You will soon be redirected to the chat',
            });
            router.push(`/chat/${data.chat_id}`);
          },
          onError: (error) => {
            console.log(error);
            toast({
              variant: 'destructive',
              title: 'Can not fetching Data',
              description: `${error}`,
            });
          },
        });
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Chat creation failed',
          description: `${error}`,
        });
        setUploading(false);
      }
    },
  });
  return (
    <div className="p-2 bg-white rounded-xl">
      <div
        {...getRootProps({
          className:
            'border-dashed border-2 rounded-xl cursor-pointer bg-gray-50 py-8 flex justify-center items-center flex-col',
        })}
      >
        <input {...getInputProps()} />
        {uploading ? (
          <>
            <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
            <p className="mt-2 text-sm text-slate-400">
              Uploading, be patient mother fucker...
            </p>
          </>
        ) : (
          <>
            <Inbox className="w-10 h-10 text-blue-500" />
            <p className="mt-2 text-sm text-slate-400">Drop PDF Here</p>
          </>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
